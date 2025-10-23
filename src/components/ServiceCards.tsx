"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ConsultationForm from "./ConsultationForm";
import GastrointestinalForm from "./GastrointestinalForm";
import PharmacogeneticForm from "./PharmacogeneticForm";
import ThreeDayFoodForm from "./ThreeDayFoodForm";

const ServiceCard = ({
  title,
  onClick,
  fallbackType,
}: {
  title: string;
  href: string;
  onClick?: () => void;
  fallbackType?: string;
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Fallback icon component with different icons based on service type
  const FallbackIcon = () => {
    const getFallbackIcon = () => {
      switch (fallbackType) {
        case "dna":
          return (
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          );
        case "stomach":
          return (
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          );
        case "medical":
          return (
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2z" />
            </svg>
          );
        case "food":
          return (
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
            </svg>
          );
        default:
          return (
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          );
      }
    };

    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-blue-200 rounded-full">
        {getFallbackIcon()}
      </div>
    );
  };

  return (
    <div onClick={handleClick} className="cursor-pointer group">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center h-full transition-all duration-300 group-hover:shadow-2xl border border-gray-100 group-hover:border-blue-200"
      >
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
          <FallbackIcon />
        </div>
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight group-hover:text-blue-700 transition-colors duration-300">
          {title}
        </h3>
        <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.div>
    </div>
  );
};

export default function ServiceCards() {
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);
  const [isGastrointestinalFormOpen, setIsGastrointestinalFormOpen] =
    useState(false);
  const [isPharmacogeneticFormOpen, setIsPharmacogeneticFormOpen] =
    useState(false);
  const [isThreeDayFoodFormOpen, setIsThreeDayFoodFormOpen] = useState(false);

  const services = [
    {
      title: "Nutrigenetics & Epigenetics Consultation",
      href: "/patient/order-kit",
      isConsultation: true,
      fallbackType: "dna",
    },
    {
      title: "Gastrointestinal System Form",
      href: "/patient/order-kit",
      isConsultation: false,
      isGastrointestinal: true,
      fallbackType: "stomach",
    },
    {
      title: "Pharmacogenetic (PGx) Test Information",
      href: "/patient/order-kit",
      isConsultation: false,
      isPharmacogenetic: true,
      fallbackType: "medical",
    },
    {
      title: "Three-Day Food Consumption Form",
      href: "/patient/order-kit",
      isConsultation: false,
      isThreeDayFood: true,
      fallbackType: "food",
    },
  ];

  const handleConsultationClick = () => {
    setIsConsultationFormOpen(true);
  };

  const handleGastrointestinalClick = () => {
    setIsGastrointestinalFormOpen(true);
  };

  const handlePharmacogeneticClick = () => {
    setIsPharmacogeneticFormOpen(true);
  };

  const handleThreeDayFoodClick = () => {
    setIsThreeDayFoodFormOpen(true);
  };

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4">
              <span className="text-blue-600">Health</span>{" "}
              <span className="text-black">Assessment Forms</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Complete our comprehensive health assessment forms to receive
              personalized recommendations
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                href={service.href}
                fallbackType={service.fallbackType}
                onClick={
                  service.isConsultation
                    ? handleConsultationClick
                    : service.isGastrointestinal
                    ? handleGastrointestinalClick
                    : service.isPharmacogenetic
                    ? handlePharmacogeneticClick
                    : service.isThreeDayFood
                    ? handleThreeDayFoodClick
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>

      <ConsultationForm
        isOpen={isConsultationFormOpen}
        onClose={() => setIsConsultationFormOpen(false)}
      />

      <GastrointestinalForm
        isOpen={isGastrointestinalFormOpen}
        onClose={() => setIsGastrointestinalFormOpen(false)}
      />

      <PharmacogeneticForm
        isOpen={isPharmacogeneticFormOpen}
        onClose={() => setIsPharmacogeneticFormOpen(false)}
      />

      <ThreeDayFoodForm
        isOpen={isThreeDayFoodFormOpen}
        onClose={() => setIsThreeDayFoodFormOpen(false)}
      />
    </>
  );
}
