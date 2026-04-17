import  React from "react";
const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-indigo-400 mb-4">InternHub</h3>
            <p>Empowering students with real-world internship opportunities.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/courses" className="hover:text-white">Courses</a></li>
              <li><a href="/register" className="hover:text-white">Register</a></li>
              <li><a href="/login" className="hover:text-white">Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p>WhatsApp: +91 XXXXXXXXXX</p>
            <p>Email: contact@yourcompany.com</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 InternHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;