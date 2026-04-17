import { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get('/api/enrollments/my');
        setEnrollments(response.data);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      NOT_STARTED: 'bg-blue-600 text-white',
      ONGOING: 'bg-yellow-600 text-white',
      COMPLETED: 'bg-green-600 text-white'
    };
    return badges[status] || 'bg-gray-600 text-white';
  };

  if (loading) {
    return <div className="text-center py-20">Loading your courses...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-white text-center mb-8">My Enrolled Courses</h1>
      
      {enrollments.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-300 mb-4">You haven't enrolled in any courses yet.</p>
          <a href="/courses" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded">
            Browse Courses
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrollments.map((enrollment) => (
            <div key={enrollment.id} className="bg-slate-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {enrollment.batch.course.title}
              </h3>
              <p className="text-gray-300 mb-4">{enrollment.batch.course.description}</p>
              
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(enrollment.batch.status)}`}>
                  {enrollment.batch.status.replace('_', ' ')}
                </span>
              </div>
              
              <div className="text-sm text-gray-400">
                <p>Batch Start: {new Date(enrollment.batch.startDate).toLocaleDateString()}</p>
                <p>Duration: {enrollment.batch.course.duration}</p>
                <p>Fee: ₹{enrollment.batch.course.fee}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;