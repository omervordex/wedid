"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import NotificationDropdown from "./notification-dropdown";
import {
  Menu,
  X,
  User,
  ShoppingCart,
  LogOut,
  Bell,
  ChevronDown,
  Home,
  Stethoscope,
  FileText,
  Store,
  Users,
  Phone,
  Dna,
} from "lucide-react";

const publicNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/how-it-works", label: "How It Works", icon: FileText },
  { href: "/dna", label: "DNA Analysis", icon: Dna },
  { href: "/about", label: "About Us", icon: Users },
  { href: "/team", label: "Our Team", icon: Users },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/shop", label: "Shop", icon: Store },
  { href: "/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/contact", label: "Contact Us", icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        showNotifications &&
        !target.closest("[data-notification-dropdown]")
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showNotifications]);

  const getDashboardLink = () => {
    if (!user) return "/auth/login";

    switch (user.role) {
      case "patient":
        return "/patient/dashboard";
      case "doctor":
        return "/doctor/dashboard";
      case "lab":
        return "/lab/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/auth/login";
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/98 backdrop-blur-lg shadow-xl border-b border-gray-200/60"
          : "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100/40"
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Clean Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 sm:space-x-4 group"
          >
            <div className="relative">
              <Image
                src="/logo.avif"
                alt="Online Clinic Logo"
                width={40}
                height={40}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                Online Clinic
              </span>
              <p className="text-sm text-blue-600 font-medium">
                Digital Health Platform
              </p>
            </div>
            <div className="sm:hidden">
              <span className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Online Clinic
              </span>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {publicNavItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative hover:scale-105 ${
                    pathname === item.href
                      ? "text-blue-600 font-bold bg-blue-50"
                      : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/50"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Clean User Actions */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            {user ? (
              <div className="flex items-center space-x-2">
                {/* Notifications */}
                <div className="relative" data-notification-dropdown>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="hover:scale-110 transition-transform relative touch-manipulation"
                  >
                    <Bell className="w-4 h-4 text-blue-600" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>
                  <NotificationDropdown
                    isOpen={showNotifications}
                    onClose={() => setShowNotifications(false)}
                  />
                </div>

                {/* Shopping Cart */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:scale-110 transition-transform relative"
                  asChild
                >
                  <Link href="/shop">
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                      2
                    </span>
                  </Link>
                </Button>

                {/* User Menu */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:scale-105 transition-transform flex items-center space-x-2"
                    asChild
                  >
                    <Link href={getDashboardLink()}>
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="hidden xl:inline">Dashboard</span>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </Link>
                  </Button>
                </div>

                {/* Logout */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:scale-105 transition-transform text-red-500 hover:text-red-600"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 xl:space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:scale-105 transition-transform text-slate-700 hover:text-blue-600"
                  asChild
                >
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button
                  size="sm"
                  className="hover:scale-105 transition-transform bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                  asChild
                >
                  <Link href="/auth/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Clean Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/98 backdrop-blur-lg border-b border-gray-200/60 shadow-xl"
          >
            <div className="px-4 py-6 space-y-4">
              {publicNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 text-base font-medium transition-all duration-300 hover:scale-105 ${
                      pathname === item.href
                        ? "text-blue-600 font-bold bg-blue-50 rounded-lg px-3 py-2"
                        : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg px-3 py-2"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-gray-200 space-y-3">
                {user ? (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:scale-105 transition-transform touch-manipulation py-3"
                      onClick={() => setShowNotifications(!showNotifications)}
                    >
                      <Bell className="w-4 h-4 mr-3 text-blue-600" />
                      <span className="flex-1 text-left">Notifications</span>
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        3
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:scale-105 transition-transform"
                      asChild
                    >
                      <Link href={getDashboardLink()}>
                        <User className="w-4 h-4 mr-3 text-blue-600" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:scale-105 transition-transform"
                      onClick={() => signOut()}
                    >
                      <LogOut className="w-4 h-4 mr-3 text-red-500" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full hover:scale-105 transition-transform text-slate-700 hover:text-blue-600"
                      asChild
                    >
                      <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button
                      className="w-full hover:scale-105 transition-transform bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                      asChild
                    >
                      <Link href="/auth/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Notification Dropdown */}
      <NotificationDropdown
        isOpen={showNotifications && isOpen}
        onClose={() => setShowNotifications(false)}
      />
    </nav>
  );
}
