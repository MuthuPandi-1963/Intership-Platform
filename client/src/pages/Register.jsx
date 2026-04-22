import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { GraduationCap, Eye, EyeOff, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import React from 'react';

const PERKS = [
  'Access to all internship programs',
  'Real project experience & portfolio',
  'Industry-recognized certification',
  'Placement support & resume review',
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', college: '', branch: '', year: '', password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Rahul Sharma', col: 2 },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', col: 2 },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210', col: 1 },
    { name: 'college', label: 'College / University', type: 'text', placeholder: 'IIT Delhi', col: 1 },
    { name: 'branch', label: 'Branch', type: 'text', placeholder: 'Computer Science', col: 1 },
    { name: 'year', label: 'Year of Study', type: 'text', placeholder: '3rd Year', col: 1 },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-900/50 via-violet-900/30 to-transparent" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-xs">
          <Link to="/" className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Intern<span className="text-indigo-400">Hub</span>
            </span>
          </Link>

          <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
            Start your tech career today
          </h2>
          <p className="text-white/50 text-sm mb-8">
            Join thousands of students who landed their first job through InternHub.
          </p>

          <div className="space-y-3">
            {PERKS.map((perk) => (
              <div key={perk} className="flex items-center gap-3 text-sm text-white/70">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                {perk}
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 rounded-xl bg-white/5 border border-white/8">
            <p className="text-sm font-medium text-white mb-1">One-time fee: ₹4,500</p>
            <p className="text-xs text-white/40">Includes certificate + placement support</p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 overflow-y-auto">
        <div className="w-full max-w-lg py-6">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <GraduationCap size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Intern<span className="text-indigo-400">Hub</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
          <p className="text-sm text-white/40 mb-7">
            Already registered?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign in
            </Link>
          </p>

          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
              <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {fields.map(({ name, label, type, placeholder, col }) => (
                <div key={name} className={`space-y-1.5 ${col === 2 ? 'col-span-2' : 'col-span-1'}`}>
                  <Label htmlFor={name}>{label}</Label>
                  <Input
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="space-y-1.5 col-span-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pr-10"
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
            </div>

            <Button type="submit" variant="gradient" size="lg" className="w-full gap-2 group mt-2" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
            </Button>
          </form>

          <p className="text-xs text-center text-white/20 mt-6">
            By creating an account, you agree to our{' '}
            <Link to="/" className="text-white/40 hover:text-white/60">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/" className="text-white/40 hover:text-white/60">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
