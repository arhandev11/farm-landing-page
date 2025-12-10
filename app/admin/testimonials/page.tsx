"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Quote, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial { id: number; name: string; location: string; quote: string; order: number; }

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", location: "", quote: "", order: 0 });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try { setTestimonials(await (await fetch("/api/admin/testimonials")).json()); }
    catch { setMessage({ type: "error", text: "Failed to load" }); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing ? { ...formData, id: editing.id } : formData),
      });
      if (res.ok) { setMessage({ type: "success", text: "Saved!" }); fetchData(); setIsDialogOpen(false); resetForm(); }
    } catch { setMessage({ type: "error", text: "Failed to save" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete?")) return;
    try { await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" }); setMessage({ type: "success", text: "Deleted!" }); fetchData(); }
    catch { setMessage({ type: "error", text: "Failed to delete" }); }
  };

  const openEdit = (t: Testimonial) => { setEditing(t); setFormData(t); setIsDialogOpen(true); };
  const resetForm = () => { setEditing(null); setFormData({ name: "", location: "", quote: "", order: testimonials.length }); };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-ocean-blue" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-navy">Testimonials</h1><p className="text-gray-600 mt-1">Manage partner testimonials</p></div>
        <Dialog open={isDialogOpen} onOpenChange={(o) => { setIsDialogOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild><Button className="bg-ocean-blue hover:bg-ocean-blue/90"><Plus className="w-4 h-4 mr-2" />Add</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Testimonial</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-sm font-medium">Name</label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Location</label><Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required /></div>
              </div>
              <div className="space-y-2"><label className="text-sm font-medium">Quote</label><Textarea value={formData.quote} onChange={(e) => setFormData({ ...formData, quote: e.target.value })} rows={4} required /></div>
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <Card key={t.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Quote className="w-8 h-8 text-ocean-blue/30" />
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(t)} className="h-8 w-8"><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(t.id)} className="h-8 w-8 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm italic mb-4">&quot;{t.quote}&quot;</p>
              <CardTitle className="text-base text-navy">{t.name}</CardTitle>
              <p className="text-xs text-gray-500">{t.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
