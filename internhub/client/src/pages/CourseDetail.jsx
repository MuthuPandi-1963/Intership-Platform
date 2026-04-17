import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setShowPayment(true);
    }
  };

  const handlePayment = async () => {
    try {
      // Initiate enrollment
      const response = await axios.post('/api/enrollments', {
        batchId: course.batches[0].id
      });
      
      // Simulate payment
      await axios.post('/api/payments/initiate', {
        enrollmentId: response.data.enrollment.id
      });
      
      // Confirm payment
      await axios.post('/api/payments/confirm', {
        enrollmentId: response.data.enrollment.id
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Enrollment failed:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading course details...</div>;
  }

  if (!course) {
    return <div className="text-center py-20">Course not found</div>;
  }

  const batch = course.batches[0];
  const seatsLeft = batch ? batch.totalSeats - (batch.enrollments?.length || 0) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-6">{course.title}</h1>
      <p className="text-gray-300 mb-8">{course.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Course Details</h2>
          <div className="space-y-2">
            <p className="text-gray-300"><strong>Duration:</strong> {course.duration}</p>
            <p className="text-gray-300"><strong>Fee:</strong> ₹{course.fee}</p>
            <p className="text-gray-300"><strong>Start Date:</strong> {batch ? new Date(batch.startDate).toLocaleDateString() : 'TBD'}</p>
            <p className="text-gray-300"><strong>Seats Left:</strong> {seatsLeft}</p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-bold text-white mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {course.techStack.map((tech, index) => (
                <span key={index} className="bg-indigo-600 text-white px-3 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Syllabus</h2>
          <div className="space-y-4">
            {course.syllabus.map((week, index) => (
              <div key={index} className="bg-slate-800 p-4 rounded">
                <h3 className="text-indigo-400 font-semibold">Week {week.week}</h3>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  {week.topics.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button
          onClick={handleEnroll}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg"
          disabled={seatsLeft <= 0}
        >
          {seatsLeft <= 0 ? 'Batch Full' : 'Enroll Now - ₹4500'}
        </button>
      </div>
      
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Complete Payment</h2>
            <p className="text-gray-300 mb-4">Course: {course.title}</p>
            <p className="text-gray-300 mb-6">Amount: ₹{course.fee}</p>
            <button
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded"
            >
              Pay Now
            </button>
            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-2 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;