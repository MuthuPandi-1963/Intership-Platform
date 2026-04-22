import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { BookOpen, Clock, IndianRupee, CalendarDays, ArrowRight, GraduationCap } from 'lucide-react';
import React from 'react';

const STATUS_CONFIG = {
  NOT_STARTED: { variant: 'info', label: 'Upcoming' },
  ONGOING: { variant: 'warning', label: 'In Progress' },
  COMPLETED: { variant: 'success', label: 'Completed' },
};

const EnrollmentSkeleton = () => (
  <Card>
    <CardContent className="p-5 space-y-3">
      <div className="flex gap-2"><Skeleton className="h-5 w-20 rounded-full" /></div>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="grid grid-cols-2 gap-2"><Skeleton className="h-4" /><Skeleton className="h-4" /></div>
    </CardContent>
  </Card>
);

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/enrollments/my')
      .then((r) => setEnrollments(r.data.enrollments || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: enrollments.length,
    ongoing:enrollments.length > 0 ? enrollments.filter((e) => e.batch?.status === 'ONGOING').length : 0,
    completed: enrollments.length > 0 ? enrollments.filter((e) => e.batch?.status === 'COMPLETED').length : 0,
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 border-b border-white/6">
        <div className="absolute inset-0 hero-gradient opacity-40" />
        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-sm text-white/40 mb-1">Welcome back</p>
              <h1 className="text-2xl font-bold text-white">{user?.name?.split(' ')[0]}'s Dashboard</h1>
              <p className="text-sm text-white/40 mt-1">{user?.college} · {user?.branch}</p>
            </div>
            <Link to="/courses">
              <Button variant="gradient" className="gap-2">
                Browse More Courses <ArrowRight size={15} />
              </Button>
            </Link>
          </div>

          {/* Quick stats */}
          {!loading && enrollments.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-6">
              {[
                { label: 'Enrolled', value: stats.total, color: 'text-indigo-400' },
                { label: 'In Progress', value: stats.ongoing, color: 'text-amber-400' },
                { label: 'Completed', value: stats.completed, color: 'text-emerald-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8">
                  <span className={`text-lg font-bold ${color}`}>{value}</span>
                  <span className="text-sm text-white/40">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => <EnrollmentSkeleton key={i} />)}
          </div>
        ) : enrollments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/10 rounded-2xl">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
              <GraduationCap size={26} className="text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No courses yet</h3>
            <p className="text-sm text-white/40 mb-6 text-center max-w-xs">
              You haven't enrolled in any programs. Browse our courses and start your journey today.
            </p>
            <Link to="/courses">
              <Button variant="gradient" className="gap-2">
                Browse Programs <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-base font-semibold text-white mb-5">My Enrolled Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrollments.length && enrollments.map((enrollment) => {
                const course = enrollment.batch?.course;
                const batch = enrollment.batch;
                const statusCfg = STATUS_CONFIG[batch?.status] || STATUS_CONFIG.NOT_STARTED;
                const startDate = batch?.startDate
                  ? new Date(batch.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                  : 'TBD';

                return (
                  <Card key={enrollment.id} className="flex flex-col hover:border-white/10 transition-all overflow-hidden">
                    {course?.image ? (
                      <img src={course.image} alt={course.title} className="h-36 w-full object-cover" />
                    ) : (
                      <div className="h-36 bg-linear-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
                        <BookOpen size={28} className="text-white/15" />
                      </div>
                    )}
                    <CardContent className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-white text-sm leading-snug">{course?.title}</h3>
                        <Badge variant={statusCfg.variant} className="shrink-0">{statusCfg.label}</Badge>
                      </div>
                      <p className="text-xs text-white/40 line-clamp-2 mb-4 flex-1">{course?.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-white/40">
                        <span className="flex items-center gap-1.5"><Clock size={11} />{course?.duration}</span>
                        <span className="flex items-center gap-1.5"><IndianRupee size={11} />{course?.fee?.toLocaleString('en-IN')}</span>
                        <span className="flex items-center gap-1.5 col-span-2"><CalendarDays size={11} />Batch started {startDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
