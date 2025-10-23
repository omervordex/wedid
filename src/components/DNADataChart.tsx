"use client";

import { motion } from "framer-motion";
import { BarChart3, PieChart, TrendingUp, Database } from "lucide-react";

export default function DNADataChart() {
  // Sample data for the chart
  const healthRisks = [
    { name: "Heart Disease", risk: 25, color: "bg-red-500" },
    { name: "Type 2 Diabetes", risk: 60, color: "bg-orange-500" },
    { name: "Alzheimer's", risk: 15, color: "bg-yellow-500" },
    { name: "Cancer", risk: 35, color: "bg-pink-500" },
    { name: "Obesity", risk: 45, color: "bg-purple-500" },
  ];

  const ancestryData = [
    { name: "European", percentage: 45, color: "bg-blue-500" },
    { name: "Asian", percentage: 30, color: "bg-green-500" },
    { name: "African", percentage: 15, color: "bg-yellow-500" },
    { name: "Native American", percentage: 10, color: "bg-red-500" },
  ];

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>

      {/* Main chart container */}
      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            DNA Analysis Dashboard
          </h3>
          <p className="text-gray-600">
            Interactive genetic insights and health data
          </p>
        </div>

        {/* Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Health Risks Chart */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h4 className="text-lg font-bold text-gray-900">
                Health Risk Analysis
              </h4>
            </div>

            <div className="space-y-4">
              {healthRisks.map((risk, index) => (
                <motion.div
                  key={risk.name}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">
                      {risk.name}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {risk.risk}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      className={`h-3 rounded-full ${risk.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${risk.risk}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ancestry Chart */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="w-6 h-6 text-blue-600" />
              <h4 className="text-lg font-bold text-gray-900">
                Ancestry Composition
              </h4>
            </div>

            <div className="space-y-4">
              {ancestryData.map((ancestry, index) => (
                <motion.div
                  key={ancestry.name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full ${ancestry.color}`}
                    ></div>
                    <span className="font-semibold text-gray-700">
                      {ancestry.name}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    {ancestry.percentage}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <motion.div
            className="text-center p-4 bg-blue-50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">99.9%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-blue-50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Database className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">700K+</div>
            <div className="text-sm text-gray-600">Markers</div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="flex items-center">
          <TrendingUp className="w-6 h-6 text-blue-500 mr-2" />
          <div>
            <div className="text-lg font-black text-gray-900">Live</div>
            <div className="text-xs text-gray-600">Updates</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      >
        <div className="flex items-center">
          <Database className="w-6 h-6 text-blue-500 mr-2" />
          <div>
            <div className="text-lg font-black text-gray-900">Real-time</div>
            <div className="text-xs text-gray-600">Analysis</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
