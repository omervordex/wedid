"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ThreeDayFoodFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThreeDayFoodForm({
  isOpen,
  onClose,
}: ThreeDayFoodFormProps) {
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    surname: "",

    // Day 1
    day1Breakfast: "",
    day1Snack1: "",
    day1Lunch: "",
    day1Snack2: "",
    day1Dinner: "",
    day1Night: "",

    // Day 2
    day2Breakfast: "",
    day2Snack1: "",
    day2Lunch: "",
    day2Snack2: "",
    day2Dinner: "",
    day2Night: "",

    // Day 3
    day3Breakfast: "",
    day3Snack1: "",
    day3Lunch: "",
    day3Snack2: "",
    day3Dinner: "",
    day3Night: "",

    // Agreements
    informationCorrect: false,
    orderFormApproved: false,
    dataProtectionApproved: false,
    nutrigeneticFormApproved: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-purple-600">
                  Three-Day Food Consumption Log
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Detailed dietary intake tracking for comprehensive nutritional
                  analysis
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Surname *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.surname}
                      onChange={(e) =>
                        handleInputChange("surname", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Day 1 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  Day 1
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Breakfast:
                    </label>
                    <textarea
                      value={formData.day1Breakfast}
                      onChange={(e) =>
                        handleInputChange("day1Breakfast", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for breakfast? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Snack:
                    </label>
                    <textarea
                      value={formData.day1Snack1}
                      onChange={(e) =>
                        handleInputChange("day1Snack1", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for your first snack? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lunch:
                    </label>
                    <textarea
                      value={formData.day1Lunch}
                      onChange={(e) =>
                        handleInputChange("day1Lunch", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for lunch? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Snack:
                    </label>
                    <textarea
                      value={formData.day1Snack2}
                      onChange={(e) =>
                        handleInputChange("day1Snack2", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for your second snack? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dinner:
                    </label>
                    <textarea
                      value={formData.day1Dinner}
                      onChange={(e) =>
                        handleInputChange("day1Dinner", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for dinner? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Night:
                    </label>
                    <textarea
                      value={formData.day1Night}
                      onChange={(e) =>
                        handleInputChange("day1Night", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat at night? Include quantities and times..."
                    />
                  </div>
                </div>
              </div>

              {/* Day 2 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  Day 2
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Breakfast:
                    </label>
                    <textarea
                      value={formData.day2Breakfast}
                      onChange={(e) =>
                        handleInputChange("day2Breakfast", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for breakfast? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Snack:
                    </label>
                    <textarea
                      value={formData.day2Snack1}
                      onChange={(e) =>
                        handleInputChange("day2Snack1", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for your first snack? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lunch:
                    </label>
                    <textarea
                      value={formData.day2Lunch}
                      onChange={(e) =>
                        handleInputChange("day2Lunch", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for lunch? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Snack:
                    </label>
                    <textarea
                      value={formData.day2Snack2}
                      onChange={(e) =>
                        handleInputChange("day2Snack2", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for your second snack? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dinner:
                    </label>
                    <textarea
                      value={formData.day2Dinner}
                      onChange={(e) =>
                        handleInputChange("day2Dinner", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for dinner? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Night:
                    </label>
                    <textarea
                      value={formData.day2Night}
                      onChange={(e) =>
                        handleInputChange("day2Night", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat at night? Include quantities and times..."
                    />
                  </div>
                </div>
              </div>

              {/* Day 3 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  Day 3
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Breakfast:
                    </label>
                    <textarea
                      value={formData.day3Breakfast}
                      onChange={(e) =>
                        handleInputChange("day3Breakfast", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for breakfast? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Snack:
                    </label>
                    <textarea
                      value={formData.day3Snack1}
                      onChange={(e) =>
                        handleInputChange("day3Snack1", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for your first snack? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lunch:
                    </label>
                    <textarea
                      value={formData.day3Lunch}
                      onChange={(e) =>
                        handleInputChange("day3Lunch", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for lunch? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Snack:
                    </label>
                    <textarea
                      value={formData.day3Snack2}
                      onChange={(e) =>
                        handleInputChange("day3Snack2", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for your second snack? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dinner:
                    </label>
                    <textarea
                      value={formData.day3Dinner}
                      onChange={(e) =>
                        handleInputChange("day3Dinner", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat for dinner? Include quantities and times..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Night:
                    </label>
                    <textarea
                      value={formData.day3Night}
                      onChange={(e) =>
                        handleInputChange("day3Night", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="What did you eat at night? Include quantities and times..."
                    />
                  </div>
                </div>
              </div>

              {/* Agreements */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  Agreements and Consent
                </h3>
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      checked={formData.informationCorrect}
                      onChange={(e) =>
                        handleInputChange(
                          "informationCorrect",
                          e.target.checked
                        )
                      }
                      className="mr-3 mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      I hereby certify that the information I have provided
                      above is correct. I agree to share the above information
                      with Epigenetic Coaching (MRL Medical Tourism Marketing
                      and Consulting LTD) with my own consent. While sharing
                      this information, I have read and approved the terms and
                      conditions of MRL Medical Tourism Marketing and Consulting
                      LTD.
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      checked={formData.orderFormApproved}
                      onChange={(e) =>
                        handleInputChange("orderFormApproved", e.target.checked)
                      }
                      className="mr-3 mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      I have read and approved the order form.
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      checked={formData.dataProtectionApproved}
                      onChange={(e) =>
                        handleInputChange(
                          "dataProtectionApproved",
                          e.target.checked
                        )
                      }
                      className="mr-3 mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      I have read and approved the Data Protection Policy.
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      checked={formData.nutrigeneticFormApproved}
                      onChange={(e) =>
                        handleInputChange(
                          "nutrigeneticFormApproved",
                          e.target.checked
                        )
                      }
                      className="mr-3 mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      I have read and approved the Nutrigenetic and Epigenetic
                      Consulting Form.
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Submit Form
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
