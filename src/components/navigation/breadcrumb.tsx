"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function Breadcrumb() {
  const pathname = usePathname();

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Home", href: "/", icon: Home },
    ];

    let currentPath = "";
    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Skip certain segments that don't need breadcrumbs
      if (!["api", "auth"].includes(segment)) {
        breadcrumbs.push({
          label,
          href: currentPath,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumb on home page
  if (pathname === "/") return null;

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 py-3">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <motion.ol
          className="flex items-center space-x-2 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const IconComponent = item.icon;

            return (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-slate-400 mx-2" />
                )}

                {isLast ? (
                  <span className="flex items-center text-slate-600 font-medium">
                    {IconComponent && (
                      <IconComponent className="w-4 h-4 mr-1" />
                    )}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center text-blue-600 hover:text-blue-700 hover:scale-105 transition-all duration-200"
                  >
                    {IconComponent && (
                      <IconComponent className="w-4 h-4 mr-1" />
                    )}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </motion.ol>
      </div>
    </nav>
  );
}
