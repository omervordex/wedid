"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PharmacogeneticFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PharmacogeneticForm({
  isOpen,
  onClose,
}: PharmacogeneticFormProps) {
  const [formData, setFormData] = useState({
    // Physician Information
    physicianName: "",
    sampleCollectionDate: "",
    orderingPhysicianName: "",

    // Patient Information
    patientName: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    address: "",
    phoneNumber: "",
    email: "",
    ethnicOrigin: "",
    gender: "",

    // Female-specific information
    menopause: "",
    currentPregnancy: "",
    currentBreastFeeding: "",
    currentContraceptiveTreatment: "",

    // Clinical Features
    reportedClinicalFeatures: "",

    // Medications
    medication: "",
    herbalMedicines: "",
    vitaminsSupplements: "",
    hormoneReplacementTherapy: "",

    // Allergies and ADRs
    allergies: "",
    adverseDrugReactions: "",

    // Lifestyle Elements
    cigaretteSmoking: "",
    passiveSmoker: "",
    smoker: "",
    consumptionOfAlcohol: "",
    alcoholSometimes: [] as string[],
    alcoholRegularly: [] as string[],
    frequencyOfAlcoholConsumption: "",
    consumptionOfCaffeinatedBeverages: "",
    caffeineSometimes: [] as string[],
    caffeineRegularly: [] as string[],
    caffeineConsumptionFrequency: "",
    grapefruitJuiceConsumption: "",
    grapefruitFrequency: "",

    // Medical History
    weightLossOrGain: "",
    highBloodPressure: "",
    severeHypoglycemia: "",
    cholesterolTriglycerides: "",
    diabetes: "",
    myocardialInfarction: "",
    heartFailure: "",
    thrombosisProblem: "",
    peripheralVascularDisease: "",
    kidneyDisease: "",
    liverDisease: "",
    gastrointestinalDiseases: "",
    cancer: "",
    cancerType: "",
    otherChronicIllness: "",

    // Female-specific medical conditions
    endometriosis: "",
    osteoporosis: "",

    // Inherited Genetic Variability
    medicationLittleEffect: "",
    familyMedicationLittleEffect: "",
    experiencedSideEffects: "",
    familyExperiencedSideEffects: "",
    intolerantInsensitive: "",
    familyIntolerantInsensitive: "",
    familyHospitalizedMedication: "",
    familyHospitalSideEffects: "",

    // Agreements
    informationCorrect: false,
    orderFormApproved: false,
    dataProtectionApproved: false,
    nutrigeneticFormApproved: false,
  });

  const handleInputChange = (
    field: string,
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

  const ethnicOrigins = [
    "Caucasian",
    "African American",
    "African",
    "Asian",
    "Hispanic",
    "Middle Eastern",
    "Other",
  ];

  const alcoholOptions = ["Wine", "Beer", "Other"];
  const caffeineOptions = ["Coffee", "Tea", "Cola", "Other"];

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
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-t-2xl">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Pharmacogenetic (PGx) Test Information Form
                  </h2>
                  <p className="text-blue-100 mt-1">
                    Comprehensive genetic testing questionnaire for personalized
                    medication optimization
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-blue-200 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-8">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                This information form will help the PGx test results to be
                interpreted accurately and precisely, within the framework of
                the current and past health status of the individual who will
                have the PGx test.
              </p>
              <p className="text-sm text-blue-800 font-semibold mt-2">
                Please fill out this form COMPLETELY in legible and capital
                letters
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Physician Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  Physician Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Physician Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.physicianName}
                      onChange={(e) =>
                        handleInputChange("physicianName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sample collection date: *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.sampleCollectionDate}
                      onChange={(e) =>
                        handleInputChange(
                          "sampleCollectionDate",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ordering Physician Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.orderingPhysicianName}
                      onChange={(e) =>
                        handleInputChange(
                          "orderingPhysicianName",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Patient Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  PATIENT INFORMATION - PERSONAL DATA
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Name (Last, First, MI) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.patientName}
                      onChange={(e) =>
                        handleInputChange("patientName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth (mm/dd/yy): *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.height}
                      onChange={(e) =>
                        handleInputChange("height", e.target.value)
                      }
                      placeholder="e.g., 5'8&quot; or 173 cm"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.weight}
                      onChange={(e) =>
                        handleInputChange("weight", e.target.value)
                      }
                      placeholder="e.g., 70 kg or 154 lbs"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ethnic Origin *
                    </label>
                    <select
                      required
                      value={formData.ethnicOrigin}
                      onChange={(e) =>
                        handleInputChange("ethnicOrigin", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Select an option</option>
                      {ethnicOrigins.map((origin) => (
                        <option key={origin} value={origin}>
                          {origin}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === "male"}
                          onChange={(e) =>
                            handleInputChange("gender", e.target.value)
                          }
                          className="mr-2"
                        />
                        Male
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === "female"}
                          onChange={(e) =>
                            handleInputChange("gender", e.target.value)
                          }
                          className="mr-2"
                        />
                        Female
                      </label>
                    </div>
                  </div>
                </div>

                {/* Female-specific information */}
                {formData.gender === "female" && (
                  <div className="mt-6 pt-4 border-t border-gray-300">
                    <h4 className="text-md font-semibold mb-4 text-purple-600">
                      If the patient is a woman, fill in the information below.
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Menopause
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="menopause"
                              value="yes"
                              checked={formData.menopause === "yes"}
                              onChange={(e) =>
                                handleInputChange("menopause", e.target.value)
                              }
                              className="mr-2"
                            />
                            Yes
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="menopause"
                              value="no"
                              checked={formData.menopause === "no"}
                              onChange={(e) =>
                                handleInputChange("menopause", e.target.value)
                              }
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current pregnancy
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="currentPregnancy"
                              value="yes"
                              checked={formData.currentPregnancy === "yes"}
                              onChange={(e) =>
                                handleInputChange(
                                  "currentPregnancy",
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
                              name="currentPregnancy"
                              value="no"
                              checked={formData.currentPregnancy === "no"}
                              onChange={(e) =>
                                handleInputChange(
                                  "currentPregnancy",
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
                          Current breast feeding
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="currentBreastFeeding"
                              value="yes"
                              checked={formData.currentBreastFeeding === "yes"}
                              onChange={(e) =>
                                handleInputChange(
                                  "currentBreastFeeding",
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
                              name="currentBreastFeeding"
                              value="no"
                              checked={formData.currentBreastFeeding === "no"}
                              onChange={(e) =>
                                handleInputChange(
                                  "currentBreastFeeding",
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
                          Current contraceptive treatment
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="currentContraceptiveTreatment"
                              value="yes"
                              checked={
                                formData.currentContraceptiveTreatment === "yes"
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  "currentContraceptiveTreatment",
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
                              name="currentContraceptiveTreatment"
                              value="no"
                              checked={
                                formData.currentContraceptiveTreatment === "no"
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  "currentContraceptiveTreatment",
                                  e.target.value
                                )
                              }
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Clinical Features */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  REPORTED CLINICAL FEATURES
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fill this field
                  </label>
                  <textarea
                    value={formData.reportedClinicalFeatures}
                    onChange={(e) =>
                      handleInputChange(
                        "reportedClinicalFeatures",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={4}
                    placeholder="Please describe any clinical features..."
                  />
                </div>
              </div>

              {/* Medications */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  MEDICATION INFORMATION
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      MEDICATION (prescription and over-the-counter medications)
                    </label>
                    <textarea
                      value={formData.medication}
                      onChange={(e) =>
                        handleInputChange("medication", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      rows={3}
                      placeholder="List all current medications..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      HERBAL MEDICINES
                    </label>
                    <textarea
                      value={formData.herbalMedicines}
                      onChange={(e) =>
                        handleInputChange("herbalMedicines", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      rows={3}
                      placeholder="List any herbal medicines..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      VITAMINS AND SUPPLEMENTS
                    </label>
                    <textarea
                      value={formData.vitaminsSupplements}
                      onChange={(e) =>
                        handleInputChange("vitaminsSupplements", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      rows={3}
                      placeholder="List any vitamins and supplements..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      HORMONE REPLACEMENT THERAPY
                    </label>
                    <textarea
                      value={formData.hormoneReplacementTherapy}
                      onChange={(e) =>
                        handleInputChange(
                          "hormoneReplacementTherapy",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      rows={3}
                      placeholder="List any hormone replacement therapy..."
                    />
                  </div>
                </div>
              </div>

              {/* Allergies and ADRs */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  ALLERGIES/ADVERSE DRUG REACTIONS
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ALLERGIES/ADVERSE DRUG REACTIONS
                    </label>
                    <textarea
                      value={formData.allergies}
                      onChange={(e) =>
                        handleInputChange("allergies", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      rows={3}
                      placeholder="List any allergies or adverse drug reactions..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adverse Drug Reactions (ADRs)
                    </label>
                    <textarea
                      value={formData.adverseDrugReactions}
                      onChange={(e) =>
                        handleInputChange(
                          "adverseDrugReactions",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      rows={3}
                      placeholder="Describe any adverse drug reactions..."
                    />
                  </div>
                </div>
              </div>

              {/* Lifestyle Elements */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  LIFESTYLE ELEMENTS
                </h3>
                <div className="space-y-6">
                  {/* Smoking */}
                  <div>
                    <h4 className="text-md font-medium mb-3 text-gray-700">
                      Smoking
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cigarette smoking
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="cigaretteSmoking"
                              value="yes"
                              checked={formData.cigaretteSmoking === "yes"}
                              onChange={(e) =>
                                handleInputChange(
                                  "cigaretteSmoking",
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
                              name="cigaretteSmoking"
                              value="no"
                              checked={formData.cigaretteSmoking === "no"}
                              onChange={(e) =>
                                handleInputChange(
                                  "cigaretteSmoking",
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
                          Passive smoker
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="passiveSmoker"
                              value="yes"
                              checked={formData.passiveSmoker === "yes"}
                              onChange={(e) =>
                                handleInputChange(
                                  "passiveSmoker",
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
                              name="passiveSmoker"
                              value="no"
                              checked={formData.passiveSmoker === "no"}
                              onChange={(e) =>
                                handleInputChange(
                                  "passiveSmoker",
                                  e.target.value
                                )
                              }
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      </div>
                      {formData.cigaretteSmoking === "yes" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Smoker
                          </label>
                          <select
                            value={formData.smoker}
                            onChange={(e) =>
                              handleInputChange("smoker", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          >
                            <option value="">Select an option</option>
                            <option value="<15">{"<15 cigarettes/day"}</option>
                            <option value=">15">{">15 cigarettes/day"}</option>
                            <option value="1-pack">1 pack/day</option>
                            <option value="1+pack">1+ Pack/day</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Alcohol */}
                  <div>
                    <h4 className="text-md font-medium mb-3 text-gray-700">
                      Alcohol Consumption
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Consumption of alcohol
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="consumptionOfAlcohol"
                              value="yes"
                              checked={formData.consumptionOfAlcohol === "yes"}
                              onChange={(e) =>
                                handleInputChange(
                                  "consumptionOfAlcohol",
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
                              name="consumptionOfAlcohol"
                              value="no"
                              checked={formData.consumptionOfAlcohol === "no"}
                              onChange={(e) =>
                                handleInputChange(
                                  "consumptionOfAlcohol",
                                  e.target.value
                                )
                              }
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      </div>
                      {formData.consumptionOfAlcohol === "yes" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Consumption of Alcohol Sometimes
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {alcoholOptions.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center text-sm"
                                >
                                  <input
                                    type="checkbox"
                                    checked={formData.alcoholSometimes.includes(
                                      option
                                    )}
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        "alcoholSometimes",
                                        option,
                                        e.target.checked
                                      )
                                    }
                                    className="mr-2"
                                  />
                                  {option}
                                </label>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Consumption of Alcohol Regularly
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {alcoholOptions.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center text-sm"
                                >
                                  <input
                                    type="checkbox"
                                    checked={formData.alcoholRegularly.includes(
                                      option
                                    )}
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        "alcoholRegularly",
                                        option,
                                        e.target.checked
                                      )
                                    }
                                    className="mr-2"
                                  />
                                  {option}
                                </label>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Frequency of alcohol consumption
                            </label>
                            <select
                              value={formData.frequencyOfAlcoholConsumption}
                              onChange={(e) =>
                                handleInputChange(
                                  "frequencyOfAlcoholConsumption",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                              <option value="">Select an option</option>
                              <option value="1-2-cups-day">1-2 cups/day</option>
                              <option value="3-cups-day">3 cups/day</option>
                              <option value="more-3-cups-day">
                                More than 3 cups/day
                              </option>
                              <option value="1-2-cups-week">
                                1-2 cups/week
                              </option>
                              <option value="3-cups-week">3 cups/week</option>
                              <option value="more-3-cups-week">
                                More than 3 cups/week
                              </option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Caffeine */}
                  <div>
                    <h4 className="text-md font-medium mb-3 text-gray-700">
                      Caffeinated Beverages
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Consumption of caffeinated beverages (coffee, tea,
                          cola, etc.)
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="consumptionOfCaffeinatedBeverages"
                              value="yes"
                              checked={
                                formData.consumptionOfCaffeinatedBeverages ===
                                "yes"
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  "consumptionOfCaffeinatedBeverages",
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
                              name="consumptionOfCaffeinatedBeverages"
                              value="no"
                              checked={
                                formData.consumptionOfCaffeinatedBeverages ===
                                "no"
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  "consumptionOfCaffeinatedBeverages",
                                  e.target.value
                                )
                              }
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      </div>
                      {formData.consumptionOfCaffeinatedBeverages === "yes" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Consumption of caffeinated beverages Sometimes
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {caffeineOptions.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center text-sm"
                                >
                                  <input
                                    type="checkbox"
                                    checked={formData.caffeineSometimes.includes(
                                      option
                                    )}
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        "caffeineSometimes",
                                        option,
                                        e.target.checked
                                      )
                                    }
                                    className="mr-2"
                                  />
                                  {option}
                                </label>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Consumption of caffeinated beverages Regularly
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {caffeineOptions.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center text-sm"
                                >
                                  <input
                                    type="checkbox"
                                    checked={formData.caffeineRegularly.includes(
                                      option
                                    )}
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        "caffeineRegularly",
                                        option,
                                        e.target.checked
                                      )
                                    }
                                    className="mr-2"
                                  />
                                  {option}
                                </label>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Caffeine Consumption Frequency
                            </label>
                            <select
                              value={formData.caffeineConsumptionFrequency}
                              onChange={(e) =>
                                handleInputChange(
                                  "caffeineConsumptionFrequency",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                              <option value="">Select an option</option>
                              <option value="1-2-glasses-day">
                                1-2 glasses/day
                              </option>
                              <option value="3-glasses-day">
                                3 glasses/day
                              </option>
                              <option value="more-3-glasses-day">
                                {">3 glasses/day"}
                              </option>
                              <option value="1-2-glasses-week">
                                1-2 glasses/week
                              </option>
                              <option value="3-glasses-week">
                                3 glasses/week
                              </option>
                              <option value="more-3-glasses-week">
                                {">3 glasses/week"}
                              </option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Grapefruit */}
                  <div>
                    <h4 className="text-md font-medium mb-3 text-gray-700">
                      Grapefruit Juice
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Grapefruit juice consumption
                        </label>
                        <select
                          value={formData.grapefruitJuiceConsumption}
                          onChange={(e) =>
                            handleInputChange(
                              "grapefruitJuiceConsumption",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="">Select an option</option>
                          <option value="never">Never</option>
                          <option value="occasionally">Occasionally</option>
                          <option value="regularly">Regularly</option>
                        </select>
                      </div>
                      {formData.grapefruitJuiceConsumption === "regularly" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            If Regularly?
                          </label>
                          <select
                            value={formData.grapefruitFrequency}
                            onChange={(e) =>
                              handleInputChange(
                                "grapefruitFrequency",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          >
                            <option value="">Select an option</option>
                            <option value="1-2-glasses-day">
                              1-2 glasses/day
                            </option>
                            <option value="3-glasses-day">3 glasses/day</option>
                            <option value="more-3-glasses-day">
                              {">3 glasses/day"}
                            </option>
                            <option value="1-2-glasses-week">
                              1-2 glasses/week
                            </option>
                            <option value="3-glasses-week">
                              3 glasses/week
                            </option>
                            <option value="more-3-glasses-week">
                              {">3 glasses/week"}
                            </option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  MEDICAL STORY
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight loss or gain
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="weightLossOrGain"
                            value="yes"
                            checked={formData.weightLossOrGain === "yes"}
                            onChange={(e) =>
                              handleInputChange(
                                "weightLossOrGain",
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
                            name="weightLossOrGain"
                            value="no"
                            checked={formData.weightLossOrGain === "no"}
                            onChange={(e) =>
                              handleInputChange(
                                "weightLossOrGain",
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
                        High blood pressure problem (ie {">"} 140/90)
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="highBloodPressure"
                            value="yes"
                            checked={formData.highBloodPressure === "yes"}
                            onChange={(e) =>
                              handleInputChange(
                                "highBloodPressure",
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
                            name="highBloodPressure"
                            value="no"
                            checked={formData.highBloodPressure === "no"}
                            onChange={(e) =>
                              handleInputChange(
                                "highBloodPressure",
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
                        Have you ever had severe episodes of hypoglycemia?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="severeHypoglycemia"
                            value="yes"
                            checked={formData.severeHypoglycemia === "yes"}
                            onChange={(e) =>
                              handleInputChange(
                                "severeHypoglycemia",
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
                            name="severeHypoglycemia"
                            value="no"
                            checked={formData.severeHypoglycemia === "no"}
                            onChange={(e) =>
                              handleInputChange(
                                "severeHypoglycemia",
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
                        Have you had an increase in cholesterol, triglycerides?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="cholesterolTriglycerides"
                            value="yes"
                            checked={
                              formData.cholesterolTriglycerides === "yes"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "cholesterolTriglycerides",
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
                            name="cholesterolTriglycerides"
                            value="no"
                            checked={formData.cholesterolTriglycerides === "no"}
                            onChange={(e) =>
                              handleInputChange(
                                "cholesterolTriglycerides",
                                e.target.value
                              )
                            }
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      DIABETES
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="diabetes"
                          value="no"
                          checked={formData.diabetes === "no"}
                          onChange={(e) =>
                            handleInputChange("diabetes", e.target.value)
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="diabetes"
                          value="diabetes-1"
                          checked={formData.diabetes === "diabetes-1"}
                          onChange={(e) =>
                            handleInputChange("diabetes", e.target.value)
                          }
                          className="mr-2"
                        />
                        Diabetes I
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="diabetes"
                          value="diabetes-2"
                          checked={formData.diabetes === "diabetes-2"}
                          onChange={(e) =>
                            handleInputChange("diabetes", e.target.value)
                          }
                          className="mr-2"
                        />
                        Diabetes 2
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="diabetes"
                          value="mody"
                          checked={formData.diabetes === "mody"}
                          onChange={(e) =>
                            handleInputChange("diabetes", e.target.value)
                          }
                          className="mr-2"
                        />
                        Monogenic (MODY)
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Have you ever had myocardial infarction (heart attack)
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="myocardialInfarction"
                            value="yes"
                            checked={formData.myocardialInfarction === "yes"}
                            onChange={(e) =>
                              handleInputChange(
                                "myocardialInfarction",
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
                            name="myocardialInfarction"
                            value="no"
                            checked={formData.myocardialInfarction === "no"}
                            onChange={(e) =>
                              handleInputChange(
                                "myocardialInfarction",
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
                        Do you suffer from heart failure?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="heartFailure"
                            value="yes"
                            checked={formData.heartFailure === "yes"}
                            onChange={(e) =>
                              handleInputChange("heartFailure", e.target.value)
                            }
                            className="mr-2"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="heartFailure"
                            value="no"
                            checked={formData.heartFailure === "no"}
                            onChange={(e) =>
                              handleInputChange("heartFailure", e.target.value)
                            }
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Do you have thrombosis problem?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="thrombosisProblem"
                            value="yes"
                            checked={formData.thrombosisProblem === "yes"}
                            onChange={(e) =>
                              handleInputChange(
                                "thrombosisProblem",
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
                            name="thrombosisProblem"
                            value="no"
                            checked={formData.thrombosisProblem === "no"}
                            onChange={(e) =>
                              handleInputChange(
                                "thrombosisProblem",
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
                        Do you suffer from peripheral vascular disease (PVD)?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="peripheralVascularDisease"
                            value="yes"
                            checked={
                              formData.peripheralVascularDisease === "yes"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "peripheralVascularDisease",
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
                            name="peripheralVascularDisease"
                            value="no"
                            checked={
                              formData.peripheralVascularDisease === "no"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "peripheralVascularDisease",
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
                        Do you have kidney disease problem?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="kidneyDisease"
                            value="have"
                            checked={formData.kidneyDisease === "have"}
                            onChange={(e) =>
                              handleInputChange("kidneyDisease", e.target.value)
                            }
                            className="mr-2"
                          />
                          I Have
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="kidneyDisease"
                            value="dont-have"
                            checked={formData.kidneyDisease === "dont-have"}
                            onChange={(e) =>
                              handleInputChange("kidneyDisease", e.target.value)
                            }
                            className="mr-2"
                          />
                          I Don&apos;t Have
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Do you have liver disease
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="liverDisease"
                            value="have"
                            checked={formData.liverDisease === "have"}
                            onChange={(e) =>
                              handleInputChange("liverDisease", e.target.value)
                            }
                            className="mr-2"
                          />
                          I Have
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="liverDisease"
                            value="dont-have"
                            checked={formData.liverDisease === "dont-have"}
                            onChange={(e) =>
                              handleInputChange("liverDisease", e.target.value)
                            }
                            className="mr-2"
                          />
                          I Don&apos;t Have
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gastrointestinal diseases
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gastrointestinalDiseases"
                          value="dont-have"
                          checked={
                            formData.gastrointestinalDiseases === "dont-have"
                          }
                          onChange={(e) =>
                            handleInputChange(
                              "gastrointestinalDiseases",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        I don&apos;t have
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gastrointestinalDiseases"
                          value="gastritis"
                          checked={
                            formData.gastrointestinalDiseases === "gastritis"
                          }
                          onChange={(e) =>
                            handleInputChange(
                              "gastrointestinalDiseases",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        Gastritis
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gastrointestinalDiseases"
                          value="colitis"
                          checked={
                            formData.gastrointestinalDiseases === "colitis"
                          }
                          onChange={(e) =>
                            handleInputChange(
                              "gastrointestinalDiseases",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        Colitis
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gastrointestinalDiseases"
                          value="pancreatitis"
                          checked={
                            formData.gastrointestinalDiseases === "pancreatitis"
                          }
                          onChange={(e) =>
                            handleInputChange(
                              "gastrointestinalDiseases",
                              e.target.value
                            )
                          }
                          className="mr-2"
                        />
                        Pancreatitis
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you have a cancer?
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="cancer"
                          value="have"
                          checked={formData.cancer === "have"}
                          onChange={(e) =>
                            handleInputChange("cancer", e.target.value)
                          }
                          className="mr-2"
                        />
                        I Have
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="cancer"
                          value="dont-have"
                          checked={formData.cancer === "dont-have"}
                          onChange={(e) =>
                            handleInputChange("cancer", e.target.value)
                          }
                          className="mr-2"
                        />
                        I Don&apos;t Have
                      </label>
                    </div>
                    {formData.cancer === "have" && (
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          If yes, please specify the type of cancer?
                        </label>
                        <input
                          type="text"
                          value={formData.cancerType}
                          onChange={(e) =>
                            handleInputChange("cancerType", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Please specify the type of cancer..."
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      If you have any other chronic illness (or long-term
                      emotional disorder) not listed above, please download it
                      below.
                    </label>
                    <textarea
                      value={formData.otherChronicIllness}
                      onChange={(e) =>
                        handleInputChange("otherChronicIllness", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      rows={3}
                      placeholder="Please describe any other chronic illnesses..."
                    />
                  </div>
                </div>
              </div>

              {/* Female-specific medical conditions */}
              {formData.gender === "female" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-purple-600">
                    FOR FEMALE INDIVIDUALS ONLY
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Endometriosis
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="endometriosis"
                            value="have"
                            checked={formData.endometriosis === "have"}
                            onChange={(e) =>
                              handleInputChange("endometriosis", e.target.value)
                            }
                            className="mr-2"
                          />
                          I Have
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="endometriosis"
                            value="dont-have"
                            checked={formData.endometriosis === "dont-have"}
                            onChange={(e) =>
                              handleInputChange("endometriosis", e.target.value)
                            }
                            className="mr-2"
                          />
                          I Don&apos;t Have
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Osteoporosis
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="osteoporosis"
                            value="have"
                            checked={formData.osteoporosis === "have"}
                            onChange={(e) =>
                              handleInputChange("osteoporosis", e.target.value)
                            }
                            className="mr-2"
                          />
                          I Have
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="osteoporosis"
                            value="dont-have"
                            checked={formData.osteoporosis === "dont-have"}
                            onChange={(e) =>
                              handleInputChange("osteoporosis", e.target.value)
                            }
                            className="mr-2"
                          />
                          I Don&apos;t Have
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Inherited Genetic Variability */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                  INHERITED GENETIC VARIABILITY IN DRUG RESPONSE
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Have you ever taken medication with little or no effect?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="medicationLittleEffect"
                            value="yes"
                            checked={formData.medicationLittleEffect === "yes"}
                            onChange={(e) =>
                              handleInputChange(
                                "medicationLittleEffect",
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
                            name="medicationLittleEffect"
                            value="no"
                            checked={formData.medicationLittleEffect === "no"}
                            onChange={(e) =>
                              handleInputChange(
                                "medicationLittleEffect",
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
                        Has any family member (father, mother, uncle, aunt,
                        distant cousins &quot;blood relatives&quot;, etc.) ever
                        taken medication with little or no effect?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="familyMedicationLittleEffect"
                            value="yes"
                            checked={
                              formData.familyMedicationLittleEffect === "yes"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "familyMedicationLittleEffect",
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
                            name="familyMedicationLittleEffect"
                            value="no"
                            checked={
                              formData.familyMedicationLittleEffect === "no"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "familyMedicationLittleEffect",
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
                        Have you ever constantly experienced side effects
                        (fatigue, dizziness, headache, diarrhea, constipation,
                        cramps, and/or other rashes) for certain medications?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="experiencedSideEffects"
                            value="yes"
                            checked={formData.experiencedSideEffects === "yes"}
                            onChange={(e) =>
                              handleInputChange(
                                "experiencedSideEffects",
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
                            name="experiencedSideEffects"
                            value="no"
                            checked={formData.experiencedSideEffects === "no"}
                            onChange={(e) =>
                              handleInputChange(
                                "experiencedSideEffects",
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
                        Has any family member ever experienced the side effects
                        of certain medications?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="familyExperiencedSideEffects"
                            value="yes"
                            checked={
                              formData.familyExperiencedSideEffects === "yes"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "familyExperiencedSideEffects",
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
                            name="familyExperiencedSideEffects"
                            value="no"
                            checked={
                              formData.familyExperiencedSideEffects === "no"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "familyExperiencedSideEffects",
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
                        Are you intolerant or insensitive to certain medications
                        such as codeine, beta-blockers, antidepressants and/or
                        others?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="intolerantInsensitive"
                            value="yes"
                            checked={formData.intolerantInsensitive === "yes"}
                            onChange={(e) =>
                              handleInputChange(
                                "intolerantInsensitive",
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
                            name="intolerantInsensitive"
                            value="no"
                            checked={formData.intolerantInsensitive === "no"}
                            onChange={(e) =>
                              handleInputChange(
                                "intolerantInsensitive",
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
                        Is any family member (father, mother, uncle, aunt,
                        distant cousins &quot;blood relatives&quot;, etc.)
                        intolerant or insensitive to certain medications such as
                        codeine, beta-blockers, antidepressants and/or others?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="familyIntolerantInsensitive"
                            value="yes"
                            checked={
                              formData.familyIntolerantInsensitive === "yes"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "familyIntolerantInsensitive",
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
                            name="familyIntolerantInsensitive"
                            value="no"
                            checked={
                              formData.familyIntolerantInsensitive === "no"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "familyIntolerantInsensitive",
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
                        Has a family member ever been hospitalized due to
                        medication?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="familyHospitalizedMedication"
                            value="yes"
                            checked={
                              formData.familyHospitalizedMedication === "yes"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "familyHospitalizedMedication",
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
                            name="familyHospitalizedMedication"
                            value="no"
                            checked={
                              formData.familyHospitalizedMedication === "no"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "familyHospitalizedMedication",
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
                        Has any family member in the hospital ever had side
                        effects from their medications?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="familyHospitalSideEffects"
                            value="yes"
                            checked={
                              formData.familyHospitalSideEffects === "yes"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "familyHospitalSideEffects",
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
                            name="familyHospitalSideEffects"
                            value="no"
                            checked={
                              formData.familyHospitalSideEffects === "no"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "familyHospitalSideEffects",
                                e.target.value
                              )
                            }
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>
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
