import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { GraduationCap, Eye, EyeOff, AlertCircle, ArrowRight, Code2, Users, Award } from 'lucide-react';
import React from 'react';

const HIGHLIGHTS = [
  { icon: Code2, label: 'Real-world projects' },
  { icon: Users, label: '500+ trained students' },
  { icon: Award, label: 'Certified programs' },
];

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate(result.user?.role === 'ADMIN' ? '/admin' : '/dashboard');
      } else {
        setError(result.error || 'Invalid email or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-900/50 via-violet-900/30 to-transparent" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="relative text-center max-w-md">
          <div className="inline-flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Intern<span className="text-indigo-400">Hub</span>
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Welcome back to your learning journey
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-10">
            Continue building skills that employers are looking for. Your next opportunity is one step away.
          </p>

          <div className="flex flex-col gap-3">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-sm text-white/70">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Icon size={14} className="text-indigo-400" />
                </div>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <GraduationCap size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Intern<span className="text-indigo-400">Hub</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-white mb-1">Sign in</h1>
          <p className="text-sm text-white/40 mb-8">
            New here?{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Create an account
            </Link>
          </p>

          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
              <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="gradient" size="lg" className="w-full gap-2 group" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
            </Button>
          </form>

          <p className="text-xs text-center text-white/20 mt-8">
            By signing in, you agree to our{' '}
            <Link to="/" className="text-white/40 hover:text-white/60">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
