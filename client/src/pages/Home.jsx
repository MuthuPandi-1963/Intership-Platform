import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, Code2, Database, Palette, TrendingUp, Brain, Globe,
  CheckCircle2, Star, Users, BookOpen, Award, Zap, Shield, Clock, ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import React from 'react';

const STATS = [
  { value: '500+', label: 'Students Trained', icon: Users },
  { value: '95%', label: 'Placement Rate', icon: TrendingUp },
  { value: '10+', label: 'Live Projects', icon: Code2 },
  { value: '100', label: 'Seats / Batch', icon: Award },
];

const CATEGORIES = [
  { icon: Code2, label: 'Web Development', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/20' },
  { icon: Database, label: 'Data Science', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/20' },
  { icon: Brain, label: 'Machine Learning', color: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/20' },
  { icon: Palette, label: 'UI/UX Design', color: 'from-rose-500/20 to-pink-500/20', border: 'border-rose-500/20' },
  { icon: TrendingUp, label: 'Digital Marketing', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/20' },
  { icon: Globe, label: 'Full Stack', color: 'from-indigo-500/20 to-violet-500/20', border: 'border-indigo-500/20' },
];

const FEATURES = [
  { icon: Zap, title: 'Industry Mentors', desc: 'Learn directly from professionals working at top tech companies.' },
  { icon: Code2, title: 'Real Projects', desc: 'Build portfolio-worthy projects that impress recruiters.' },
  { icon: Shield, title: 'Certification', desc: 'Get industry-recognized certificates upon completion.' },
  { icon: Users, title: 'Placement Support', desc: '1:1 guidance, resume review, and interview prep included.' },
  { icon: Clock, title: 'Flexible Schedule', desc: 'Weekend and weekday batches to fit your college timetable.' },
  { icon: Award, title: 'Live Interactions', desc: 'Weekly live sessions, doubt-clearing, and peer learning.' },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'SDE at Infosys',
    avatar: 'PS',
    text: 'InternHub completely transformed my career. The hands-on projects and mentorship helped me land my first job right after college.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'Data Analyst at TCS',
    avatar: 'RV',
    text: 'The data science program was exactly what I needed. Real datasets, real problems, and amazing guidance throughout.',
    rating: 5,
  },
  {
    name: 'Anjali Patel',
    role: 'Frontend Dev at Wipro',
    avatar: 'AP',
    text: 'Best investment of my career. The curriculum is up-to-date with industry standards and the community is incredibly supportive.',
    rating: 5,
  },
];

const TECH = ['React', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Git', 'Docker', 'AWS', 'Tailwind CSS', 'TypeScript'];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 sm:px-6 py-20 text-center">
          <Badge variant="default" className="mb-6 gap-1.5 px-3 py-1.5 text-xs">
            <Sparkles size={11} />
            Limited seats — Batch starting soon
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Launch Your{' '}
            <span className="gradient-text">Tech Career</span>
            <br />
            with Real Internships
          </h1>

          <p className="text-lg sm:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join 500+ students who transformed their careers through our comprehensive,
            industry-led internship programs. Build. Learn. Get Hired.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/register">
              <Button variant="gradient" size="xl" className="gap-2 group">
                Start Your Journey
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="xl" className="gap-2">
                <BookOpen size={18} />
                Browse Programs
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            {['No prior experience needed', 'Certificate on completion', 'Placement support'].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-3 group-hover:bg-indigo-500/20 transition-colors">
                  <Icon size={20} className="text-indigo-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-white/40">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Programs</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Choose Your <span className="gradient-text">Specialization</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Industry-aligned programs designed to make you job-ready from day one.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map(({ icon: Icon, label, color, border }) => (
              <Link key={label} to="/courses">
                <Card className={`group cursor-pointer hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 ${border}`}>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${color} flex items-center justify-center border ${border} group-hover:scale-110 transition-transform`}>
                      <Icon size={20} className="text-white/70" />
                    </div>
                    <div>
                      <p className="font-medium text-white/90 text-sm">{label}</p>
                      <p className="text-xs text-white/40 mt-0.5 flex items-center gap-1">
                        View courses <ChevronRight size={10} />
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 border-y border-white/6 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/30 mb-8">
            Technologies You'll Master
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full border border-white/8 bg-white/3 text-sm text-white/50 hover:border-indigo-500/40 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Why InternHub</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="group hover:border-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                    <Icon size={18} className="text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t border-white/6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Student Stories</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Hear From Our <span className="gradient-text">Alumni</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, avatar, text, rating }) => (
              <Card key={name} className="hover:border-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed mb-5">"{text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{name}</p>
                      <p className="text-xs text-white/40">{role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl overflow-hidden border border-indigo-500/20 bg-linear-to-br from-indigo-600/10 via-violet-600/5 to-transparent p-10 sm:p-16 text-center">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/20 blur-3xl" />
            <div className="relative">
              <Badge variant="default" className="mb-6">Limited Seats Available</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Only 100 Seats Per Batch
              </h2>
              <p className="text-white/50 mb-3 text-lg">
                Fee: <span className="text-white font-semibold">₹4,500</span>
                <span className="text-white/30 ml-2 text-sm">(Includes certification + placement support)</span>
              </p>
              <p className="text-white/30 text-sm mb-8">Don't miss your chance — seats fill up fast.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <Button variant="gradient" size="lg" className="gap-2 group">
                    Enroll Today
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button variant="outline" size="lg">View All Programs</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
