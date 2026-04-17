import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRevenue: 0,
    activeBatches: 0,
    completedBatches: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-white text-center mb-8">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-indigo-400">{stats.totalStudents}</h3>
          <p className="text-gray-300">Total Students</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-green-400">₹{stats.totalRevenue}</h3>
          <p className="text-gray-300">Total Revenue</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-yellow-400">{stats.activeBatches}</h3>
          <p className="text-gray-300">Active Batches</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-400">{stats.completedBatches}</h3>
          <p className="text-gray-300">Completed Batches</p>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/courses" className="bg-slate-800 p-6 rounded-lg shadow-lg hover:bg-slate-700 transition-colors">
          <h3 className="text-xl font-bold text-white mb-2">Manage Courses</h3>
          <p className="text-gray-300">Create, edit, and delete courses</p>
        </Link>
        <Link to="/admin/batches" className="bg-slate-800 p-6 rounded-lg shadow-lg hover:bg-slate-700 transition-colors">
          <h3 className="text-xl font-bold text-white mb-2">Manage Batches</h3>
          <p className="text-gray-300">Create batches and update status</p>
        </Link>
        <Link to="/admin/students" className="bg-slate-800 p-6 rounded-lg shadow-lg hover:bg-slate-700 transition-colors">
          <h3 className="text-xl font-bold text-white mb-2">Manage Students</h3>
          <p className="text-gray-300">View enrolled students and export data</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;