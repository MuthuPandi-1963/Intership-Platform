import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import {
  Menu, X, Zap, BookOpen, LayoutDashboard, LogOut, ChevronDown, GraduationCap
} from 'lucide-react';
import React from 'react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/courses', label: 'Courses', icon: BookOpen },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-[#060610]/90 backdrop-blur-xl border-b border-white/6 shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
              <GraduationCap size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Intern<span className="text-indigo-400">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  isActive(to)
                    ? 'bg-indigo-500/15 text-indigo-400'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">
                  <div className="w-6 h-6 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="text-sm text-white/80">{user.name?.split(' ')[0]}</span>
                </div>
                <Link
                  to={user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                    isActive(user.role === 'ADMIN' ? '/admin' : '/dashboard')
                      ? 'bg-indigo-500/15 text-indigo-400'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  <LayoutDashboard size={15} />
                  {user.role === 'ADMIN' ? 'Admin' : 'Dashboard'}
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white/50 hover:text-red-400 gap-1.5">
                  <LogOut size={14} />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="gradient" size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/6 bg-[#060610]/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive(to)
                    ? 'bg-indigo-500/15 text-indigo-400'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/6 space-y-1">
              {user ? (
                <>
                  <Link
                    to={user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5"
                  >
                    <LayoutDashboard size={16} />
                    {user.role === 'ADMIN' ? 'Admin Dashboard' : 'My Dashboard'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-red-400/80 hover:text-red-400 hover:bg-red-400/5 w-full text-left"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5">
                    Sign In
                  </Link>
                  <Link to="/register" className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
