import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBatches = () => {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    courseId: '',
    startDate: '',
    totalSeats: 100
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [batchesRes, coursesRes] = await Promise.all([
        axios.get('/api/batches'),
        axios.get('/api/courses')
      ]);
      setBatches(batchesRes.data);
      setCourses(coursesRes.data.courses);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/batches', {
        ...formData,
        courseId: parseInt(formData.courseId),
        totalSeats: parseInt(formData.totalSeats),
        startDate: new Date(formData.startDate)
      });

      setShowForm(false);
      setFormData({
        courseId: '',
        startDate: '',
        totalSeats: 100
      });
      fetchData();
    } catch (error) {
      console.error('Error creating batch:', error);
    }
  };

  const updateBatchStatus = async (batchId, newStatus) => {
    try {
      await axios.patch(`/api/batches/${batchId}/status`, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error('Error updating batch status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      NOT_STARTED: 'bg-gray-600 text-white',
      ONGOING: 'bg-yellow-600 text-white',
      COMPLETED: 'bg-green-600 text-white'
    };
    return badges[status] || 'bg-gray-600 text-white';
  };

  if (loading) {
    return <div className="text-center py-20">Loading batches...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Manage Batches</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded"
        >
          {showForm ? 'Cancel' : 'Add New Batch'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Course</label>
              <select
                value={formData.courseId}
                onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                className="w-full p-3 bg-slate-700 text-white rounded"
                required
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full p-3 bg-slate-700 text-white rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Total Seats</label>
              <input
                type="number"
                value={formData.totalSeats}
                onChange={(e) => setFormData({...formData, totalSeats: e.target.value})}
                className="w-full p-3 bg-slate-700 text-white rounded"
                min="1"
                required
              />
            </div>
          </div>
          <button type="submit" className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded">
            Create Batch
          </button>
        </form>
      )}

      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-white">Course</th>
              <th className="px-6 py-3 text-left text-white">Start Date</th>
              <th className="px-6 py-3 text-left text-white">Seats</th>
              <th className="px-6 py-3 text-left text-white">Enrolled</th>
              <th className="px-6 py-3 text-left text-white">Status</th>
              <th className="px-6 py-3 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch.id} className="border-t border-slate-600">
                <td className="px-6 py-4 text-white">{batch.course.title}</td>
                <td className="px-6 py-4 text-gray-300">{new Date(batch.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-gray-300">{batch.totalSeats}</td>
                <td className="px-6 py-4 text-gray-300">{batch.enrollments?.length || 0}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-sm ${getStatusBadge(batch.status)}`}>
                    {batch.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {batch.status === 'NOT_STARTED' && (
                    <button
                      onClick={() => updateBatchStatus(batch.id, 'ONGOING')}
                      className="text-yellow-400 hover:text-yellow-300 mr-2"
                    >
                      Start
                    </button>
                  )}
                  {batch.status === 'ONGOING' && (
                    <button
                      onClick={() => updateBatchStatus(batch.id, 'COMPLETED')}
                      className="text-green-400 hover:text-green-300"
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBatches;