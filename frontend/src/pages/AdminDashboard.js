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
import { Zap, LogOut, Users, UserPlus, TrendingUp, Clock, MoreVertical, Trash2, Eye, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STATUS_COLORS = {
  new: "bg-na-blue-bg text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  qualified: "bg-na-mint-bg text-green-700 border-green-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
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

export default function AdminDashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [leadsRes, statsRes] = await Promise.all([
        axios.get(`${API}/leads`, { params: filter !== "all" ? { status: filter } : {}, withCredentials: true }),
        axios.get(`${API}/leads/stats`, { withCredentials: true }),
      ]);
      setLeads(leadsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/admin");
      }
    } finally {
      setLoading(false);
    }
  }, [filter, navigate]);

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

  return (
    <div className="min-h-screen bg-[#FAFAFA]" data-testid="admin-dashboard">
      {/* Top Bar */}
      <header className="bg-white border-b border-[rgba(15,23,42,0.08)] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-na-navy" />
            <span className="font-heading font-bold text-lg tracking-tight text-na-text">Neural Axis</span>
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
      </main>

      <LeadDetailDialog
        lead={selectedLead}
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdate={fetchData}
      />
    </div>
  );
}
