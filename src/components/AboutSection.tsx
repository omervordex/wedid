"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Who We Are Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h2 className="text-4xl font-bold text-purple-600 mb-6 text-center md:text-left">
              KİMİZ BİZ?
            </h2>
            <p className="text-gray-700 mb-4">
              Amacımız, belirlediğimiz beslenme ve yaşam tarzına göre size özel
              bir hizmet sunmaktır. Genetik test sonuçlarınızı size uyguladık ve
              bu, moleküler refahınız için tanımlanmıştır.
            </p>
            <p className="text-gray-700">
              Özel bir değerlendirme, ekibimiz tarafından sizi benzersiz kılan
              özelliklere uygun olarak yapılır.
            </p>

            <div className="mt-6 flex items-center justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors"
              >
                Daha Fazla Bilgi
              </motion.button>
            </div>
          </motion.div>

          {/* Our Difference Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <h2 className="text-4xl font-bold text-purple-600 mb-6 text-center md:text-left">
              FARKIMIZ
            </h2>
            <p className="text-gray-700 mb-4">
              Genetik testlerinizden sonra, 200 kişilik profesyonel bir ekiple
              size hizmet veriyoruz. Ekibimiz, nutrijenetik ve epigenetik
              eğitimi almış doktorlar, diyetisyenler, moleküler biyologlar,
              psikoterapistler ve psikologlardan oluşmaktadır.
            </p>
            <p className="text-gray-700">
              Alanlarında uzman olan bu profesyoneller, sağlığınız için en iyi
              sonuçları elde etmenize yardımcı olacaktır.
            </p>

            <div className="mt-6 flex items-center justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors"
              >
                Ekibimizle Tanışın
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
