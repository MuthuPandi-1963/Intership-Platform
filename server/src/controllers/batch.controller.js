const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getBatchesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const batches = await prisma.batch.findMany({
      where: { courseId: parseInt(courseId) },
      include: {
        enrollments: true,
        course: true
      },
      orderBy: {
        startDate: 'asc'
      }
    });

    // Add enrollment stats
    const batchesWithStats = batches.map(batch => ({
      ...batch,
      enrolledCount: batch.enrollments.length,
      seatsLeft: batch.totalSeats - batch.enrollments.length
    }));

    res.json({ batches: batchesWithStats });
  } catch (error) {
    console.error('Get batches error:', error);
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
};

const getAllBatches = async (req, res) => {
  try {
    const batches = await prisma.batch.findMany({ 
      include: {
        enrollments: true,
        course: true
      }
    });
    res.json({ batches });
  } catch (error) {
    console.error('Get all batches error:', error);
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
};


const createBatch = async (req, res) => {
  try {
    const { courseId, startDate, totalSeats } = req.body;

    const batch = await prisma.batch.create({
      data: {
        courseId: parseInt(courseId),
        startDate: new Date(startDate),
        totalSeats: parseInt(totalSeats) || 100
      }
    });

    res.status(201).json({ batch });
  } catch (error) {
    console.error('Create batch error:', error);
    res.status(500).json({ error: 'Failed to create batch' });
  }
};

const updateBatchStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['NOT_STARTED', 'ONGOING', 'COMPLETED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const batch = await prisma.batch.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        course: true
      }
    });

    res.json({ batch });
  } catch (error) {
    console.error('Update batch status error:', error);
    res.status(500).json({ error: 'Failed to update batch status' });
  }
};

module.exports = {
  getAllBatches,
  getBatchesByCourse,
  createBatch,
  updateBatchStatus
};