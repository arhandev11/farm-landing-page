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

interface CoreValue {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
}

const availableIcons = ["Eye", "Scale", "Users", "Leaf", "Heart", "Shield", "Star", "Target"];

export default function CoreValuesPage() {
  const [values, setValues] = useState<CoreValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingValue, setEditingValue] = useState<CoreValue | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ icon: "Eye", title: "", description: "", order: 0 });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = async () => {
    try {
      const res = await fetch("/api/admin/core-values");
      const data = await res.json();
      setValues(data);
    } catch (error) {
      console.error("Error fetching values:", error);
      setMessage({ type: "error", text: "Failed to load values" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const method = editingValue ? "PUT" : "POST";
      const body = editingValue ? { ...formData, id: editingValue.id } : formData;

      const res = await fetch("/api/admin/core-values", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage({ type: "success", text: `Value ${editingValue ? "updated" : "created"} successfully!` });
        fetchValues();
        setIsDialogOpen(false);
        resetForm();
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      console.error("Error saving value:", error);
      setMessage({ type: "error", text: "Failed to save value" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this value?")) return;

    try {
      const res = await fetch(`/api/admin/core-values?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Value deleted successfully!" });
        fetchValues();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting value:", error);
      setMessage({ type: "error", text: "Failed to delete value" });
    }
  };

  const openEditDialog = (value: CoreValue) => {
    setEditingValue(value);
    setFormData({ icon: value.icon, title: value.title, description: value.description, order: value.order });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingValue(null);
    setFormData({ icon: "Eye", title: "", description: "", order: values.length });
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
          <h1 className="text-3xl font-bold text-navy">Core Values</h1>
          <p className="text-gray-600 mt-1">Manage values shown in the About section</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-ocean-blue hover:bg-ocean-blue/90">
              <Plus className="w-4 h-4 mr-2" /> Add Value
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingValue ? "Edit Value" : "Add New Value"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-navy">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white text-sm"
                >
                  {availableIcons.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-navy">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Transparansi"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-navy">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description..."
                  rows={3}
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
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={saving} className="bg-ocean-blue hover:bg-ocean-blue/90">
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {values.map((value) => (
          <Card key={value.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-ocean-blue/10 to-teal/10 rounded-xl flex items-center justify-center text-ocean-blue font-bold">
                    {value.icon.charAt(0)}
                  </div>
                  <CardTitle className="text-lg text-navy">{value.title}</CardTitle>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" onClick={() => openEditDialog(value)} className="h-8 w-8">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(value.id)} className="h-8 w-8 text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">{value.description}</p>
              <p className="text-xs text-gray-400 mt-2">Icon: {value.icon} | Order: {value.order}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
