"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, User, Calendar, FileText } from "lucide-react";

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationForm({
  isOpen,
  onClose,
}: ConsultationFormProps) {
  // Helper function to check if a family history item is an object with has/family properties
  const isFamilyHistoryObject = (
    item: unknown
  ): item is { has: string; family: string } => {
    return (
      typeof item === "object" &&
      item !== null &&
      "has" in item &&
      "family" in item
    );
  };
  const [formData, setFormData] = useState({
    // Reason for Application
    reasonForApplication: "",
    reasonOther: "",

    // Ethnic Origin
    ethnicOrigin: "",
    ethnicOriginOther: "",

    // Patient Information
    nameSurname: "",
    email: "",
    phoneNumber: "",
    placeOfBirth: "",
    dateOfBirth: "",
    gender: "",
    height: "",
    weight: "",
    bmi: "",
    bmiGroup: "",
    occupation: "",
    institution: "",
    address: "",

    // Current complaint and referral
    currentComplaint: "",
    referralSource: "",

    // Supplements
    supplements: {
      curcumin: false,
      quercetin: false,
      greenTea: false,
      sulforaphane: false,
      melatonin: false,
      resveratrol: false,
      no: false,
    },
    supplementProblems: {
      curcumin: false,
      quercetin: false,
      greenTea: false,
      sulforaphane: false,
      melatonin: false,
      resveratrol: false,
      no: false,
    },
    otherMedications: "",
    otherSupplementProblems: "",

    // Lifestyle
    smoking: "",
    cigarettesPerDay: "",
    lunchHourFixed: "",
    lunchHour: "",
    dinnerHourFixed: "",
    dinnerHour: "",
    sleepHours: "",
    troubleFallingAsleep: "",
    exercise: "",
    exerciseDetails: "",
    stressAnxiety: "",
    stressDetails: "",

    // Family medical history
    familyHistory: {
      headacheDizziness: { has: "", family: "" },
      hearingDisorder: { has: "", family: "" },
      tasteSmellDisorder: { has: "", family: "" },
      eyeDiseases: { has: "", family: "" },
      postnasalDrip: { has: "", family: "" },
      gumProblems: { has: "", family: "" },
      anorexia: { has: "", family: "" },
      nauseaVomiting: { has: "", family: "" },
      chestPain: { has: "", family: "" },
      shortnessOfBreath: { has: "", family: "" },
      thyroidDiseases: { has: "", family: "" },
      autoimmuneThyroiditis: "",
      lungDiseases: { has: "", family: "" },
      venerealDiseases: { has: "", family: "" },
      diabetes: { has: "", family: "", controlled: "" },
      hiv: { has: "", family: "" },
      asthma: { has: "", family: "" },
      allergy: { has: "", family: "" },
      bloodPressure: { has: "", family: "" },
      immuneSystemDiseases: { has: "", family: "" },
      bleedingDisorders: { has: "", family: "" },
      otherOrganDiseases: "",
      cardiovascularDiseases: { has: "", family: "" },
      surgeries: "",
      insomnia: { has: "", family: "" },
      consumption: { has: "" },
      psychologicalProblems: { has: "" },
      menstrualIrregularity: { has: "" },
      migraine: { has: "", family: "" },
      muscleDiseases: { has: "", family: "" },
      boneSkeletalDiseases: { has: "", family: "" },
      occupationalDisease: { has: "" },
      cancerHistory: { has: "", type: "", family: "", familyType: "" },
      otherDiseases: "",
    },

    // Drug and supplement side effects
    drugSideEffects: "",

    // Drug and nutritional supplement information
    drugInfo: {
      corticosteroids: "",
      immunosuppressants: "",
      protonPumpInhibitors: "",
      antibiotics: "",
      painRelievers: "",
      nonSteroidalPainRelievers: "",
      paracetamol: "",
      laxatives: "",
      antidepressants: "",
      diuretics: "",
      weightLossDrugs: "",
    },

    // Respiratory symptoms
    respiratorySymptoms: {
      hackingCough: "",
      persistentCough: "",
      hayFever: "",
      hoarseness: "",
      nasalCongestion: "",
      noseBleeding: "",
      postnasalDrip: "",
      sinusFullness: "",
      sinusInfection: "",
      snore: "",
      soreThroat: "",
      wheezing: "",
    },

    // Skin and hair problems
    skinHairProblems: {
      acne: "",
      eczema: "",
      shingles: "",
      psoriasis: "",
      hairLoss: "",
      cellulite: "",
      itching: "",
    },

    // Musculoskeletal symptoms
    musculoskeletalSymptoms: {
      neckMuscleSpasm: "",
      jointPain: "",
      nervousHeadache: "",
      chestTightness: "",
      legFootCramps: "",
    },

    // Mental and nervous diseases
    mentalNervousDiseases: {
      anxietyFear: "",
      faintingSweating: "",
      depression: "",
      concentrationDifficulty: "",
      balanceDifficulty: "",
      thinkingDifficulty: "",
      judgmentDifficulty: "",
      speakingDifficulty: "",
      memoryDifficulty: "",
    },

    // Cardiovascular symptoms
    cardiovascularSymptoms: {
      chestPain: "",
      shortnessOfBreath: "",
      heartAttackHistory: "",
      heartMurmur: "",
      hypertension: "",
      irregularPulse: "",
      mitralValveProlapse: "",
      palpitation: "",
      vascularInflammation: "",
      swollenAnklesFeet: "",
      varicoseVeinDisease: "",
    },

    // Digestive system symptoms
    digestiveSymptoms: {
      analSpasms: "",
      lowerAbdominalBloating: "",
      wholeAbdominalBloating: "",
      bloatingAfterEating: "",
      bloodInStool: "",
      burping: "",
      constipation: "",
      toothChewingProblems: "",
      diarrhea: "",
      nausea: "",
      gas: "",
      reflux: "",
      heartburn: "",
      hemorrhoids: "",
    },

    // Food intolerances
    foodIntolerances: {
      lactoseIntolerance: "",
      allDairyProductsIntolerance: "",
      glutenMeatIntolerance: "",
      cornIntolerance: "",
      eggIntolerance: "",
      intoleranceToFattyFoods: "",
      yeastIntolerance: "",
      liverDiseaseJaundice: "",
      stomachAche: "",
      mucusInStool: "",
    },

    // Desired blood tests
    desiredBloodTests: {
      bloodSugarInsulin: false,
      fe: false,
      alt: false,
      uibc: false,
      ast: false,
      ferritin: false,
      ggt: false,
      vitaminD25Hydroxy: false,
      sedimentationRate: false,
      homaIR: false,
      cholesterol: false,
      cholesterolHDL: false,
      cholesterolLDL: false,
      uricAcid: false,
      creatine: false,
      glucose: false,
      hbA1c: false,
      triglyceride: false,
      b12: false,
      urea: false,
      hemogram: false,
      homocysteine: false,
      tsh: false,
      totalProtein: false,
      ft3: false,
      albumin: false,
      ft4: false,
      globulin: false,
      sodium: false,
      chloride: false,
      potassium: false,
    },

    // Imaging tests
    imagingTests: {
      abdominalUltrasonography: false,
      thyroidUltrasonography: false,
      fullUrine: false,
    },

    // Sleep schedule
    sleepSchedule: {
      wakeUpTime: "",
      breakfastTime: "",
      sleepTime: "",
    },

    // Kit information
    kitCode: "",

    // Consent and agreements
    consent: {
      informationCorrect: false,
      shareInformation: false,
      termsAndConditions: false,
      orderForm: false,
      dataProtectionPolicy: false,
      nutrigeneticForm: false,
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("supplements.")) {
      const supplementName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        supplements: {
          ...prev.supplements,
          [supplementName]: (e.target as HTMLInputElement).checked,
        },
      }));
    } else if (name.startsWith("supplementProblems.")) {
      const supplementName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        supplementProblems: {
          ...prev.supplementProblems,
          [supplementName]: (e.target as HTMLInputElement).checked,
        },
      }));
    } else if (name.startsWith("familyHistory.")) {
      const [category, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        familyHistory: {
          ...prev.familyHistory,
          [category]: {
            ...(isFamilyHistoryObject(
              prev.familyHistory[category as keyof typeof prev.familyHistory]
            )
              ? (prev.familyHistory[
                  category as keyof typeof prev.familyHistory
                ] as { has: string; family: string })
              : {}),
            [field]: value,
          },
        },
      }));
    } else if (name.startsWith("drugInfo.")) {
      const drugName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        drugInfo: {
          ...prev.drugInfo,
          [drugName]: value,
        },
      }));
    } else if (name.startsWith("respiratorySymptoms.")) {
      const symptomName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        respiratorySymptoms: {
          ...prev.respiratorySymptoms,
          [symptomName]: value,
        },
      }));
    } else if (name.startsWith("skinHairProblems.")) {
      const problemName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        skinHairProblems: {
          ...prev.skinHairProblems,
          [problemName]: value,
        },
      }));
    } else if (name.startsWith("musculoskeletalSymptoms.")) {
      const symptomName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        musculoskeletalSymptoms: {
          ...prev.musculoskeletalSymptoms,
          [symptomName]: value,
        },
      }));
    } else if (name.startsWith("mentalNervousDiseases.")) {
      const diseaseName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        mentalNervousDiseases: {
          ...prev.mentalNervousDiseases,
          [diseaseName]: value,
        },
      }));
    } else if (name.startsWith("cardiovascularSymptoms.")) {
      const symptomName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        cardiovascularSymptoms: {
          ...prev.cardiovascularSymptoms,
          [symptomName]: value,
        },
      }));
    } else if (name.startsWith("digestiveSymptoms.")) {
      const symptomName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        digestiveSymptoms: {
          ...prev.digestiveSymptoms,
          [symptomName]: value,
        },
      }));
    } else if (name.startsWith("foodIntolerances.")) {
      const intoleranceName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        foodIntolerances: {
          ...prev.foodIntolerances,
          [intoleranceName]: value,
        },
      }));
    } else if (name.startsWith("desiredBloodTests.")) {
      const testName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        desiredBloodTests: {
          ...prev.desiredBloodTests,
          [testName]: (e.target as HTMLInputElement).checked,
        },
      }));
    } else if (name.startsWith("imagingTests.")) {
      const testName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        imagingTests: {
          ...prev.imagingTests,
          [testName]: (e.target as HTMLInputElement).checked,
        },
      }));
    } else if (name.startsWith("sleepSchedule.")) {
      const scheduleName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        sleepSchedule: {
          ...prev.sleepSchedule,
          [scheduleName]: value,
        },
      }));
    } else if (name.startsWith("consent.")) {
      const consentName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        consent: {
          ...prev.consent,
          [consentName]: (e.target as HTMLInputElement).checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 p-2 sm:p-4">
      <Card className="w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-white rounded-xl sm:rounded-2xl shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-xl sm:rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                <FileText className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold">
                  Nutrigenetics & Epigenetics Consultation Form
                </CardTitle>
                <p className="text-purple-100 mt-1 text-xs sm:text-sm">
                  Comprehensive genetic and lifestyle assessment for
                  personalized health optimization
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-1 sm:p-2 flex-shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 lg:p-8">
          {/* Information Section */}
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              About This Consultation
            </h3>
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
              It is aimed to plan a healthy individual life within the framework
              of possible lifestyle factors such as nutrition, drug therapy and
              sports activities for your genetic and epigenetic profile. It
              gives information about the susceptibility to diseases in the
              framework of &quot;relative&quot; increase in risk depending on
              genetic variations (&quot;genetic polymorphism) and brings
              recommendations by adhering to international scientific studies on
              genetics and epigenetics in order to prevent the development of
              these disease conditions. The information and recommendations in
              this booklet are &quot;Nutrigenetics&quot; and &quot; It has been
              prepared on the basis of the science of
              &quot;pharmacogenetics&quot; and is not intended for &quot;medical
              treatment&quot;.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Reason for Application */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Your Reason for Application?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Autoimmune",
                  "Allergy",
                  "Psychosocial",
                  "Athletic performance",
                  "Bone health",
                  "Longevity",
                  "Menopause",
                  "Infertility",
                  "Obesity",
                  "Hyperactivity",
                  "Autism",
                  "Digestive system diseases",
                  "Child growth and development",
                  "Fibromyalgia",
                  "Respiratory system diseases",
                  "Depression -anxiety",
                  "Sleep problems",
                  "Epilepsy",
                  "Other",
                ].map((reason) => (
                  <label key={reason} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="reasonForApplication"
                      value={reason}
                      checked={formData.reasonForApplication === reason}
                      onChange={handleInputChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{reason}</span>
                  </label>
                ))}
              </div>
              {formData.reasonForApplication === "Other" && (
                <Input
                  name="reasonOther"
                  value={formData.reasonOther}
                  onChange={handleInputChange}
                  placeholder="Please specify other reason"
                  className="rounded-lg"
                />
              )}
            </div>

            {/* Ethnic Origin */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Ethnic Origin
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Caucasian",
                  "African American",
                  "African",
                  "Asian",
                  "Hispanic",
                  "Middle Eastern",
                  "Other",
                ].map((origin) => (
                  <label key={origin} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="ethnicOrigin"
                      value={origin}
                      checked={formData.ethnicOrigin === origin}
                      onChange={handleInputChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{origin}</span>
                  </label>
                ))}
              </div>
              {formData.ethnicOrigin === "Other" && (
                <Input
                  name="ethnicOriginOther"
                  value={formData.ethnicOriginOther}
                  onChange={handleInputChange}
                  placeholder="Please specify other ethnic origin"
                  className="rounded-lg"
                />
              )}
            </div>

            {/* Patient Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Patient Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name Surname *
                  </label>
                  <Input
                    name="nameSurname"
                    value={formData.nameSurname}
                    onChange={handleInputChange}
                    required
                    className="rounded-lg"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="rounded-lg"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone number *
                  </label>
                  <Input
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="rounded-lg"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Place of Birth
                  </label>
                  <Input
                    name="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={handleInputChange}
                    className="rounded-lg"
                    placeholder="Enter your place of birth"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <Input
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <Input
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="rounded-lg"
                    placeholder="Enter your height in cm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <Input
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="rounded-lg"
                    placeholder="Enter your weight in kg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BMI (kg/m²)
                  </label>
                  <Input
                    name="bmi"
                    type="number"
                    value={formData.bmi}
                    onChange={handleInputChange}
                    className="rounded-lg"
                    placeholder="Enter your BMI"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BMI Group
                  </label>
                  <select
                    name="bmiGroup"
                    value={formData.bmiGroup}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select BMI group</option>
                    <option value="underweight">Underweight (&lt; 18.5)</option>
                    <option value="normal">Normal (18.5-24.9)</option>
                    <option value="overweight">Overweight (25-29.9)</option>
                    <option value="obese">Obese (&gt;= 30)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation
                  </label>
                  <Input
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="rounded-lg"
                    placeholder="Enter your occupation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution you work for
                  </label>
                  <Input
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="rounded-lg"
                    placeholder="Enter your workplace"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home/Business Address
                </label>
                <Textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="rounded-lg"
                  placeholder="Enter your address"
                  rows={3}
                />
              </div>
            </div>

            {/* Current complaint and referral */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Health Information
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What is your current / disease complaint and your reason for
                  applying to Epigenetic Coaching?
                </label>
                <Textarea
                  name="currentComplaint"
                  value={formData.currentComplaint}
                  onChange={handleInputChange}
                  className="rounded-lg"
                  placeholder="Describe your current health concerns and reasons for seeking epigenetic coaching"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Who referred you to the epigeneticcoaching.org?
                </label>
                <Input
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleInputChange}
                  className="rounded-lg"
                  placeholder="Enter referral source"
                />
              </div>
            </div>

            {/* Supplements */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Supplements and Medications
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you use any medication or vitamin/mineral supplements?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "curcumin",
                    "quercetin",
                    "greenTea",
                    "sulforaphane",
                    "melatonin",
                    "resveratrol",
                    "no",
                  ].map((supplement) => (
                    <label
                      key={supplement}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        name={`supplements.${supplement}`}
                        checked={
                          formData.supplements[
                            supplement as keyof typeof formData.supplements
                          ]
                        }
                        onChange={handleInputChange}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {supplement === "greenTea"
                          ? "Green Tea"
                          : supplement === "no"
                          ? "No"
                          : supplement}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Have you had any problems using these supplements?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "curcumin",
                    "quercetin",
                    "greenTea",
                    "sulforaphane",
                    "melatonin",
                    "resveratrol",
                    "no",
                  ].map((supplement) => (
                    <label
                      key={supplement}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        name={`supplementProblems.${supplement}`}
                        checked={
                          formData.supplementProblems[
                            supplement as keyof typeof formData.supplementProblems
                          ]
                        }
                        onChange={handleInputChange}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {supplement === "greenTea"
                          ? "Green Tea"
                          : supplement === "no"
                          ? "No"
                          : supplement}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Can you list any other medications you use?
                </label>
                <Textarea
                  name="otherMedications"
                  value={formData.otherMedications}
                  onChange={handleInputChange}
                  className="rounded-lg"
                  placeholder="List any other medications"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Have you had any problems using other supplements?
                </label>
                <Textarea
                  name="otherSupplementProblems"
                  value={formData.otherSupplementProblems}
                  onChange={handleInputChange}
                  className="rounded-lg"
                  placeholder="Describe any problems with other supplements"
                  rows={3}
                />
              </div>
            </div>

            {/* Lifestyle */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Lifestyle Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you smoke?
                  </label>
                  <select
                    name="smoking"
                    value={formData.smoking}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="quit">Quit</option>
                  </select>
                </div>
                {formData.smoking === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How many cigarettes do you smoke per day?
                    </label>
                    <Input
                      name="cigarettesPerDay"
                      type="number"
                      value={formData.cigarettesPerDay}
                      onChange={handleInputChange}
                      className="rounded-lg"
                      placeholder="Number of cigarettes per day"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Is your lunch hour fixed?
                  </label>
                  <select
                    name="lunchHourFixed"
                    value={formData.lunchHourFixed}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {formData.lunchHourFixed === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please specify lunch hour
                    </label>
                    <Input
                      name="lunchHour"
                      type="time"
                      value={formData.lunchHour}
                      onChange={handleInputChange}
                      className="rounded-lg"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Is your dinner hour fixed?
                  </label>
                  <select
                    name="dinnerHourFixed"
                    value={formData.dinnerHourFixed}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {formData.dinnerHourFixed === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please specify dinner hour
                    </label>
                    <Input
                      name="dinnerHour"
                      type="time"
                      value={formData.dinnerHour}
                      onChange={handleInputChange}
                      className="rounded-lg"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How many hours a day do you sleep?
                  </label>
                  <Input
                    name="sleepHours"
                    type="number"
                    value={formData.sleepHours}
                    onChange={handleInputChange}
                    className="rounded-lg"
                    placeholder="Hours of sleep per day"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are you having trouble falling asleep?
                  </label>
                  <select
                    name="troubleFallingAsleep"
                    value={formData.troubleFallingAsleep}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="sometimes">Sometimes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are you exercising?
                  </label>
                  <select
                    name="exercise"
                    value={formData.exercise}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {formData.exercise === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please specify the frequency and type of exercise
                    </label>
                    <Textarea
                      name="exerciseDetails"
                      value={formData.exerciseDetails}
                      onChange={handleInputChange}
                      className="rounded-lg"
                      placeholder="Describe your exercise routine"
                      rows={3}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you suffer from stress-anxiety disorder? (In the form of
                    medium-high)
                  </label>
                  <select
                    name="stressAnxiety"
                    value={formData.stressAnxiety}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="sometimes">Sometimes</option>
                  </select>
                </div>
                {formData.stressAnxiety === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please specify
                    </label>
                    <Textarea
                      name="stressDetails"
                      value={formData.stressDetails}
                      onChange={handleInputChange}
                      className="rounded-lg"
                      placeholder="Describe your stress and anxiety issues"
                      rows={3}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Family Medical History */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-800">
                Family Medical History
              </h4>
              <p className="text-sm text-gray-600">
                Have you or any of your family members had any of the following
                diseases?
              </p>

              {[
                { key: "headacheDizziness", label: "Headache and dizziness" },
                { key: "hearingDisorder", label: "Hearing disorder" },
                { key: "tasteSmellDisorder", label: "Taste-smell disorder" },
                { key: "eyeDiseases", label: "Eye diseases" },
                { key: "postnasalDrip", label: "Postnasal drip, sinusitis" },
                {
                  key: "gumProblems",
                  label: "Gum problems, sore on the tongue",
                },
                { key: "anorexia", label: "Anorexia, weight loss" },
                { key: "nauseaVomiting", label: "Nausea, vomiting" },
                { key: "chestPain", label: "Chest pain, tachycardia" },
                {
                  key: "shortnessOfBreath",
                  label: "Shortness of breath and wheezing",
                },
                { key: "thyroidDiseases", label: "Thyroid gland diseases" },
                { key: "lungDiseases", label: "Lung diseases" },
                { key: "venerealDiseases", label: "Venereal Diseases" },
                { key: "diabetes", label: "Diabetes (Controlled or not?)" },
                { key: "hiv", label: "HIV (Aids)" },
                { key: "asthma", label: "Asthma" },
                { key: "allergy", label: "Allergy" },
                { key: "bloodPressure", label: "Blood pressure" },
                {
                  key: "immuneSystemDiseases",
                  label: "Immune system diseases",
                },
                {
                  key: "bleedingDisorders",
                  label: "Bleeding disorders or other blood disorders",
                },
                {
                  key: "cardiovascularDiseases",
                  label: "Cardiovascular diseases",
                },
                { key: "insomnia", label: "Insomnia" },
                { key: "consumption", label: "Consumption" },
                {
                  key: "psychologicalProblems",
                  label: "Psychological problems",
                },
                {
                  key: "menstrualIrregularity",
                  label: "Menstrual irregularity (for women)",
                },
                { key: "migraine", label: "Migraine" },
                { key: "muscleDiseases", label: "Muscle diseases" },
                {
                  key: "boneSkeletalDiseases",
                  label: "Bone and skeletal system diseases",
                },
                {
                  key: "occupationalDisease",
                  label: "Do you have an occupational disease?",
                },
                {
                  key: "cancerHistory",
                  label: "Do you have a history of cancer?",
                },
              ].map((condition) => (
                <div
                  key={condition.key}
                  className="space-y-3 p-4 bg-gray-50 rounded-lg"
                >
                  <h5 className="font-medium text-gray-800">
                    {condition.label}
                  </h5>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`familyHistory.${condition.key}.has`}
                        value="I Have"
                        checked={
                          isFamilyHistoryObject(
                            formData.familyHistory[
                              condition.key as keyof typeof formData.familyHistory
                            ]
                          ) &&
                          (
                            formData.familyHistory[
                              condition.key as keyof typeof formData.familyHistory
                            ] as { has: string; family: string }
                          ).has === "I Have"
                        }
                        onChange={handleInputChange}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">I Have</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`familyHistory.${condition.key}.has`}
                        value="I Don't Have"
                        checked={
                          isFamilyHistoryObject(
                            formData.familyHistory[
                              condition.key as keyof typeof formData.familyHistory
                            ]
                          ) &&
                          (
                            formData.familyHistory[
                              condition.key as keyof typeof formData.familyHistory
                            ] as { has: string; family: string }
                          ).has === "I Don&apos;t Have"
                        }
                        onChange={handleInputChange}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">
                        I Don&apos;t Have
                      </span>
                    </label>
                  </div>

                  {isFamilyHistoryObject(
                    formData.familyHistory[
                      condition.key as keyof typeof formData.familyHistory
                    ]
                  ) &&
                    (
                      formData.familyHistory[
                        condition.key as keyof typeof formData.familyHistory
                      ] as { has: string; family: string }
                    ).has === "I Have" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          If this condition is in your family, who has it?
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`familyHistory.${condition.key}.family`}
                              value="Mother"
                              checked={
                                isFamilyHistoryObject(
                                  formData.familyHistory[
                                    condition.key as keyof typeof formData.familyHistory
                                  ]
                                ) &&
                                (
                                  formData.familyHistory[
                                    condition.key as keyof typeof formData.familyHistory
                                  ] as { has: string; family: string }
                                ).family === "Mother"
                              }
                              onChange={handleInputChange}
                              className="text-blue-600"
                            />
                            <span className="text-sm text-gray-700">
                              Mother
                            </span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`familyHistory.${condition.key}.family`}
                              value="Father"
                              checked={
                                isFamilyHistoryObject(
                                  formData.familyHistory[
                                    condition.key as keyof typeof formData.familyHistory
                                  ]
                                ) &&
                                (
                                  formData.familyHistory[
                                    condition.key as keyof typeof formData.familyHistory
                                  ] as { has: string; family: string }
                                ).family === "Father"
                              }
                              onChange={handleInputChange}
                              className="text-blue-600"
                            />
                            <span className="text-sm text-gray-700">
                              Father
                            </span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`familyHistory.${condition.key}.family`}
                              value="Other"
                              checked={
                                isFamilyHistoryObject(
                                  formData.familyHistory[
                                    condition.key as keyof typeof formData.familyHistory
                                  ]
                                ) &&
                                (
                                  formData.familyHistory[
                                    condition.key as keyof typeof formData.familyHistory
                                  ] as { has: string; family: string }
                                ).family === "Other"
                              }
                              onChange={handleInputChange}
                              className="text-blue-600"
                            />
                            <span className="text-sm text-gray-700">Other</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`familyHistory.${condition.key}.family`}
                              value="Nothing"
                              checked={
                                isFamilyHistoryObject(
                                  formData.familyHistory[
                                    condition.key as keyof typeof formData.familyHistory
                                  ]
                                ) &&
                                (
                                  formData.familyHistory[
                                    condition.key as keyof typeof formData.familyHistory
                                  ] as { has: string; family: string }
                                ).family === "Nothing"
                              }
                              onChange={handleInputChange}
                              className="text-blue-600"
                            />
                            <span className="text-sm text-gray-700">
                              Nothing
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

                  {/* Special case for autoimmune thyroiditis */}
                  {condition.key === "thyroidDiseases" &&
                    formData.familyHistory.thyroidDiseases.has === "I Have" && (
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Autoimmune thyroiditis
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="familyHistory.autoimmuneThyroiditis"
                              value="Hashimoto thyroiditis"
                              checked={
                                formData.familyHistory.autoimmuneThyroiditis ===
                                "Hashimoto thyroiditis"
                              }
                              onChange={handleInputChange}
                              className="text-blue-600"
                            />
                            <span className="text-sm text-gray-700">
                              Hashimoto thyroiditis
                            </span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="familyHistory.autoimmuneThyroiditis"
                              value="Graves disease"
                              checked={
                                formData.familyHistory.autoimmuneThyroiditis ===
                                "Graves disease"
                              }
                              onChange={handleInputChange}
                              className="text-blue-600"
                            />
                            <span className="text-sm text-gray-700">
                              Graves disease
                            </span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="familyHistory.autoimmuneThyroiditis"
                              value="Nothing"
                              checked={
                                formData.familyHistory.autoimmuneThyroiditis ===
                                "Nothing"
                              }
                              onChange={handleInputChange}
                              className="text-blue-600"
                            />
                            <span className="text-sm text-gray-700">
                              Nothing
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

                  {/* Special case for diabetes */}
                  {condition.key === "diabetes" &&
                    formData.familyHistory.diabetes.has === "I Have" && (
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Is diabetes controlled?
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="familyHistory.diabetes.controlled"
                              value="Controlled"
                              checked={
                                formData.familyHistory.diabetes.controlled ===
                                "Controlled"
                              }
                              onChange={handleInputChange}
                              className="text-blue-600"
                            />
                            <span className="text-sm text-gray-700">
                              Controlled
                            </span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="familyHistory.diabetes.controlled"
                              value="Not Controlled"
                              checked={
                                formData.familyHistory.diabetes.controlled ===
                                "Not Controlled"
                              }
                              onChange={handleInputChange}
                              className="text-blue-600"
                            />
                            <span className="text-sm text-gray-700">
                              Not Controlled
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

                  {/* Special case for cancer history */}
                  {condition.key === "cancerHistory" &&
                    formData.familyHistory.cancerHistory.has === "I Have" && (
                      <div className="mt-3 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Which is your cancer type?
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {[
                              "Lung",
                              "Breast",
                              "Prostate",
                              "Colorectal",
                              "Gastric",
                              "Cervix",
                              "Ovary",
                              "Pancreas",
                              "Thyroid",
                              "Melanoma",
                              "Leukemia",
                              "Lymphoma",
                              "Brain",
                              "I Don't Have",
                            ].map((cancerType) => (
                              <label
                                key={cancerType}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="radio"
                                  name="familyHistory.cancerHistory.type"
                                  value={cancerType}
                                  checked={
                                    formData.familyHistory.cancerHistory
                                      .type === cancerType
                                  }
                                  onChange={handleInputChange}
                                  className="text-blue-600"
                                />
                                <span className="text-sm text-gray-700">
                                  {cancerType}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            If you have Cancer in your family, please indicate
                            who has it.
                          </label>
                          <div className="flex space-x-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="familyHistory.cancerHistory.family"
                                value="Mother"
                                checked={
                                  formData.familyHistory.cancerHistory
                                    .family === "Mother"
                                }
                                onChange={handleInputChange}
                                className="text-blue-600"
                              />
                              <span className="text-sm text-gray-700">
                                Mother
                              </span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="familyHistory.cancerHistory.family"
                                value="Father"
                                checked={
                                  formData.familyHistory.cancerHistory
                                    .family === "Father"
                                }
                                onChange={handleInputChange}
                                className="text-blue-600"
                              />
                              <span className="text-sm text-gray-700">
                                Father
                              </span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="familyHistory.cancerHistory.family"
                                value="Other"
                                checked={
                                  formData.familyHistory.cancerHistory
                                    .family === "Other"
                                }
                                onChange={handleInputChange}
                                className="text-blue-600"
                              />
                              <span className="text-sm text-gray-700">
                                Other
                              </span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="familyHistory.cancerHistory.family"
                                value="Nothing"
                                checked={
                                  formData.familyHistory.cancerHistory
                                    .family === "Nothing"
                                }
                                onChange={handleInputChange}
                                className="text-blue-600"
                              />
                              <span className="text-sm text-gray-700">
                                Nothing
                              </span>
                            </label>
                          </div>
                        </div>

                        {formData.familyHistory.cancerHistory.family ===
                          "I Have" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Which is your family cancer type?
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {[
                                "Lung",
                                "Breast",
                                "Prostate",
                                "Colorectal",
                                "Gastric",
                                "Cervix",
                                "Ovary",
                                "Pancreas",
                                "Thyroid",
                                "Melanoma",
                                "Leukemia",
                                "Lymphoma",
                                "Brain",
                                "I Don&apos;t Have",
                              ].map((cancerType) => (
                                <label
                                  key={cancerType}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="radio"
                                    name="familyHistory.cancerHistory.familyType"
                                    value={cancerType}
                                    checked={
                                      formData.familyHistory.cancerHistory
                                        .familyType === cancerType
                                    }
                                    onChange={handleInputChange}
                                    className="text-blue-600"
                                  />
                                  <span className="text-sm text-gray-700">
                                    {cancerType}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* Other Organ Diseases */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Other Organ Diseases
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  If you have any other diseases concerning your stomach, liver,
                  kidney, etc. other organs, please specify.
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {["Stomach", "Liver", "Kidney", "Fatty Liver"].map(
                    (organ) => (
                      <label
                        key={organ}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          name="familyHistory.otherOrganDiseases"
                          value={organ}
                          checked={formData.familyHistory.otherOrganDiseases.includes(
                            organ
                          )}
                          onChange={(e) => {
                            const current =
                              formData.familyHistory.otherOrganDiseases;
                            const updated = e.target.checked
                              ? [
                                  ...current
                                    .split(",")
                                    .filter((item) => item.trim()),
                                  organ,
                                ].join(", ")
                              : current
                                  .split(",")
                                  .filter((item) => item.trim() !== organ)
                                  .join(", ");
                            setFormData((prev) => ({
                              ...prev,
                              familyHistory: {
                                ...prev.familyHistory,
                                otherOrganDiseases: updated,
                              },
                            }));
                          }}
                          className="text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{organ}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Surgeries */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Surgical History
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Write down any surgeries you have had, if any.
                </label>
                <Textarea
                  name="familyHistory.surgeries"
                  value={formData.familyHistory.surgeries}
                  onChange={handleInputChange}
                  className="rounded-lg"
                  placeholder="List any surgeries you have had"
                  rows={4}
                />
              </div>
            </div>

            {/* Other Diseases */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Additional Medical Information
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have any other diseases not mentioned here?
                </label>
                <Textarea
                  name="familyHistory.otherDiseases"
                  value={formData.familyHistory.otherDiseases}
                  onChange={handleInputChange}
                  className="rounded-lg"
                  placeholder="Please describe any other diseases not mentioned above"
                  rows={4}
                />
              </div>
            </div>

            {/* Drug Side Effects */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Drug and Supplement Side Effects
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Have you had any unusual side effects of the Medicines and
                  Supplements you are using? If yes, please describe the
                  drug/supplement name and side effects:
                </label>
                <Textarea
                  name="drugSideEffects"
                  value={formData.drugSideEffects}
                  onChange={handleInputChange}
                  className="rounded-lg"
                  placeholder="Describe any side effects from medications or supplements"
                  rows={4}
                />
              </div>
            </div>

            {/* Drug and Nutritional Supplement Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Drug and Nutritional Supplement Information Used
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    key: "corticosteroids",
                    label:
                      "Have you used Corticosteroids for any reason? (cortisol) (Have you used it regularly and for a long time?)",
                  },
                  {
                    key: "immunosuppressants",
                    label:
                      "Have you used drugs that suppress the immune system? (such as drugs used to treat cancer or rheumatic disease)",
                  },
                  {
                    key: "protonPumpInhibitors",
                    label:
                      "Proton pump inhibitors or Antacids used for stomach upset",
                  },
                  {
                    key: "antibiotics",
                    label: "Prolonged use of antibiotics in recent months",
                  },
                  { key: "painRelievers", label: "Pain relievers" },
                  {
                    key: "nonSteroidalPainRelievers",
                    label: "Non-steroidal pain reliever",
                  },
                  { key: "paracetamol", label: "Parasetamol?" },
                  { key: "laxatives", label: "Laxatives" },
                  { key: "antidepressants", label: "Antidepressants" },
                  { key: "diuretics", label: "Diuretics" },
                  { key: "weightLossDrugs", label: "Weight Loss Drugs" },
                ].map((drug) => (
                  <div key={drug.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {drug.label}
                    </label>
                    <select
                      name={`drugInfo.${drug.key}`}
                      value={
                        formData.drugInfo[
                          drug.key as keyof typeof formData.drugInfo
                        ]
                      }
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Respiratory Symptoms */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Respiratory Symptoms
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "hackingCough", label: "Hacking cough" },
                  { key: "persistentCough", label: "Persistent cough" },
                  { key: "hayFever", label: "Hay fever" },
                  { key: "hoarseness", label: "Hoarseness" },
                  { key: "nasalCongestion", label: "Nasal Congestion" },
                  { key: "noseBleeding", label: "Nose bleeding" },
                  { key: "postnasalDrip", label: "Postnasal drip" },
                  { key: "sinusFullness", label: "Sinus Fullness" },
                  { key: "sinusInfection", label: "Sinus Infection" },
                  { key: "snore", label: "Snore" },
                  { key: "soreThroat", label: "Sore Throat" },
                  { key: "wheezing", label: "Wheezing" },
                ].map((symptom) => (
                  <div key={symptom.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {symptom.label}
                    </label>
                    <select
                      name={`respiratorySymptoms.${symptom.key}`}
                      value={
                        formData.respiratorySymptoms[
                          symptom.key as keyof typeof formData.respiratorySymptoms
                        ]
                      }
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="I don't have">I don&apos;t have</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Skin and Hair Problems */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Skin and Hair Problems
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "acne", label: "Acne" },
                  { key: "eczema", label: "Eczema" },
                  { key: "shingles", label: "Shingles" },
                  { key: "psoriasis", label: "Psoriasis" },
                  { key: "hairLoss", label: "Hair loss" },
                  { key: "cellulite", label: "Cellulite" },
                  { key: "itching", label: "Itching" },
                ].map((problem) => (
                  <div key={problem.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {problem.label}
                    </label>
                    <select
                      name={`skinHairProblems.${problem.key}`}
                      value={
                        formData.skinHairProblems[
                          problem.key as keyof typeof formData.skinHairProblems
                        ]
                      }
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="I don't have">I don&apos;t have</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Musculoskeletal Symptoms */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Musculoskeletal Symptoms
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "neckMuscleSpasm", label: "Neck Muscle Spasm" },
                  { key: "jointPain", label: "Pain in joints" },
                  { key: "nervousHeadache", label: "Nervous Headache" },
                  { key: "chestTightness", label: "Chest tightness" },
                  { key: "legFootCramps", label: "Leg, foot cramps" },
                ].map((symptom) => (
                  <div key={symptom.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {symptom.label}
                    </label>
                    <select
                      name={`musculoskeletalSymptoms.${symptom.key}`}
                      value={
                        formData.musculoskeletalSymptoms[
                          symptom.key as keyof typeof formData.musculoskeletalSymptoms
                        ]
                      }
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="I don't have">I don&apos;t have</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Mental and Nervous Diseases */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Mental and Nervous Diseases
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "anxietyFear", label: "Anxiety/fear" },
                  { key: "faintingSweating", label: "Fainting/sweating" },
                  { key: "depression", label: "Depression" },
                  {
                    key: "concentrationDifficulty",
                    label: "Concentration difficulty",
                  },
                  { key: "balanceDifficulty", label: "Balance difficulty" },
                  { key: "thinkingDifficulty", label: "Thinking difficulty" },
                  {
                    key: "judgmentDifficulty",
                    label: "Reaching judgment difficulty",
                  },
                  { key: "speakingDifficulty", label: "Speaking difficulty" },
                  { key: "memoryDifficulty", label: "Difficulty remembering" },
                ].map((disease) => (
                  <div key={disease.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {disease.label}
                    </label>
                    <select
                      name={`mentalNervousDiseases.${disease.key}`}
                      value={
                        formData.mentalNervousDiseases[
                          disease.key as keyof typeof formData.mentalNervousDiseases
                        ]
                      }
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="I don't have">I don&apos;t have</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Cardiovascular Symptoms */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Cardiovascular Symptoms
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "chestPain", label: "Chest Pain" },
                  { key: "shortnessOfBreath", label: "Shortness of breath" },
                  { key: "heartAttackHistory", label: "Heart Attack history" },
                  { key: "heartMurmur", label: "Heart Murmur" },
                  { key: "hypertension", label: "Hypertension" },
                  { key: "irregularPulse", label: "Irregular Pulse" },
                  {
                    key: "mitralValveProlapse",
                    label: "Mitral Valve Prolapse",
                  },
                  { key: "palpitation", label: "Palpitation" },
                  {
                    key: "vascularInflammation",
                    label: "Vascular Inflammation",
                  },
                  { key: "swollenAnklesFeet", label: "Swollen Ankles/Feet" },
                  {
                    key: "varicoseVeinDisease",
                    label: "Varicose vein disease",
                  },
                ].map((symptom) => (
                  <div key={symptom.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {symptom.label}
                    </label>
                    <select
                      name={`cardiovascularSymptoms.${symptom.key}`}
                      value={
                        formData.cardiovascularSymptoms[
                          symptom.key as keyof typeof formData.cardiovascularSymptoms
                        ]
                      }
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="I don't have">I don&apos;t have</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Digestive System Symptoms */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Symptoms Related to the Digestive System
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "analSpasms", label: "Anal Spasms" },
                  {
                    key: "lowerAbdominalBloating",
                    label: "Lower Abdominal Bloating",
                  },
                  {
                    key: "wholeAbdominalBloating",
                    label: "Whole Abdominal Bloating",
                  },
                  {
                    key: "bloatingAfterEating",
                    label: "Bloating after eating",
                  },
                  { key: "bloodInStool", label: "Blood in stool" },
                  { key: "burping", label: "Burping" },
                  { key: "constipation", label: "Constipation" },
                  {
                    key: "toothChewingProblems",
                    label: "Tooth/Chewing Problems",
                  },
                  { key: "diarrhea", label: "Diarrhea" },
                  { key: "nausea", label: "Nausea" },
                  { key: "gas", label: "Gas" },
                  { key: "reflux", label: "Reflux" },
                  { key: "heartburn", label: "Heartburn" },
                  { key: "hemorrhoids", label: "Hemorrhoids" },
                ].map((symptom) => (
                  <div key={symptom.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {symptom.label}
                    </label>
                    <select
                      name={`digestiveSymptoms.${symptom.key}`}
                      value={
                        formData.digestiveSymptoms[
                          symptom.key as keyof typeof formData.digestiveSymptoms
                        ]
                      }
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="I don't have">I don&apos;t have</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Intolerances */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Food Intolerances
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "lactoseIntolerance", label: "Lactose Intolerance" },
                  {
                    key: "allDairyProductsIntolerance",
                    label: "All Dairy Products Intolerance",
                  },
                  {
                    key: "glutenMeatIntolerance",
                    label: "Gluten (Meat) Intolerance",
                  },
                  { key: "cornIntolerance", label: "Corn Intolerance" },
                  { key: "eggIntolerance", label: "Egg Intolerance" },
                  {
                    key: "intoleranceToFattyFoods",
                    label: "Intolerance to Fatty Foods",
                  },
                  { key: "yeastIntolerance", label: "Yeast Intolerance" },
                  {
                    key: "liverDiseaseJaundice",
                    label: "Liver Disease/Jaundice",
                  },
                  { key: "stomachAche", label: "Stomach ache" },
                  { key: "mucusInStool", label: "Mucus in the stool" },
                ].map((intolerance) => (
                  <div key={intolerance.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {intolerance.label}
                    </label>
                    <select
                      name={`foodIntolerances.${intolerance.key}`}
                      value={
                        formData.foodIntolerances[
                          intolerance.key as keyof typeof formData.foodIntolerances
                        ]
                      }
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="I don't have">I don&apos;t have</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Desired Blood Tests */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Desired Blood Tests
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  {
                    key: "bloodSugarInsulin",
                    label: "Blood sugar and insulin",
                  },
                  { key: "fe", label: "Fe" },
                  { key: "alt", label: "ALT" },
                  { key: "uibc", label: "UIBC" },
                  { key: "ast", label: "AST" },
                  { key: "ferritin", label: "Ferritin" },
                  { key: "ggt", label: "GGT" },
                  { key: "vitaminD25Hydroxy", label: "25-Hydroxy Vitamin D" },
                  { key: "sedimentationRate", label: "Sedimentation rate" },
                  { key: "homaIR", label: "HOMA-IR" },
                  { key: "cholesterol", label: "Cholesterol" },
                  { key: "cholesterolHDL", label: "Cholesterol-HDL" },
                  { key: "cholesterolLDL", label: "Cholesterol-LDL" },
                  { key: "uricAcid", label: "Uric acid" },
                  { key: "creatine", label: "Creatine" },
                  { key: "glucose", label: "Glucose" },
                  { key: "hbA1c", label: "HbA1c" },
                  { key: "triglyceride", label: "Triglyceride" },
                  { key: "b12", label: "B12" },
                  { key: "urea", label: "Urea" },
                  { key: "hemogram", label: "Hemogram" },
                  { key: "homocysteine", label: "Homocysteine" },
                  { key: "tsh", label: "TSH" },
                  { key: "totalProtein", label: "Total Protein" },
                  { key: "ft3", label: "FT3" },
                  { key: "albumin", label: "Albumin" },
                  { key: "ft4", label: "FT4" },
                  { key: "globulin", label: "Globulin" },
                  { key: "sodium", label: "Sodium" },
                  { key: "chloride", label: "Chloride" },
                  { key: "potassium", label: "Potassium" },
                ].map((test) => (
                  <label key={test.key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`desiredBloodTests.${test.key}`}
                      checked={
                        formData.desiredBloodTests[
                          test.key as keyof typeof formData.desiredBloodTests
                        ]
                      }
                      onChange={handleInputChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{test.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Imaging Tests */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Imaging Tests
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    key: "abdominalUltrasonography",
                    label: "Abdominal Ultrasonography",
                  },
                  {
                    key: "thyroidUltrasonography",
                    label: "Thyroid Ultrasonography",
                  },
                  { key: "fullUrine", label: "Full Urine" },
                ].map((test) => (
                  <label key={test.key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`imagingTests.${test.key}`}
                      checked={
                        formData.imagingTests[
                          test.key as keyof typeof formData.imagingTests
                        ]
                      }
                      onChange={handleInputChange}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{test.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sleep Schedule */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Sleep Schedule
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What time do you wake up in the morning?
                  </label>
                  <Input
                    name="sleepSchedule.wakeUpTime"
                    type="time"
                    value={formData.sleepSchedule.wakeUpTime}
                    onChange={handleInputChange}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What time do you have breakfast?
                  </label>
                  <Input
                    name="sleepSchedule.breakfastTime"
                    type="time"
                    value={formData.sleepSchedule.breakfastTime}
                    onChange={handleInputChange}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What time do you sleep at night?
                  </label>
                  <Input
                    name="sleepSchedule.sleepTime"
                    type="time"
                    value={formData.sleepSchedule.sleepTime}
                    onChange={handleInputChange}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Kit Code */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Kit Information
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kit Code
                </label>
                <Input
                  name="kitCode"
                  value={formData.kitCode}
                  onChange={handleInputChange}
                  className="rounded-lg"
                  placeholder="Enter your kit code"
                />
              </div>
            </div>

            {/* Consent and Agreements */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Consent and Agreements
              </h4>
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="consent.informationCorrect"
                    checked={formData.consent.informationCorrect}
                    onChange={handleInputChange}
                    className="text-blue-600 mt-1"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I hereby certify that the information I have provided above
                    is correct.
                  </span>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="consent.shareInformation"
                    checked={formData.consent.shareInformation}
                    onChange={handleInputChange}
                    className="text-blue-600 mt-1"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I agree to share the above information with Epigenetic
                    Coaching (MRL Medical Tourism Marketing and Consulting LTD)
                    with my own consent.
                  </span>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="consent.termsAndConditions"
                    checked={formData.consent.termsAndConditions}
                    onChange={handleInputChange}
                    className="text-blue-600 mt-1"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I have read and approved the terms and conditions of MRL
                    Medical Tourism Marketing and Consulting LTD.
                  </span>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="consent.orderForm"
                    checked={formData.consent.orderForm}
                    onChange={handleInputChange}
                    className="text-blue-600 mt-1"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I have read and approved the order form.
                  </span>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="consent.dataProtectionPolicy"
                    checked={formData.consent.dataProtectionPolicy}
                    onChange={handleInputChange}
                    className="text-blue-600 mt-1"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I have read and approved the Data Protection Policy.
                  </span>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="consent.nutrigeneticForm"
                    checked={formData.consent.nutrigeneticForm}
                    onChange={handleInputChange}
                    className="text-blue-600 mt-1"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I have read and approved the Nutrigenetic and Epigenetic
                    Consulting Form.
                  </span>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 py-3 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold"
              >
                Submit Consultation Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
