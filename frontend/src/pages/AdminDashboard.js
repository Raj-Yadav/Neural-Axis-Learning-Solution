import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Zap, LogOut, Users, UserPlus, TrendingUp, Clock, MoreVertical, Trash2, Eye, Loader2, CreditCard, IndianRupee, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STATUS_COLORS = {
  new: "bg-na-blue-bg text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  qualified: "bg-na-mint-bg text-green-700 border-green-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
};

const ENROLLMENT_STATUS_COLORS = {
  pending_verification: "bg-amber-50 text-amber-700 border-amber-200",
  verified: "bg-na-mint-bg text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <Card className="border border-[rgba(15,23,42,0.08)]" data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-na-text-sec mb-1">{label}</p>
            <p className="font-heading text-3xl font-medium tracking-tighter text-na-text">{value}</p>
          </div>
          <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-na-navy" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LeadDetailDialog({ lead, open, onClose, onUpdate }) {
  const [status, setStatus] = useState(lead?.status || "");
  const [notes, setNotes] = useState(lead?.notes || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setStatus(lead.status);
      setNotes(lead.notes || "");
    }
  }, [lead]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.patch(`${API}/leads/${lead.id}`, { status, notes }, { withCredentials: true });
      toast.success("Lead updated");
      onUpdate();
      onClose();
    } catch {
      toast.error("Failed to update lead");
    } finally {
      setSaving(false);
    }
  };

  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg" data-testid="lead-detail-dialog">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-na-text">{lead.name}</DialogTitle>
          <DialogDescription className="text-na-text-sec">{lead.role} at {lead.institution}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1">Email</p>
              <p className="text-na-text">{lead.email}</p>
            </div>
            <div>
              <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1">Phone</p>
              <p className="text-na-text">{lead.phone || "N/A"}</p>
            </div>
            <div>
              <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1">Preferred Date</p>
              <p className="text-na-text">{lead.preferred_date || "Not specified"}</p>
            </div>
            <div>
              <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1">Submitted</p>
              <p className="text-na-text">{new Date(lead.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          {lead.message && (
            <div>
              <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1">Message</p>
              <p className="text-sm text-na-text bg-[#FAFAFA] p-3 rounded-lg">{lead.message}</p>
            </div>
          )}
          <div>
            <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1.5">Status</p>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-10" data-testid="lead-status-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1.5">Notes</p>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes..."
              rows={3}
              data-testid="lead-notes-input"
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-na-navy text-white hover:bg-na-navy/90"
            data-testid="lead-save-button"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EnrollmentDetailDialog({ enrollment, open, onClose, onUpdate }) {
  const [status, setStatus] = useState(enrollment?.status || "");
  const [notes, setNotes] = useState(enrollment?.notes || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (enrollment) {
      setStatus(enrollment.status);
      setNotes(enrollment.notes || "");
    }
  }, [enrollment]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.patch(`${API}/enrollments/${enrollment.id}`, { status, notes }, { withCredentials: true });
      toast.success("Enrollment updated");
      onUpdate();
      onClose();
    } catch {
      toast.error("Failed to update enrollment");
    } finally {
      setSaving(false);
    }
  };

  if (!enrollment) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg" data-testid="enrollment-detail-dialog">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-na-text">{enrollment.name}</DialogTitle>
          <DialogDescription className="text-na-text-sec">{enrollment.course}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1">Email</p>
              <p className="text-na-text break-all">{enrollment.email}</p>
            </div>
            <div>
              <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1">Phone</p>
              <p className="text-na-text">{enrollment.phone}</p>
            </div>
            <div>
              <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1">Amount</p>
              <p className="text-na-text font-medium">
                ₹{Number(enrollment.amount).toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1">Submitted</p>
              <p className="text-na-text">{new Date(enrollment.created_at).toLocaleString()}</p>
            </div>
            <div className="col-span-2">
              <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1">UPI Txn Ref</p>
              <p className="text-na-text font-mono bg-[#FAFAFA] px-2 py-1 rounded text-xs inline-block">{enrollment.upi_txn_ref}</p>
            </div>
            {enrollment.payer_upi && (
              <div className="col-span-2">
                <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1">Payer UPI ID</p>
                <p className="text-na-text font-mono">{enrollment.payer_upi}</p>
              </div>
            )}
            <div className="col-span-2">
              <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1">Paid To</p>
              <p className="text-na-text font-mono text-xs">{enrollment.upi_id_paid_to}</p>
            </div>
          </div>
          <div>
            <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1.5">Status</p>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-10" data-testid="enrollment-status-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending_verification">Pending Verification</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-na-text-sec text-xs uppercase tracking-wider mb-1.5">Notes</p>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes..."
              rows={3}
              data-testid="enrollment-notes-input"
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-na-navy text-white hover:bg-na-navy/90"
            data-testid="enrollment-save-button"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminDashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("leads");

  // Leads state
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);

  // Enrollments state
  const [enrollments, setEnrollments] = useState([]);
  const [enrollmentStats, setEnrollmentStats] = useState(null);
  const [enrollmentFilter, setEnrollmentFilter] = useState("all");
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      if (activeTab === "leads") {
        const [leadsRes, statsRes] = await Promise.all([
          axios.get(`${API}/leads`, { params: filter !== "all" ? { status: filter } : {}, withCredentials: true }),
          axios.get(`${API}/leads/stats`, { withCredentials: true }),
        ]);
        setLeads(leadsRes.data);
        setStats(statsRes.data);
      } else {
        const [enrollRes, enrollStatsRes] = await Promise.all([
          axios.get(`${API}/enrollments`, { params: enrollmentFilter !== "all" ? { status: enrollmentFilter } : {}, withCredentials: true }),
          axios.get(`${API}/enrollments/stats`, { withCredentials: true }),
        ]);
        setEnrollments(enrollRes.data);
        setEnrollmentStats(enrollStatsRes.data);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/admin");
      }
    } finally {
      setLoading(false);
    }
  }, [activeTab, filter, enrollmentFilter, navigate]);

  useEffect(() => {
    if (authLoading) return;
    if (!user || user === false) {
      navigate("/admin");
      return;
    }
    fetchData();
  }, [authLoading, user, navigate, fetchData]);

  const handleDelete = async (leadId) => {
    if (!window.confirm("Delete this lead?")) return;
    try {
      await axios.delete(`${API}/leads/${leadId}`, { withCredentials: true });
      toast.success("Lead deleted");
      fetchData();
    } catch {
      toast.error("Failed to delete lead");
    }
  };

  const handleDeleteEnrollment = async (id) => {
    if (!window.confirm("Delete this enrollment?")) return;
    try {
      await axios.delete(`${API}/enrollments/${id}`, { withCredentials: true });
      toast.success("Enrollment deleted");
      fetchData();
    } catch {
      toast.error("Failed to delete enrollment");
    }
  };

  const handleUpdateEnrollmentStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/enrollments/${id}`, { status }, { withCredentials: true });
      toast.success(`Marked as ${status.replace(/_/g, " ")}`);
      fetchData();
    } catch {
      toast.error("Failed to update enrollment");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="w-8 h-8 animate-spin text-na-navy" />
      </div>
    );
  }

  const filters = ["all", "new", "contacted", "qualified", "closed"];
  const enrollmentFilters = ["all", "pending_verification", "verified", "rejected"];

  return (
    <div className="min-h-screen bg-[#FAFAFA]" data-testid="admin-dashboard">
      {/* Top Bar */}
      <header className="bg-white border-b border-[rgba(15,23,42,0.08)] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-na-navy" />
            <span className="font-heading font-bold text-lg tracking-tight text-na-text">Neural Axis Learning Solution</span>
            <span className="text-xs text-na-text-sec ml-2 hidden sm:inline">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-na-text-sec hover:text-na-text transition-colors" data-testid="dashboard-view-site">
              View Site
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-sm"
              data-testid="dashboard-logout"
            >
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Top-level tab switcher */}
        <div className="flex gap-1 mb-6 border-b border-[rgba(15,23,42,0.08)]" data-testid="admin-tabs">
          <button
            onClick={() => { setActiveTab("leads"); setLoading(true); }}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === "leads" ? "border-na-navy text-na-navy" : "border-transparent text-na-text-sec hover:text-na-text"}`}
            data-testid="tab-leads"
          >
            <Users className="w-4 h-4 mr-1.5 inline" /> Leads
          </button>
          <button
            onClick={() => { setActiveTab("enrollments"); setLoading(true); }}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === "enrollments" ? "border-na-navy text-na-navy" : "border-transparent text-na-text-sec hover:text-na-text"}`}
            data-testid="tab-enrollments"
          >
            <CreditCard className="w-4 h-4 mr-1.5 inline" /> Enrollments
          </button>
        </div>

        {activeTab === "leads" ? (
          <>
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Users} label="Total Leads" value={stats.total} color="bg-na-blue-bg" />
            <StatCard icon={UserPlus} label="New" value={stats.new} color="bg-na-mint-bg" />
            <StatCard icon={Clock} label="This Week" value={stats.this_week} color="bg-na-sand" />
            <StatCard icon={TrendingUp} label="Qualified" value={stats.qualified} color="bg-na-mint-bg" />
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {filters.map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className={filter === f ? "bg-na-navy text-white hover:bg-na-navy/90" : "text-na-text-sec"}
              data-testid={`filter-${f}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        {/* Lead Table */}
        <Card className="border border-[rgba(15,23,42,0.08)]">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-lg text-na-text">Leads ({leads.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {leads.length === 0 ? (
              <div className="p-12 text-center text-na-text-sec text-sm" data-testid="no-leads">
                No leads found for this filter.
              </div>
            ) : (
              <Table data-testid="leads-table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs uppercase tracking-wider">Name</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider hidden sm:table-cell">Role</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider hidden md:table-cell">Institution</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider hidden lg:table-cell">Email</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider hidden sm:table-cell">Date</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id} className="cursor-pointer" onClick={() => setSelectedLead(lead)}>
                      <TableCell className="font-medium text-na-text text-sm">{lead.name}</TableCell>
                      <TableCell className="text-sm text-na-text-sec hidden sm:table-cell">{lead.role}</TableCell>
                      <TableCell className="text-sm text-na-text-sec hidden md:table-cell">{lead.institution}</TableCell>
                      <TableCell className="text-sm text-na-text-sec hidden lg:table-cell">{lead.email}</TableCell>
                      <TableCell>
                        <Badge className={`${STATUS_COLORS[lead.status] || STATUS_COLORS.new} text-xs border`} data-testid={`lead-status-${lead.id}`}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-na-text-sec hidden sm:table-cell">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid={`lead-actions-${lead.id}`} onClick={(e) => e.stopPropagation()}>
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedLead(lead)} data-testid={`lead-view-${lead.id}`}>
                              <Eye className="w-4 h-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }}
                              className="text-red-600 focus:text-red-600"
                              data-testid={`lead-delete-${lead.id}`}
                            >
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        </>
        ) : (
          /* ============== ENROLLMENTS TAB ============== */
          <>
            {enrollmentStats && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon={CreditCard} label="Total Enrollments" value={enrollmentStats.total} color="bg-na-blue-bg" />
                <StatCard icon={AlertCircle} label="Pending" value={enrollmentStats.pending_verification} color="bg-amber-100" />
                <StatCard icon={CheckCircle2} label="Verified" value={enrollmentStats.verified} color="bg-na-mint-bg" />
                <StatCard
                  icon={IndianRupee}
                  label="Revenue (verified)"
                  value={`₹${Number(enrollmentStats.revenue || 0).toLocaleString("en-IN")}`}
                  color="bg-na-sand"
                />
              </div>
            )}

            <div className="flex gap-2 mb-6 flex-wrap">
              {enrollmentFilters.map((f) => (
                <Button
                  key={f}
                  variant={enrollmentFilter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEnrollmentFilter(f)}
                  className={enrollmentFilter === f ? "bg-na-navy text-white hover:bg-na-navy/90" : "text-na-text-sec"}
                  data-testid={`filter-enrollment-${f}`}
                >
                  {f === "all" ? "All" : f.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")}
                </Button>
              ))}
            </div>

            <Card className="border border-[rgba(15,23,42,0.08)]">
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-lg text-na-text">Enrollments ({enrollments.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {enrollments.length === 0 ? (
                  <div className="p-12 text-center text-na-text-sec text-sm" data-testid="no-enrollments">
                    No enrollments found for this filter.
                  </div>
                ) : (
                  <Table data-testid="enrollments-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs uppercase tracking-wider">Name</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider hidden md:table-cell">Course</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider hidden lg:table-cell">Email</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider hidden sm:table-cell">Amount</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider hidden md:table-cell">Txn Ref</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider">Status</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrollments.map((en) => (
                        <TableRow key={en.id} className="cursor-pointer" onClick={() => setSelectedEnrollment(en)}>
                          <TableCell className="font-medium text-na-text text-sm">
                            {en.name}
                            <div className="text-[11px] text-na-text-sec sm:hidden">{en.phone}</div>
                          </TableCell>
                          <TableCell className="text-sm text-na-text-sec hidden md:table-cell">{en.course}</TableCell>
                          <TableCell className="text-sm text-na-text-sec hidden lg:table-cell">{en.email}</TableCell>
                          <TableCell className="text-sm text-na-text hidden sm:table-cell font-medium">
                            ₹{Number(en.amount).toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell className="text-xs font-mono text-na-text-sec hidden md:table-cell">{en.upi_txn_ref}</TableCell>
                          <TableCell>
                            <Badge className={`${ENROLLMENT_STATUS_COLORS[en.status] || ""} text-xs border capitalize`} data-testid={`enrollment-status-${en.id}`}>
                              {en.status.replace(/_/g, " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid={`enrollment-actions-${en.id}`} onClick={(e) => e.stopPropagation()}>
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setSelectedEnrollment(en)}>
                                  <Eye className="w-4 h-4 mr-2" /> View Details
                                </DropdownMenuItem>
                                {en.status !== "verified" && (
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleUpdateEnrollmentStatus(en.id, "verified"); }} data-testid={`enrollment-verify-${en.id}`}>
                                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" /> Mark Verified
                                  </DropdownMenuItem>
                                )}
                                {en.status !== "rejected" && (
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleUpdateEnrollmentStatus(en.id, "rejected"); }}>
                                    <XCircle className="w-4 h-4 mr-2 text-red-600" /> Mark Rejected
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={(e) => { e.stopPropagation(); handleDeleteEnrollment(en.id); }}
                                  className="text-red-600 focus:text-red-600"
                                  data-testid={`enrollment-delete-${en.id}`}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>

      <LeadDetailDialog
        lead={selectedLead}
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdate={fetchData}
      />

      <EnrollmentDetailDialog
        enrollment={selectedEnrollment}
        open={!!selectedEnrollment}
        onClose={() => setSelectedEnrollment(null)}
        onUpdate={fetchData}
      />
    </div>
  );
}
