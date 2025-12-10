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
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
}

const availableIcons = ["BadgePercent", "MessageCircle", "Award", "Wallet", "MapPin", "Shield", "Clock", "CheckCircle"];

export default function FeaturesPage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ icon: "BadgePercent", title: "", description: "", order: 0 });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => { fetchFeatures(); }, []);

  const fetchFeatures = async () => {
    try {
      const res = await fetch("/api/admin/features");
      setFeatures(await res.json());
    } catch { setMessage({ type: "error", text: "Failed to load features" }); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/features", {
        method: editingFeature ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingFeature ? { ...formData, id: editingFeature.id } : formData),
      });
      if (res.ok) { setMessage({ type: "success", text: "Saved!" }); fetchFeatures(); setIsDialogOpen(false); resetForm(); }
    } catch { setMessage({ type: "error", text: "Failed to save" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this feature?")) return;
    try {
      await fetch(`/api/admin/features?id=${id}`, { method: "DELETE" });
      setMessage({ type: "success", text: "Deleted!" }); fetchFeatures();
    } catch { setMessage({ type: "error", text: "Failed to delete" }); }
  };

  const openEdit = (f: Feature) => { setEditingFeature(f); setFormData(f); setIsDialogOpen(true); };
  const resetForm = () => { setEditingFeature(null); setFormData({ icon: "BadgePercent", title: "", description: "", order: features.length }); };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-ocean-blue" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-navy">Features</h1><p className="text-gray-600 mt-1">Manage Why Choose Us features</p></div>
        <Dialog open={isDialogOpen} onOpenChange={(o) => { setIsDialogOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild><Button className="bg-ocean-blue hover:bg-ocean-blue/90"><Plus className="w-4 h-4 mr-2" />Add Feature</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingFeature ? "Edit" : "Add"} Feature</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2"><label className="text-sm font-medium">Icon</label>
                <select value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full h-10 px-3 rounded-md border">
                  {availableIcons.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="space-y-2"><label className="text-sm font-medium">Title</label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Description</label><Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} required /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Order</label><Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} /></div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={saving} className="bg-ocean-blue">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {message && <div className={`mb-6 p-4 rounded-xl ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{message.text}</div>}
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((f) => (
          <Card key={f.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-ocean-blue/10 rounded-xl flex items-center justify-center text-ocean-blue font-bold">{f.icon.charAt(0)}</div>
                  <CardTitle className="text-lg text-navy">{f.title}</CardTitle>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(f)} className="h-8 w-8"><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(f.id)} className="h-8 w-8 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent><p className="text-gray-600 text-sm">{f.description}</p></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
