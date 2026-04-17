import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const availableSeats = course.batches?.[0]?.totalSeats - (course.batches?.[0]?.enrollments?.length || 0) || 0;
  const startDate = course.batches?.[0]?.startDate ? new Date(course.batches[0].startDate).toLocaleDateString() : 'TBD';

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
      <p className="text-gray-300 mb-4">{course.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {course.techStack.map((tech, index) => (
          <span key={index} className="bg-indigo-600 text-white px-2 py-1 rounded text-sm">
            {tech}
          </span>
        ))}
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-gray-300"><strong>Duration:</strong> {course.duration}</p>
        <p className="text-gray-300"><strong>Fee:</strong> ₹{course.fee}</p>
        <p className="text-gray-300"><strong>Start Date:</strong> {startDate}</p>
        <p className="text-gray-300"><strong>Seats Left:</strong> {availableSeats}</p>
      </div>
      
      <Link
        to={`/courses/${course.id}`}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded block text-center"
      >
        View Details & Enroll
      </Link>
    </div>
  );
};

export default CourseCard;