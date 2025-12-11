"use client";

import { cn } from "@/lib/utils";
import {
    BookOpen,
    FileText,
    HelpCircle,
    Home,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    Package,
    Quote,
    Settings,
    Star,
    Target,
    Users,
    Workflow,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Site Config", href: "/admin/site-config", icon: Settings },
  { name: "Hero Stats", href: "/admin/hero-stats", icon: Target },
  { name: "Core Values", href: "/admin/core-values", icon: Star },
  { name: "How It Works", href: "/admin/how-it-works", icon: Workflow },
  { name: "Features", href: "/admin/features", icon: Package },
  { name: "Products", href: "/admin/products", icon: FileText },
  { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { name: "Community", href: "/admin/community", icon: Users },
  { name: "Blog", href: "/admin/blog", icon: BookOpen },
  { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-ocean-blue to-teal rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Teras Farm</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-white/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
