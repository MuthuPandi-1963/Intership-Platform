import { Link } from 'react-router-dom';
import { GraduationCap, GitFork, MessageSquare, Link2, Mail, MapPin, Phone } from 'lucide-react';
import { Separator } from './ui/separator';
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/6 bg-[#060610]/80 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <GraduationCap size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Intern<span className="text-indigo-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              Bridging the gap between college education and real-world tech careers through hands-on internship programs.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: GitFork, href: '#' },
                { icon: MessageSquare, href: '#' },
                { icon: Link2, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4">Programs</h4>
            <ul className="space-y-2.5">
              {['Web Development', 'Data Science', 'Digital Marketing', 'UI/UX Design', 'Machine Learning'].map((item) => (
                <li key={item}>
                  <Link to="/courses" className="text-sm text-white/40 hover:text-indigo-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', to: '/' },
                { label: 'Courses', to: '/courses' },
                { label: 'Register', to: '/register' },
                { label: 'Login', to: '/login' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-white/40 hover:text-indigo-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/40">
                <Mail size={14} className="mt-0.5 shrink-0 text-indigo-400/60" />
                <span>support@internhub.in</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/40">
                <Phone size={14} className="mt-0.5 shrink-0 text-indigo-400/60" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/40">
                <MapPin size={14} className="mt-0.5 shrink-0 text-indigo-400/60" />
                <span>Bangalore, Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">&copy; {year} InternHub. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item) => (
              <Link key={item} to="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
