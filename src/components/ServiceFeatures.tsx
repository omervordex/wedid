"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceFeatureProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceFeature: React.FC<ServiceFeatureProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="mb-4">
        <Image src={icon} alt={title} width={64} height={64} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default function ServiceFeatures() {
  const features = [
    {
      icon: "/consultation-icon.svg",
      title: "KONSÜLTASYON",
      description:
        "Dünya çapında doktorlar, diyetisyenler, fizyoterapistler, psikologlar ve moleküler biyologlarla konsültasyon hizmetleri sunuyoruz.",
    },
    {
      icon: "/genetic-test-icon.svg",
      title: "GENETİK TEST",
      description:
        "Hastalıklar, şikayetler ve uzun ömür için özel olarak tasarlanmış test panelleri, formlarımıza verdiğiniz cevaplara göre hazırlanır.",
    },
    {
      icon: "/training-icon.svg",
      title: "EĞİTİM",
      description:
        "Epigenetik koçluk eğitimi alanlar, kendilerini akademik olarak geliştirme ve araştırma ekibimize katılma fırsatına sahiptir.",
    },
    {
      icon: "/research-icon.svg",
      title: "ARAŞTIRMA",
      description:
        "Nutrijenetik ve Epigenetik eğitim programımızı tamamlayan herkes, araştırma projelerimizde bizimle çalışma şansına sahiptir.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ServiceFeature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
