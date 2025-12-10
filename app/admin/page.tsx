"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BookOpen,
    FileText,
    HelpCircle,
    Package,
    Quote,
    Star,
    Target,
    Users,
    Workflow,
} from "lucide-react";
import Link from "next/link";

const sections = [
  {
    name: "Site Config",
    description: "Manage site name, contact info, and social links",
    href: "/admin/site-config",
    icon: Target,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Hero Stats",
    description: "Edit hero section statistics",
    href: "/admin/hero-stats",
    icon: Target,
    color: "from-green-500 to-green-600",
  },
  {
    name: "Core Values",
    description: "Manage about section values",
    href: "/admin/core-values",
    icon: Star,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    name: "How It Works",
    description: "Edit workflow steps for petambak and pembeli",
    href: "/admin/how-it-works",
    icon: Workflow,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Features",
    description: "Manage Why Choose Us features",
    href: "/admin/features",
    icon: Package,
    color: "from-pink-500 to-pink-600",
  },
  {
    name: "Products",
    description: "Manage shrimp products catalog",
    href: "/admin/products",
    icon: FileText,
    color: "from-red-500 to-red-600",
  },
  {
    name: "Testimonials",
    description: "Manage partner testimonials",
    href: "/admin/testimonials",
    icon: Quote,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    name: "Community",
    description: "Manage community programs",
    href: "/admin/community",
    icon: Users,
    color: "from-teal-500 to-teal-600",
  },
  {
    name: "Blog",
    description: "Manage blog articles and news",
    href: "/admin/blog",
    icon: BookOpen,
    color: "from-orange-500 to-orange-600",
  },
  {
    name: "FAQ",
    description: "Manage frequently asked questions",
    href: "/admin/faq",
    icon: HelpCircle,
    color: "from-cyan-500 to-cyan-600",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Manage your website content from here
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-gray-100 group">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-navy group-hover:text-ocean-blue transition-colors">
                      {section.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{section.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
