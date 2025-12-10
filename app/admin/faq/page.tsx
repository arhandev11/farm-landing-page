"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface FAQ { id: number; type: string; question: string; answer: string; order: number; }

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("petambak");
  const [formData, setFormData] = useState({ type: "petambak", question: "", answer: "", order: 0 });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try { setFaqs(await (await fetch("/api/admin/faq")).json()); }
    catch { setMessage({ type: "error", text: "Failed to load" }); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const res = await fetch("/api/admin/faq", {
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
    try { await fetch(`/api/admin/faq?id=${id}`, { method: "DELETE" }); setMessage({ type: "success", text: "Deleted!" }); fetchData(); }
    catch { setMessage({ type: "error", text: "Failed to delete" }); }
  };

  const openEdit = (f: FAQ) => { setEditing(f); setFormData(f); setIsDialogOpen(true); };
  const resetForm = () => {
    setEditing(null);
    const currentFaqs = faqs.filter(f => f.type === activeTab);
    setFormData({ type: activeTab, question: "", answer: "", order: currentFaqs.length });
  };

  const filteredFaqs = faqs.filter(f => f.type === activeTab);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-ocean-blue" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-navy">FAQ</h1><p className="text-gray-600 mt-1">Manage frequently asked questions</p></div>
        <Dialog open={isDialogOpen} onOpenChange={(o) => { setIsDialogOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild><Button className="bg-ocean-blue hover:bg-ocean-blue/90"><Plus className="w-4 h-4 mr-2" />Add FAQ</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} FAQ</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2"><label className="text-sm font-medium">Type</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full h-10 px-3 rounded-md border">
                  <option value="petambak">Petambak</option>
                  <option value="pembeli">Pembeli</option>
                </select>
              </div>
              <div className="space-y-2"><label className="text-sm font-medium">Question</label><Textarea value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} rows={2} required /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Answer</label><Textarea value={formData.answer} onChange={(e) => setFormData({ ...formData, answer: e.target.value })} rows={4} required /></div>
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
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="petambak">Petambak ({faqs.filter(f => f.type === "petambak").length})</TabsTrigger>
          <TabsTrigger value="pembeli">Pembeli ({faqs.filter(f => f.type === "pembeli").length})</TabsTrigger>
        </TabsList>
        <TabsContent value="petambak"><FAQList faqs={filteredFaqs} onEdit={openEdit} onDelete={handleDelete} /></TabsContent>
        <TabsContent value="pembeli"><FAQList faqs={filteredFaqs} onEdit={openEdit} onDelete={handleDelete} /></TabsContent>
      </Tabs>
    </div>
  );
}

function FAQList({ faqs, onEdit, onDelete }: { faqs: FAQ[], onEdit: (f: FAQ) => void, onDelete: (id: number) => void }) {
  return (
    <div className="space-y-4">
      {faqs.map((f) => (
        <Card key={f.id} className="group hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base text-navy pr-4">{f.question}</CardTitle>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <Button size="icon" variant="ghost" onClick={() => onEdit(f)} className="h-8 w-8"><Pencil className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => onDelete(f.id)} className="h-8 w-8 text-red-500"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent><p className="text-gray-600 text-sm">{f.answer}</p></CardContent>
        </Card>
      ))}
    </div>
  );
}
