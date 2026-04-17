import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fee: '',
    duration: '',
    techStack: '',
    syllabus: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const techStackArray = formData.techStack.split(',').map(tech => tech.trim());
      const syllabusArray = JSON.parse(formData.syllabus);

      await axios.post('/api/courses', {
        ...formData,
        fee: parseFloat(formData.fee),
        techStack: techStackArray,
        syllabus: syllabusArray
      });

      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        fee: '',
        duration: '',
        techStack: '',
        syllabus: ''
      });
      fetchCourses();
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/api/courses/${id}`);
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading courses...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Manage Courses</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded"
        >
          {showForm ? 'Cancel' : 'Add New Course'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-3 bg-slate-700 text-white rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full p-3 bg-slate-700 text-white rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Fee</label>
              <input
                type="number"
                value={formData.fee}
                onChange={(e) => setFormData({...formData, fee: e.target.value})}
                className="w-full p-3 bg-slate-700 text-white rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Tech Stack (comma-separated)</label>
              <input
                type="text"
                value={formData.techStack}
                onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                className="w-full p-3 bg-slate-700 text-white rounded"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 bg-slate-700 text-white rounded"
              rows="3"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-300 mb-2">Syllabus (JSON array)</label>
            <textarea
              value={formData.syllabus}
              onChange={(e) => setFormData({...formData, syllabus: e.target.value})}
              className="w-full p-3 bg-slate-700 text-white rounded"
              rows="5"
              placeholder='[{"week": 1, "topics": ["HTML", "CSS"]}]'
              required
            />
          </div>
          <button type="submit" className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded">
            Create Course
          </button>
        </form>
      )}

      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-white">Title</th>
              <th className="px-6 py-3 text-left text-white">Duration</th>
              <th className="px-6 py-3 text-left text-white">Fee</th>
              <th className="px-6 py-3 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t border-slate-600">
                <td className="px-6 py-4 text-white">{course.title}</td>
                <td className="px-6 py-4 text-gray-300">{course.duration}</td>
                <td className="px-6 py-4 text-gray-300">₹{course.fee}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-400 hover:text-blue-300 mr-4">Edit</button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourses;