"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  season: string;
  sizes: string[];
  order: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ slug: "", name: "", description: "", season: "", sizes: "", order: 0 });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      setProducts(await res.json());
    } catch { setMessage({ type: "error", text: "Failed to load products" }); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const sizesArray = formData.sizes.split(",").map(s => s.trim()).filter(Boolean);
      const body = { ...formData, sizes: sizesArray, ...(editingProduct ? { id: editingProduct.id } : {}) };
      const res = await fetch("/api/admin/products", {
        method: editingProduct ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) { setMessage({ type: "success", text: "Saved!" }); fetchProducts(); setIsDialogOpen(false); resetForm(); }
    } catch { setMessage({ type: "error", text: "Failed to save" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    try {
      await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      setMessage({ type: "success", text: "Deleted!" }); fetchProducts();
    } catch { setMessage({ type: "error", text: "Failed to delete" }); }
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({ slug: p.slug, name: p.name, description: p.description, season: p.season, sizes: p.sizes.join(", "), order: p.order });
    setIsDialogOpen(true);
  };
  const resetForm = () => { setEditingProduct(null); setFormData({ slug: "", name: "", description: "", season: "", sizes: "", order: products.length }); };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-ocean-blue" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-navy">Products</h1><p className="text-gray-600 mt-1">Manage shrimp products catalog</p></div>
        <Dialog open={isDialogOpen} onOpenChange={(o) => { setIsDialogOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild><Button className="bg-ocean-blue hover:bg-ocean-blue/90"><Plus className="w-4 h-4 mr-2" />Add Product</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{editingProduct ? "Edit" : "Add"} Product</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-sm font-medium">Slug</label><Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="vaname" required /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Name</label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Udang Vaname" required /></div>
              </div>
              <div className="space-y-2"><label className="text-sm font-medium">Description</label><Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} required /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Season</label><Input value={formData.season} onChange={(e) => setFormData({ ...formData, season: e.target.value })} placeholder="Sepanjang tahun" required /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Sizes (comma-separated)</label><Input value={formData.sizes} onChange={(e) => setFormData({ ...formData, sizes: e.target.value })} placeholder="20-30, 30-40, 40-50" required /></div>
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
        {products.map((p) => (
          <Card key={p.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-navy">{p.name}</CardTitle>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(p)} className="h-8 w-8"><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id)} className="h-8 w-8 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-2">{p.description}</p>
              <p className="text-xs text-gray-500">Season: {p.season}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {p.sizes.map((size) => (
                  <span key={size} className="text-xs bg-ocean-blue/10 text-ocean-blue px-2 py-1 rounded-full">{size}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
