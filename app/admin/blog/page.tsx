"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Save, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface BlogArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string | null;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  image: string | null;
  published: boolean;
  order: number;
}

const categories = ["budidaya", "tips", "harga", "berita"];

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<BlogArticle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "", excerpt: "", content: "", category: "budidaya", date: "", readTime: "", featured: false, image: "", published: true, order: 0
  });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try { setArticles(await (await fetch("/api/admin/blog")).json()); }
    catch { setMessage({ type: "error", text: "Failed to load" }); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const res = await fetch("/api/admin/blog", {
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
    try { await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" }); setMessage({ type: "success", text: "Deleted!" }); fetchData(); }
    catch { setMessage({ type: "error", text: "Failed to delete" }); }
  };

  const openEdit = (a: BlogArticle) => {
    setEditing(a);
    setFormData({
      title: a.title, excerpt: a.excerpt, content: a.content || "", category: a.category, date: a.date,
      readTime: a.readTime, featured: a.featured, image: a.image || "", published: a.published, order: a.order
    });
    setIsDialogOpen(true);
  };
  const resetForm = () => {
    setEditing(null);
    setFormData({ title: "", excerpt: "", content: "", category: "budidaya", date: "", readTime: "", featured: false, image: "", published: true, order: articles.length });
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-ocean-blue" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-navy">Blog Articles</h1><p className="text-gray-600 mt-1">Manage blog posts and news</p></div>
        <Dialog open={isDialogOpen} onOpenChange={(o) => { setIsDialogOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild><Button className="bg-ocean-blue hover:bg-ocean-blue/90"><Plus className="w-4 h-4 mr-2" />Add Article</Button></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Article</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2"><label className="text-sm font-medium">Title</label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Excerpt</label><Textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={2} required /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Content</label><Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={6} /></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2"><label className="text-sm font-medium">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full h-10 px-3 rounded-md border">
                    {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div className="space-y-2"><label className="text-sm font-medium">Date</label><Input value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="20 Nov 2024" required /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Read Time</label><Input value={formData.readTime} onChange={(e) => setFormData({ ...formData, readTime: e.target.value })} placeholder="5 min" required /></div>
              </div>
              <div className="space-y-2"><label className="text-sm font-medium">Image URL</label><Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="Optional" /></div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="rounded" />
                  <span className="text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="rounded" />
                  <span className="text-sm">Published</span>
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={saving} className="bg-ocean-blue">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {message && <div className={`mb-6 p-4 rounded-xl ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{message.text}</div>}
      <div className="space-y-4">
        {articles.map((a) => (
          <Card key={a.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  {a.featured && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                  <div>
                    <CardTitle className="text-lg text-navy">{a.title}</CardTitle>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs bg-ocean-blue/10 text-ocean-blue px-2 py-1 rounded-full">{a.category}</span>
                      <span className="text-xs text-gray-500">{a.date} · {a.readTime}</span>
                      {!a.published && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Draft</span>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(a)} className="h-8 w-8"><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(a.id)} className="h-8 w-8 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent><p className="text-gray-600 text-sm">{a.excerpt}</p></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
