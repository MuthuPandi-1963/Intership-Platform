import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, batchesRes] = await Promise.all([
        axios.get('/api/admin/students'),
        axios.get('/api/batches')
      ]);
      setStudents(studentsRes.data);
      setBatches(batchesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = selectedBatch
    ? students.filter(student =>
        student.enrollments.some(enrollment => enrollment.batchId === parseInt(selectedBatch))
      )
    : students;

  const handleExport = async () => {
    try {
      const response = await axios.get(`/api/admin/export/${selectedBatch}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'students.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting students:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading students...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Manage Students</h1>
        <div className="flex gap-4">
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="p-3 bg-slate-700 text-white rounded"
          >
            <option value="">All Batches</option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.course.title} - {new Date(batch.startDate).toLocaleDateString()}
              </option>
            ))}
          </select>
          {selectedBatch && (
            <button
              onClick={handleExport}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
            >
              Export CSV
            </button>
          )}
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-white">Name</th>
              <th className="px-6 py-3 text-left text-white">Email</th>
              <th className="px-6 py-3 text-left text-white">Phone</th>
              <th className="px-6 py-3 text-left text-white">College</th>
              <th className="px-6 py-3 text-left text-white">Course</th>
              <th className="px-6 py-3 text-left text-white">Payment Status</th>
              <th className="px-6 py-3 text-left text-white">Enrollment Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-t border-slate-600">
                <td className="px-6 py-4 text-white">{student.name}</td>
                <td className="px-6 py-4 text-gray-300">{student.email}</td>
                <td className="px-6 py-4 text-gray-300">{student.phone}</td>
                <td className="px-6 py-4 text-gray-300">{student.college}</td>
                <td className="px-6 py-4 text-gray-300">
                  {student.enrollments.map(enrollment => enrollment.batch.course.title).join(', ')}
                </td>
                <td className="px-6 py-4">
                  {student.enrollments.some(enrollment => enrollment.payment?.status === 'SUCCESS') ? (
                    <span className="text-green-400">Paid</span>
                  ) : (
                    <span className="text-red-400">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {student.enrollments.length > 0 ? new Date(student.enrollments[0].createdAt).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;