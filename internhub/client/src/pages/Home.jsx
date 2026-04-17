import { Link } from 'react-router-dom';
import  React from "react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-slate-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Launch Your Tech Career with Real-World Internships
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Join 500+ students who have transformed their careers through our comprehensive internship programs.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg">
              Register Now
            </Link>
            <Link to="/courses" className="bg-transparent border-2 border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white px-8 py-3 rounded-lg text-lg">
              View Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-indigo-400">500+</h3>
              <p className="text-gray-300">Students Trained</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-indigo-400">10+</h3>
              <p className="text-gray-300">Projects Completed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-indigo-400">95%</h3>
              <p className="text-gray-300">Placement Support</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-indigo-400">100</h3>
              <p className="text-gray-300">Seats Per Batch</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Technologies You'll Master</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {['React', 'Node.js', 'JavaScript', 'PostgreSQL', 'Git', 'Tailwind CSS'].map((tech) => (
              <div key={tech} className="bg-slate-800 p-4 rounded-lg">
                <span className="text-indigo-400 font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Only 100 Seats Per Batch — Register Now!</h2>
          <p className="text-xl text-gray-300 mb-8">Fee: ₹4500 (Includes certification and placement support)</p>
          <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg">
            Enroll Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;