"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroStat {
  id: number;
  value: string;
  label: string;
  order: number;
}

export default function HeroStatsPage() {
  const [stats, setStats] = useState<HeroStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingStat, setEditingStat] = useState<HeroStat | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ value: "", label: "", order: 0 });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/hero-stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setMessage({ type: "error", text: "Failed to load stats" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const method = editingStat ? "PUT" : "POST";
      const body = editingStat
        ? { ...formData, id: editingStat.id }
        : formData;

      const res = await fetch("/api/admin/hero-stats", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage({ type: "success", text: `Stat ${editingStat ? "updated" : "created"} successfully!` });
        fetchStats();
        setIsDialogOpen(false);
        resetForm();
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      console.error("Error saving stat:", error);
      setMessage({ type: "error", text: "Failed to save stat" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this stat?")) return;

    try {
      const res = await fetch(`/api/admin/hero-stats?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Stat deleted successfully!" });
        fetchStats();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting stat:", error);
      setMessage({ type: "error", text: "Failed to delete stat" });
    }
  };

  const openEditDialog = (stat: HeroStat) => {
    setEditingStat(stat);
    setFormData({ value: stat.value, label: stat.label, order: stat.order });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingStat(null);
    setFormData({ value: "", label: "", order: stats.length });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-ocean-blue" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy">Hero Stats</h1>
          <p className="text-gray-600 mt-1">Manage statistics shown in the hero section</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-ocean-blue hover:bg-ocean-blue/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Stat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingStat ? "Edit Stat" : "Add New Stat"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-navy">Value</label>
                <Input
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="500+"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-navy">Label</label>
                <Input
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="Petambak Mitra"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-navy">Order</label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-ocean-blue hover:bg-ocean-blue/90"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-xl ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ocean-blue to-teal">
                  {stat.value}
                </CardTitle>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openEditDialog(stat)}
                    className="h-8 w-8"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(stat.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 font-medium">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-1">Order: {stat.order}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
