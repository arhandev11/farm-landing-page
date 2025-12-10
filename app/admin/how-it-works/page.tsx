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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface HowItWorksStep {
  id: number;
  type: string;
  step: number;
  icon: string;
  title: string;
  description: string;
  order: number;
}

const availableIcons = ["ClipboardList", "CheckCircle", "Search", "Handshake", "Package", "ListChecks", "ShoppingCart", "Truck"];

export default function HowItWorksPage() {
  const [steps, setSteps] = useState<HowItWorksStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingStep, setEditingStep] = useState<HowItWorksStep | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("petambak");
  const [formData, setFormData] = useState({ type: "petambak", step: 1, icon: "ClipboardList", title: "", description: "", order: 0 });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchSteps();
  }, []);

  const fetchSteps = async () => {
    try {
      const res = await fetch("/api/admin/how-it-works");
      const data = await res.json();
      setSteps(data);
    } catch (error) {
      console.error("Error fetching steps:", error);
      setMessage({ type: "error", text: "Failed to load steps" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const method = editingStep ? "PUT" : "POST";
      const body = editingStep ? { ...formData, id: editingStep.id } : formData;

      const res = await fetch("/api/admin/how-it-works", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage({ type: "success", text: `Step ${editingStep ? "updated" : "created"} successfully!` });
        fetchSteps();
        setIsDialogOpen(false);
        resetForm();
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      console.error("Error saving step:", error);
      setMessage({ type: "error", text: "Failed to save step" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this step?")) return;

    try {
      const res = await fetch(`/api/admin/how-it-works?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Step deleted successfully!" });
        fetchSteps();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting step:", error);
      setMessage({ type: "error", text: "Failed to delete step" });
    }
  };

  const openEditDialog = (step: HowItWorksStep) => {
    setEditingStep(step);
    setFormData({ type: step.type, step: step.step, icon: step.icon, title: step.title, description: step.description, order: step.order });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingStep(null);
    const currentSteps = steps.filter(s => s.type === activeTab);
    setFormData({ type: activeTab, step: currentSteps.length + 1, icon: "ClipboardList", title: "", description: "", order: currentSteps.length });
  };

  const filteredSteps = steps.filter(s => s.type === activeTab);

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
          <h1 className="text-3xl font-bold text-navy">How It Works</h1>
          <p className="text-gray-600 mt-1">Manage workflow steps for Petambak and Pembeli</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-ocean-blue hover:bg-ocean-blue/90">
              <Plus className="w-4 h-4 mr-2" /> Add Step
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingStep ? "Edit Step" : "Add New Step"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-navy">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white text-sm"
                  >
                    <option value="petambak">Petambak</option>
                    <option value="pembeli">Pembeli</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-navy">Step Number</label>
                  <Input
                    type="number"
                    value={formData.step}
                    onChange={(e) => setFormData({ ...formData, step: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>
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
                  placeholder="Step title"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-navy">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Step description..."
                  rows={3}
                  required
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="petambak">Petambak</TabsTrigger>
          <TabsTrigger value="pembeli">Pembeli</TabsTrigger>
        </TabsList>
        <TabsContent value="petambak">
          <StepsList steps={filteredSteps} onEdit={openEditDialog} onDelete={handleDelete} />
        </TabsContent>
        <TabsContent value="pembeli">
          <StepsList steps={filteredSteps} onEdit={openEditDialog} onDelete={handleDelete} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StepsList({ steps, onEdit, onDelete }: { steps: HowItWorksStep[], onEdit: (s: HowItWorksStep) => void, onDelete: (id: number) => void }) {
  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <Card key={step.id} className="group hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-ocean-blue/10 rounded-xl flex items-center justify-center font-bold text-ocean-blue text-lg">
                  {step.step}
                </div>
                <div>
                  <CardTitle className="text-lg text-navy">{step.title}</CardTitle>
                  <p className="text-xs text-gray-400">Icon: {step.icon}</p>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="ghost" onClick={() => onEdit(step)} className="h-8 w-8">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => onDelete(step.id)} className="h-8 w-8 text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
