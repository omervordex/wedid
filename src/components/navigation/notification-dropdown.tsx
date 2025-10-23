"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  Calendar,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "appointment" | "message" | "alert" | "success";
  time: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Appointment",
    message: "You have an appointment with Dr. John Smith tomorrow at 2:00 PM",
    type: "appointment",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    title: "Test Results",
    message: "Your genetic test results are ready. Please check them.",
    type: "success",
    time: "5 hours ago",
    isRead: false,
  },
  {
    id: "3",
    title: "Message",
    message: "Dr. Sarah Johnson sent you a new message",
    type: "message",
    time: "1 day ago",
    isRead: false,
  },
  {
    id: "4",
    title: "Reminder",
    message: "It's time for your medication tomorrow",
    type: "alert",
    time: "2 days ago",
    isRead: true,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "appointment":
      return Calendar;
    case "message":
      return MessageSquare;
    case "alert":
      return AlertCircle;
    case "success":
      return CheckCircle;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "appointment":
      return "text-blue-600 bg-blue-50";
    case "message":
      return "text-green-600 bg-green-50";
    case "alert":
      return "text-orange-600 bg-orange-50";
    case "success":
      return "text-emerald-600 bg-emerald-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDropdown({
  isOpen,
  onClose,
}: NotificationDropdownProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-[80vh] sm:max-h-96"
            style={{
              maxWidth: "min(400px, calc(100vw - 2rem))",
              right: "0",
              left: "auto",
            }}
            data-notification-dropdown
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:text-blue-700 px-2 py-1"
                  >
                    <span className="hidden sm:inline">Mark All Read</span>
                    <span className="sm:hidden">All</span>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-1 sm:p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 sm:p-6 text-center text-gray-500">
                  <Bell className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-gray-300" />
                  <p className="text-sm sm:text-base">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => {
                    const IconComponent = getNotificationIcon(
                      notification.type
                    );
                    const colorClasses = getNotificationColor(
                      notification.type
                    );

                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`notification-item p-3 sm:p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation relative ${
                          !notification.isRead ? "bg-blue-50/50" : "bg-white"
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <div
                            className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${colorClasses}`}
                          >
                            <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`text-xs sm:text-sm font-medium leading-tight ${
                                  !notification.isRead
                                    ? "text-gray-900"
                                    : "text-gray-700"
                                }`}
                              >
                                {notification.title}
                              </p>
                              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Clock className="w-3 h-3 mr-1 hidden sm:block" />
                                  <span className="text-xs">
                                    {notification.time}
                                  </span>
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="p-1 text-gray-400 hover:text-red-500 touch-manipulation"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="notification-text text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed break-words overflow-hidden">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                        {!notification.isRead && (
                          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-2 sm:p-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <Button
                  variant="ghost"
                  className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm sm:text-base py-2 sm:py-3 touch-manipulation"
                  onClick={onClose}
                >
                  <span className="hidden sm:inline">
                    View All Notifications
                  </span>
                  <span className="sm:hidden">View All</span>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
