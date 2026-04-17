const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@internhub.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@internhub.com',
      phone: '1234567890',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create sample course
  const course = await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Full Stack Web Development',
      description: 'Learn MERN stack from scratch and build real projects',
      fee: 4500,
      duration: '1 Month',
      syllabus: [
        {
          week: 1,
          topics: ['HTML', 'CSS', 'JavaScript Basics']
        },
        {
          week: 2,
          topics: ['React Fundamentals', 'State Management']
        },
        {
          week: 3,
          topics: ['Node.js', 'Express.js', 'MongoDB']
        },
        {
          week: 4,
          topics: ['Project Work', 'Deployment']
        }
      ],
      techStack: ['React', 'Node.js', 'MongoDB', 'Express.js']
    },
  });

  // Create sample batch
  const batch = await prisma.batch.upsert({
    where: { id: 1 },
    update: {},
    create: {
      courseId: course.id,
      startDate: new Date('2024-05-01'),
      totalSeats: 100,
      status: 'NOT_STARTED'
    },
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });