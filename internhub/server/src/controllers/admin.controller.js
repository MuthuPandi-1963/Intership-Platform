const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getStats = async (req, res) => {
  try {
    // Get total students
    const totalStudents = await prisma.user.count({
      where: { role: 'STUDENT' }
    });

    // Get total revenue
    const payments = await prisma.payment.findMany({
      where: { status: 'SUCCESS' }
    });
    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

    // Get active batches
    const activeBatches = await prisma.batch.count({
      where: {
        status: {
          in: ['NOT_STARTED', 'ONGOING']
        }
      }
    });

    // Get completed batches
    const completedBatches = await prisma.batch.count({
      where: { status: 'COMPLETED' }
    });

    res.json({
      stats: {
        totalStudents,
        totalRevenue,
        activeBatches,
        completedBatches
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        college: true,
        branch: true,
        year: true,
        createdAt: true,
        enrollments: {
          include: {
            batch: {
              include: {
                course: true
              }
            },
            payment: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ students });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

const exportStudentsByBatch = async (req, res) => {
  try {
    const { batchId } = req.params;

    const enrollments = await prisma.enrollment.findMany({
      where: { batchId: parseInt(batchId) },
      include: {
        student: true,
        payment: true,
        batch: {
          include: {
            course: true
          }
        }
      }
    });

    // Generate CSV content
    const csvHeaders = 'Name,Email,Phone,College,Branch,Year,Payment Status,Enrollment Date\n';
    const csvRows = enrollments.map(enrollment => {
      const student = enrollment.student;
      const payment = enrollment.payment;
      return `"${student.name}","${student.email}","${student.phone}","${student.college || ''}","${student.branch || ''}","${student.year || ''}","${payment?.status || 'PENDING'}","${enrollment.createdAt.toISOString().split('T')[0]}"`;
    }).join('\n');

    const csvContent = csvHeaders + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=batch_${batchId}_students.csv`);
    res.send(csvContent);
  } catch (error) {
    console.error('Export students error:', error);
    res.status(500).json({ error: 'Failed to export students' });
  }
};

module.exports = {
  getStats,
  getAllStudents,
  exportStudentsByBatch
};