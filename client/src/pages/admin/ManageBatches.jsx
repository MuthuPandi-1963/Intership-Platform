import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Plus, Calendar, Users, PlayCircle, CheckCircle2, Clock, X, Mail, Phone, IndianRupee } from 'lucide-react';
import React from 'react';

const STATUS_BADGE = {
  NOT_STARTED: { variant: 'info', label: 'Upcoming' },
  ONGOING: { variant: 'warning', label: 'Ongoing' },
  COMPLETED: { variant: 'success', label: 'Completed' },
};

const ManageBatches = () => {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ courseId: '', startDate: '', totalSeats: '100' });
  const [saving, setSaving] = useState(false);
  const [detailBatch, setDetailBatch] = useState(null);
  const [batchStudents, setBatchStudents] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [bR, cR] = await Promise.all([axios.get('/api/batches'), axios.get('/api/courses')]);
      setBatches(bR.data?.batches || []);
      setCourses(cR.data?.courses || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post('/api/batches', {
        courseId: parseInt(formData.courseId),
        startDate: new Date(formData.startDate),
        totalSeats: parseInt(formData.totalSeats),
      });
      setDialogOpen(false);
      setFormData({ courseId: '', startDate: '', totalSeats: '100' });
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/batches/${id}/status`, { status });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const openBatchDetail = async (batch) => {
    setDetailBatch(batch);
    setDetailLoading(true);
    setBatchStudents([]);
    try {
      const r = await axios.get(`/api/enrollments/batch/${batch.id}`);
      setBatchStudents(r.data.enrollments || []);
    } catch (e) {
      console.error(e);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Batches</h1>
          <p className="text-sm text-white/40 mt-1">{batches.length} batch{batches.length !== 1 ? 'es' : ''} total</p>
        </div>
        <Button variant="gradient" onClick={() => setDialogOpen(true)} className="gap-2">
          <Plus size={15} /> New Batch
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}><CardContent className="p-5"><Skeleton className="h-16 w-full" /></CardContent></Card>
          ))}
        </div>
      ) : batches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/10 rounded-2xl">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <Calendar size={22} className="text-white/20" />
          </div>
          <p className="text-white/40 mb-4">No batches yet</p>
          <Button variant="outline" onClick={() => setDialogOpen(true)} className="gap-2">
            <Plus size={14} /> Create first batch
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {batches.map((batch) => {
            const statusInfo = STATUS_BADGE[batch.status] || STATUS_BADGE.NOT_STARTED;
            const enrolled = batch.enrollments?.length || 0;
            const pct = batch.totalSeats > 0 ? Math.round((enrolled / batch.totalSeats) * 100) : 0;
            return (
              <Card key={batch.id} className="hover:border-white/10 transition-all cursor-pointer" onClick={() => openBatchDetail(batch)}>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1">
                        <h3 className="font-medium text-white truncate">{batch.course?.title}</h3>
                        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          {new Date(batch.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users size={12} />
                          {enrolled} / {batch.totalSeats} enrolled
                        </span>
                      </div>
                      {/* Enrollment progress */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full bg-indigo-500 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/30">{pct}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                      {batch.status === 'NOT_STARTED' && (
                        <Button variant="success" size="sm" className="gap-1.5" onClick={() => updateStatus(batch.id, 'ONGOING')}>
                          <PlayCircle size={13} /> Start
                        </Button>
                      )}
                      {batch.status === 'ONGOING' && (
                        <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => updateStatus(batch.id, 'COMPLETED')}>
                          <CheckCircle2 size={13} /> Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Batch Detail Modal */}
      {detailBatch && (
        <>
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={() => setDetailBatch(null)} />
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#0d0d1a] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-white/8 shrink-0">
              <div>
                <h2 className="text-lg font-semibold text-white">{detailBatch.course?.title}</h2>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-white/40">
                  <span className="flex items-center gap-1.5"><Calendar size={12} />
                    {new Date(detailBatch.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5"><Users size={12} />
                    {detailBatch.enrollments?.length || 0} / {detailBatch.totalSeats} seats
                  </span>
                  <Badge variant={STATUS_BADGE[detailBatch.status]?.variant}>{STATUS_BADGE[detailBatch.status]?.label}</Badge>
                </div>
              </div>
              <button onClick={() => setDetailBatch(null)} className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/5 shrink-0">
                <X size={16} />
              </button>
            </div>

            {/* Students list */}
            <div className="overflow-y-auto flex-1 p-6">
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                Enrolled Students ({batchStudents.length})
              </h3>
              {detailLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-14 rounded-xl bg-white/4 animate-pulse" />
                  ))}
                </div>
              ) : batchStudents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-white/30">
                  <Users size={28} className="mb-3" />
                  <p className="text-sm">No students enrolled yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {batchStudents.map((enrollment, i) => {
                    const s = enrollment.student;
                    const paid = enrollment.payment?.status === 'SUCCESS';
                    return (
                      <div key={enrollment.id} className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-white/4 border border-white/6">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-300 shrink-0">
                            {s?.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">{s?.name}</p>
                            <p className="text-xs text-white/40 truncate">{s?.college} · {s?.branch}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-white/40 shrink-0">
                          <span className="hidden sm:flex items-center gap-1"><Mail size={11} />{s?.email}</span>
                          {s?.phone && <span className="hidden md:flex items-center gap-1"><Phone size={11} />{s?.phone}</span>}
                          <Badge variant={paid ? 'success' : 'warning'}>{paid ? 'Paid' : 'Pending'}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Batch</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate}>
            <div className="space-y-4 mb-6">
              <div className="space-y-1.5">
                <Label>Course *</Label>
                <Select value={formData.courseId} onChange={(e) => setFormData({ ...formData, courseId: e.target.value })} required>
                  <option value="">Select a course</option>
                  {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Start Date *</Label>
                <Input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
              </div>
              <div className="space-y-1.5">
                <Label>Total Seats *</Label>
                <Input type="number" min="1" value={formData.totalSeats} onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="gradient" disabled={saving}>
                {saving ? 'Creating...' : 'Create Batch'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageBatches;
