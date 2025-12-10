"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";

interface SiteConfig {
  id: number;
  name: string;
  tagline: string;
  description: string;
  email: string;
  whatsapp: string;
  address: string;
  instagram: string | null;
  facebook: string | null;
}

export default function SiteConfigPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/admin/site-config");
      const data = await res.json();
      setConfig(data);
    } catch (error) {
      console.error("Error fetching config:", error);
      setMessage({ type: "error", text: "Failed to load configuration" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Configuration saved successfully!" });
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      console.error("Error saving config:", error);
      setMessage({ type: "error", text: "Failed to save configuration" });
    } finally {
      setSaving(false);
    }
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">Site Configuration</h1>
        <p className="text-gray-600 mt-1">
          Manage your website&apos;s basic information
        </p>
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

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-navy">Site Name</label>
                <Input
                  value={config?.name || ""}
                  onChange={(e) => setConfig({ ...config!, name: e.target.value })}
                  placeholder="Teras Farm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-navy">Email</label>
                <Input
                  type="email"
                  value={config?.email || ""}
                  onChange={(e) => setConfig({ ...config!, email: e.target.value })}
                  placeholder="info@terasfarm.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-navy">Tagline</label>
              <Input
                value={config?.tagline || ""}
                onChange={(e) => setConfig({ ...config!, tagline: e.target.value })}
                placeholder="Your site tagline"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-navy">Description</label>
              <Textarea
                value={config?.description || ""}
                onChange={(e) => setConfig({ ...config!, description: e.target.value })}
                placeholder="Site description..."
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-navy">WhatsApp Number</label>
                <Input
                  value={config?.whatsapp || ""}
                  onChange={(e) => setConfig({ ...config!, whatsapp: e.target.value })}
                  placeholder="6281234567890"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-navy">Address</label>
                <Input
                  value={config?.address || ""}
                  onChange={(e) => setConfig({ ...config!, address: e.target.value })}
                  placeholder="Jakarta, Indonesia"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-navy">Instagram URL</label>
                <Input
                  value={config?.instagram || ""}
                  onChange={(e) => setConfig({ ...config!, instagram: e.target.value })}
                  placeholder="https://instagram.com/terasfarm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-navy">Facebook URL</label>
                <Input
                  value={config?.facebook || ""}
                  onChange={(e) => setConfig({ ...config!, facebook: e.target.value })}
                  placeholder="https://facebook.com/terasfarm"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={saving}
                className="bg-ocean-blue hover:bg-ocean-blue/90"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
