"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GastrointestinalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GastrointestinalForm({
  isOpen,
  onClose,
}: GastrointestinalFormProps) {
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    surname: "",

    // Stool Questions
    stoolShape: "",
    gasProblems: "",
    gasTimeOfDay: "",
    gasSmellIntense: "",
    badBreath: "",
    bloatingAfterMeals: "",
    fullnessNausea: "",
    fullnessTiming: "",
    teethGrinding: "",
    undigestedFood: "",
    fullnessNausea2: "",
    fullnessTiming2: "",
    ironDeficiency: "",
    parasiticInfections: "",
    rectalNoseItching: "",
    enemaColonCleansing: "",
    specialDiet: "",

    // Food Intolerance - Raw/Cooked
    foodIntoleranceRaw: [] as string[],

    // Food Intolerance - Other
    foodIntoleranceOther: [] as string[],

    // Additional Questions
    foodsCantStand: "",
    mealsPerDay: "",
    skippingMealEffect: "",
    eatingHabits: [] as string[],

    // Daily Food Log
    weekdayBreakfast: "",
    weekdayLunch: "",
    weekdayEvening: "",
    weekdaySnack: "",
    weekdayDrinks: "",
    weekendBreakfast: "",
    weekendLunch: "",
    weekendEvening: "",
    weekendSnack: "",
    weekendDrinks: "",

    // Weekly Consumption
    fruitWeekly: "",
    vegetablesWeekly: "",
    legumesWeekly: "",
    milkWeekly: "",
    sodaWeekly: "",
    dessertsWeekly: "",
    meatWeekly: "",
    nutsWeekly: "",
    fishWeekly: "",
    oilsWeekly: "",
    sweetenersWeekly: "",

    // Bowel Movement
    bowelMovementFrequency: "",

    // Agreements
    informationCorrect: false,
    orderFormApproved: false,
    dataProtectionApproved: false,
    nutrigeneticFormApproved: false,
  });

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (
    field: keyof typeof formData,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!");
    onClose();
  };

  const rawFoods = [
    "Brussels sprouts",
    "Coconut",
    "Pear",
    "Garlic",
    "Cabbage",
    "Apple",
    "Peach",
    "Onion",
    "Broccoli",
    "Watermelon",
    "Nectarine",
    "Avocado",
    "Cauliflower",
    "Apricot",
    "Dried fruits",
    "raw vegetables",
    "Cooked Legumes",
  ];

  const otherFoods = [
    "Red meat",
    "Yogurt",
    "Wine",
    "Tomatoes",
    "Salami/Sausage/Sausage",
    "Ayran",
    "Beer",
    "Spinach",
    "Fish",
    "Cheese",
    "Pickle",
    "Banana",
    "Kefir",
    "Vinegar",
    "Aubergine",
    "Strawberry",
    "Orange",
    "Lemon",
    "Citrus",
  ];

  const eatingHabits = [
    "I eat fast",
    "I eat too much",
    "I eat late at night",
    "I don&apos;t like healthy food",
    "I do not eat healthy food prepared at home",
    "My snack place",
    "There are those who do not like healthy food in the family",
    "I travel often",
    "I skip meals",
    "I eat a lot when I&apos;m stressed",
    "I like to eat",
    "I drink water between meals",
    "I eat out of necessity",
    "I&apos;m not good with food",
    "I eat less when I&apos;m stressed",
    "I don&apos;t mind cooking",
    "I eat out more than half of my meals",
  ];

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
          className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Gastrointestinal System Assessment Form
                  </h2>
                  <p className="text-purple-100 mt-1">
                    Comprehensive digestive health evaluation for personalized
                    nutrition recommendations
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-purple-200 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100">
                <h3 className="text-lg font-semibold mb-4 text-purple-700 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Stool Questions */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-lg font-semibold mb-4 text-blue-700 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Stool and Digestive Health Questions
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What is the shape of your stool? *
                    </label>
                    <select
                      required
                      value={formData.stoolShape}
                      onChange={(e) =>
                        handleInputChange("stoolShape", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    >
                      <option value="">Select an option</option>
                      <option value="floats">Usually floats on water</option>
                      <option value="thin">Thin and long</option>
                      <option value="diarrhea">Diarrhea</option>
                      <option value="hard-pieces">
                        In small and hard pieces
                      </option>
                      <option value="loose">
                        Loose but not like full diarrhea
                      </option>
                      <option value="solid">Solid, I can strain</option>
                      <option value="soft-tight">
                        Soft and tight structure
                      </option>
                      <option value="ranges">
                        It ranges from solid to loose
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you often experience gas problems during the day? *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gasProblems"
                          value="yes"
                          checked={formData.gasProblems === "yes"}
                          onChange={(e) =>
                            handleInputChange("gasProblems", e.target.value)
                          }
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gasProblems"
                          value="no"
                          checked={formData.gasProblems === "no"}
                          onChange={(e) =>
                            handleInputChange("gasProblems", e.target.value)
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  {formData.gasProblems === "yes" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        At what time of day do you experience gas problems more
                        often?
                      </label>
                      <select
                        value={formData.gasTimeOfDay}
                        onChange={(e) =>
                          handleInputChange("gasTimeOfDay", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      >
                        <option value="">Select an option</option>
                        <option value="morning">
                          Morning Hours (09:00-11:00)
                        </option>
                        <option value="lunch">Lunch Hours (12:00-14:00)</option>
                        <option value="evening">
                          Evening Hours (17:00-21:00)
                        </option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Is your gas smelling too intense? *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gasSmellIntense"
                          value="yes"
                          checked={formData.gasSmellIntense === "yes"}
                          onChange={(e) =>
                            handleInputChange("gasSmellIntense", e.target.value)
                          }
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gasSmellIntense"
                          value="no"
                          checked={formData.gasSmellIntense === "no"}
                          onChange={(e) =>
                            handleInputChange("gasSmellIntense", e.target.value)
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you experience bad breath? *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="badBreath"
                          value="yes"
                          checked={formData.badBreath === "yes"}
                          onChange={(e) =>
                            handleInputChange("badBreath", e.target.value)
                          }
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="badBreath"
                          value="no"
                          checked={formData.badBreath === "no"}
                          onChange={(e) =>
                            handleInputChange("badBreath", e.target.value)
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you experience bloating or burping right after meals? *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="bloatingAfterMeals"
                          value="yes"
                          checked={formData.bloatingAfterMeals === "yes"}
                          onChange={(e) =>
                            handleInputChange(
                              "bloatingAfterMeals",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="bloatingAfterMeals"
                          value="no"
                          checked={formData.bloatingAfterMeals === "no"}
                          onChange={(e) =>
                            handleInputChange(
                              "bloatingAfterMeals",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you have a feeling of fullness (swelling/full satiety)
                      or nausea after eating? *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="fullnessNausea"
                          value="yes"
                          checked={formData.fullnessNausea === "yes"}
                          onChange={(e) =>
                            handleInputChange("fullnessNausea", e.target.value)
                          }
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="fullnessNausea"
                          value="no"
                          checked={formData.fullnessNausea === "no"}
                          onChange={(e) =>
                            handleInputChange("fullnessNausea", e.target.value)
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  {formData.fullnessNausea === "yes" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        If your answer is YES, does it happen two to four hours
                        after a meal or just after?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="fullnessTiming"
                            value="after-2-4-hours"
                            checked={
                              formData.fullnessTiming === "after-2-4-hours"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "fullnessTiming",
                                e.target.value
                              )
                            }
                            className="mr-2"
                          />
                          After 2 to 4 hours
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="fullnessTiming"
                            value="shortly-after"
                            checked={
                              formData.fullnessTiming === "shortly-after"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "fullnessTiming",
                                e.target.value
                              )
                            }
                            className="mr-2"
                          />
                          Shortly after
                        </label>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you have a problem grinding your teeth at night? *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="teethGrinding"
                          value="yes"
                          checked={formData.teethGrinding === "yes"}
                          onChange={(e) =>
                            handleInputChange("teethGrinding", e.target.value)
                          }
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="teethGrinding"
                          value="no"
                          checked={formData.teethGrinding === "no"}
                          onChange={(e) =>
                            handleInputChange("teethGrinding", e.target.value)
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you have undigested food in your stool? What foods, if
                      any, do you see?
                    </label>
                    <textarea
                      value={formData.undigestedFood}
                      onChange={(e) =>
                        handleInputChange("undigestedFood", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      rows={3}
                      placeholder="Please describe any undigested foods you notice..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Have you ever been diagnosed with Iron deficiency or
                      vitamin B12 deficiency? *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="ironDeficiency"
                          value="yes"
                          checked={formData.ironDeficiency === "yes"}
                          onChange={(e) =>
                            handleInputChange("ironDeficiency", e.target.value)
                          }
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="ironDeficiency"
                          value="no"
                          checked={formData.ironDeficiency === "no"}
                          onChange={(e) =>
                            handleInputChange("ironDeficiency", e.target.value)
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you suffer from chronic intestinal infections, such as
                      parasitic infections? *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="parasiticInfections"
                          value="yes"
                          checked={formData.parasiticInfections === "yes"}
                          onChange={(e) =>
                            handleInputChange(
                              "parasiticInfections",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="parasiticInfections"
                          value="no"
                          checked={formData.parasiticInfections === "no"}
                          onChange={(e) =>
                            handleInputChange(
                              "parasiticInfections",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you often have itching in your rectum (last part of the
                      large intestine) and/or nose? *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="rectalNoseItching"
                          value="yes"
                          checked={formData.rectalNoseItching === "yes"}
                          onChange={(e) =>
                            handleInputChange(
                              "rectalNoseItching",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="rectalNoseItching"
                          value="no"
                          checked={formData.rectalNoseItching === "no"}
                          onChange={(e) =>
                            handleInputChange(
                              "rectalNoseItching",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Have you ever had an enema or colon cleansing, or have you
                      used any medication to make your stool? *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="enemaColonCleansing"
                          value="yes"
                          checked={formData.enemaColonCleansing === "yes"}
                          onChange={(e) =>
                            handleInputChange(
                              "enemaColonCleansing",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="enemaColonCleansing"
                          value="no"
                          checked={formData.enemaColonCleansing === "no"}
                          onChange={(e) =>
                            handleInputChange(
                              "enemaColonCleansing",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you follow any of the special diets or nutrition
                      programs such as a vegetarian or ketogenic diet?
                    </label>
                    <textarea
                      value={formData.specialDiet}
                      onChange={(e) =>
                        handleInputChange("specialDiet", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      rows={3}
                      placeholder="Please describe any special diets you follow..."
                    />
                  </div>
                </div>
              </div>

              {/* Food Intolerance - Raw/Cooked */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  Food Intolerance - Raw/Cooked Foods
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  You have one or more of the following foods, cooked or raw;
                  Does it create an undesirable condition such as gas,
                  heartburn, diarrhea, constipation, pain, drowsiness, weakness,
                  dizziness, skin, runny nose?
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {rawFoods.map((food) => (
                    <label key={food} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={formData.foodIntoleranceRaw.includes(food)}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "foodIntoleranceRaw",
                            food,
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      {food}
                    </label>
                  ))}
                </div>
              </div>

              {/* Food Intolerance - Other */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  Food Intolerance - Other Foods
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  You have one or more of the following foods; Does it create an
                  undesirable condition such as gas, heartburn, pain, diarrhea,
                  constipation, drowsiness, weakness, dizziness, skin, runny
                  nose?
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {otherFoods.map((food) => (
                    <label key={food} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={formData.foodIntoleranceOther.includes(food)}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "foodIntoleranceOther",
                            food,
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      {food}
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Questions */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  Additional Questions
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Are there any foods that you can&apos;t stand and consume
                      too much? If so, what?
                    </label>
                    <textarea
                      value={formData.foodsCantStand}
                      onChange={(e) =>
                        handleInputChange("foodsCantStand", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      rows={3}
                      placeholder="Please describe any foods you can't stand..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How many meals do you eat per day? *
                    </label>
                    <select
                      required
                      value={formData.mealsPerDay}
                      onChange={(e) =>
                        handleInputChange("mealsPerDay", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    >
                      <option value="">Select an option</option>
                      <option value="1">1 time</option>
                      <option value="2">2 times</option>
                      <option value="3">3 times</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Does skipping a meal greatly affect you? *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="skippingMealEffect"
                          value="yes"
                          checked={formData.skippingMealEffect === "yes"}
                          onChange={(e) =>
                            handleInputChange(
                              "skippingMealEffect",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="skippingMealEffect"
                          value="no"
                          checked={formData.skippingMealEffect === "no"}
                          onChange={(e) =>
                            handleInputChange(
                              "skippingMealEffect",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tick the ones that fit your eating habits:
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {eatingHabits.map((habit) => (
                        <label
                          key={habit}
                          className="flex items-center text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={formData.eatingHabits.includes(habit)}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "eatingHabits",
                                habit,
                                e.target.checked
                              )
                            }
                            className="mr-2"
                          />
                          {habit}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Food Log */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  Daily Food Log
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium mb-3 text-gray-700">
                      Weekday Meals
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Breakfast:
                        </label>
                        <textarea
                          value={formData.weekdayBreakfast}
                          onChange={(e) =>
                            handleInputChange(
                              "weekdayBreakfast",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lunch:
                        </label>
                        <textarea
                          value={formData.weekdayLunch}
                          onChange={(e) =>
                            handleInputChange("weekdayLunch", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Evening meal:
                        </label>
                        <textarea
                          value={formData.weekdayEvening}
                          onChange={(e) =>
                            handleInputChange("weekdayEvening", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Snack:
                        </label>
                        <textarea
                          value={formData.weekdaySnack}
                          onChange={(e) =>
                            handleInputChange("weekdaySnack", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          rows={2}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Drinks:
                        </label>
                        <textarea
                          value={formData.weekdayDrinks}
                          onChange={(e) =>
                            handleInputChange("weekdayDrinks", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium mb-3 text-gray-700">
                      Weekend Meals
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Breakfast:
                        </label>
                        <textarea
                          value={formData.weekendBreakfast}
                          onChange={(e) =>
                            handleInputChange(
                              "weekendBreakfast",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lunch:
                        </label>
                        <textarea
                          value={formData.weekendLunch}
                          onChange={(e) =>
                            handleInputChange("weekendLunch", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Evening meal:
                        </label>
                        <textarea
                          value={formData.weekendEvening}
                          onChange={(e) =>
                            handleInputChange("weekendEvening", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Snack:
                        </label>
                        <textarea
                          value={formData.weekendSnack}
                          onChange={(e) =>
                            handleInputChange("weekendSnack", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          rows={2}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Drinks:
                        </label>
                        <textarea
                          value={formData.weekendDrinks}
                          onChange={(e) =>
                            handleInputChange("weekendDrinks", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Consumption */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  Weekly Food Consumption
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  How many times do you consume the foods listed below in a
                  week?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "fruitWeekly", label: "Fruit (not squeezed)" },
                    {
                      key: "vegetablesWeekly",
                      label: "Vegetables (Except White Potatoes)",
                    },
                    {
                      key: "legumesWeekly",
                      label: "Legumes (beans, peas, etc.)",
                    },
                    { key: "milkWeekly", label: "Milk/types" },
                    { key: "sodaWeekly", label: "Soda (normal or diet)" },
                    {
                      key: "dessertsWeekly",
                      label: "Desserts (Candy, cookies, cake, ice cream, etc.)",
                    },
                    { key: "meatWeekly", label: "Meat" },
                    { key: "nutsWeekly", label: "Nuts" },
                    { key: "fishWeekly", label: "Fish" },
                    { key: "oilsWeekly", label: "Oils" },
                    { key: "sweetenersWeekly", label: "Sweeteners" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}:
                      </label>
                      <input
                        type="text"
                        value={formData[key as keyof typeof formData] as string}
                        onChange={(e) =>
                          handleInputChange(
                            key as keyof typeof formData,
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        placeholder="e.g., 3 times per week"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bowel Movement */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  Bowel Movement
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How often do you go to the defecate? *
                  </label>
                  <select
                    required
                    value={formData.bowelMovementFrequency}
                    onChange={(e) =>
                      handleInputChange(
                        "bowelMovementFrequency",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select an option</option>
                    <option value="daily-1">Daily 1</option>
                    <option value="daily-2">Daily 2</option>
                    <option value="weekly-2">Weekly 2</option>
                    <option value="weekly-3">Weekly 3</option>
                  </select>
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
              <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
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
