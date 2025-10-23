"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope, Users, Award, ChevronRight, X } from "lucide-react";
import { useState } from "react";

// Sample team data - you can replace with real data
const manager = {
  id: 1,
  name: "Gülsen Meral",
  role: "Assoc. Prof.",
  specialization: "Leadership & Medical Innovation",
  image: "/ddt6.png", // Using existing image
  bio: "Assoc. Prof. Gülsen Meral is a visionary leader in digital healthcare with extensive experience in medical innovation and leadership. She leads our team with the mission to make quality healthcare accessible to everyone through innovative technology.",
  credentials: [
    "Associate Professor",
    "Medical Leadership Excellence",
    "Digital Health Innovation Certificate",
    "15+ Years Clinical Experience",
  ],
  contact: {
    email: "gulsen.meral@onlineclinic.com",
    phone: "+1 (555) 123-4567",
    linkedin: "gulsen-meral-md",
  },
};

const doctors = [
  {
    id: 1,
    name: "Gülsen Meral",
    role: "Assoc. Prof.",
    specialization: "Leadership & Medical Innovation",
    image: "/ddt6.png",
    experience: "15 Years",
    patients: "3,000+",
    rating: 5.0,
    detailedBio:
      "Associate Professor Gulsen Meral graduated from Istanbul University Cerrahpaşa School of Medicine in 1994. She became a specialist in paediatrics in 2001. She is Associate Professor in Pediatrics and worked as a specialist as well as deputy chief physician and chief physician at several hospitals. She was the Rector's advisor between 2019-2021 at the Northern Cyprus ITU. She is also an Acupuncture instructor. She worked as a Nutrigenetics graduate course and lecturer and gave undergraduate and graduate courses on child development. She has many national and international publications, and worked on editorial boards and as reviewers. She has a Master's Degree in Hospital Management. She has a Turkish language literature undergraduate education. She completed PhD program in Medical Genetics. In addition to her scientific achievements, she is ambitious about poetry and has 5 poetry books. She is also author of \"Dancing with Genes - Dna is not your destiny - Getting older without ageing - Your Genetic Code and Epigenetics\" book. She is the Founder of the Nutrigenetics and Epigenetics Association, and has memberships in the Green Crescent and Rumelia Association, Istanbul Acupuncture Association, and International Society of Nutrigenetics & Nutrigenomics. She participated in the first and second International Epigenetic Congress as the president. She is still the organizer and educator of the Epigenetic Coaching Program. She is actively giving trainings on Nutrigenetic & Epigenetic Counselling to health professionals from all over the World as a certified CPD program. She continues research and training as the founder and manager of Epigenetic Coaching.",
  },
  {
    id: 2,
    name: "Savaş Gür",
    role: "Doctor",
    specialization: "Medical Specialist",
    image: "/ddt2.png",
    experience: "8 Years",
    patients: "1,500+",
    rating: 4.8,
    detailedBio:
      "Specialist Dr. Savaş Gür is an Internal Medicine Specialist (Internist) dedicated to diagnosing, treating, and managing a wide range of internal diseases, including metabolic disorders, febrile illnesses, kidney diseases, digestive system disorders, infectious diseases, liver diseases, rheumatic conditions, hematological disorders, diabetes, thyroid disorders (goiter), and circulatory system diseases. In addition to conventional medical treatments, Dr. Gür integrates pharmacogenetics into his practice, utilizing personalized medicine approaches to optimize patient care. He is particularly interested in the relationship between nutrigenetics, epigenetics, and internal medicine, helping his patients understand how their genetic and epigenetic profiles influence their health and treatment responses. Dr. Gür is also a faculty member in the Epigenetic Coaching training program, where he actively educates professionals on epigenetics-based health management and personalized interventions. With extensive experience in both public and private healthcare institutions, he has worked at Çanakkale Onsekiz Mart University Hospital (2009-2013), Çanakkale Ayvacık State Hospital (2015-2016), and Private Çanakkale Anadolu Hospital (2016-Present). Currently, he runs his own private clinic in Çanakkale, where he provides comprehensive internal medicine services, integrating nutrigenetics, epigenetics, and pharmacogenetics into modern medical practice.",
  },
  {
    id: 3,
    name: "Yunus Alp",
    role: "Dr. Medical Geneticist",
    specialization: "Genetic Medicine & Research",
    image: "/ddt3.png",
    experience: "10 Years",
    patients: "2,200+",
    rating: 4.9,
    detailedBio:
      "Dr. Muhammed Yunus Alp, M.D. is a specialist in Medical Genetics, dedicated to advancing personalized and precision medicine through his extensive expertise in cancer genetics, pharmacogenetics, and nutrigenetics. Born in 1982 in İskenderun, Dr. Alp completed his primary and secondary education in Dörtyol before earning his medical degree from Ankara University Faculty of Medicine in 2007. He then specialized in Medical Genetics at Karadeniz Technical University Faculty of Medicine, obtaining his Medical Genetics Specialist title in 2012. Throughout his career, Dr. Alp has served as a Medical Genetics Specialist at KTÜ Faculty of Medicine Farabi Hospital, Bursa Ali Osman Sönmez Oncology Hospital, and Ankara Dışkapı Yıldırım Beyazıt Training and Research Hospital. Additionally, he has contributed significantly to research on rare diseases at the Aziz Sancar Stem Cell and Genomics Research Center. Currently working at Genoks Genetic Diseases Evaluation Center, Dr. Alp focuses on genetic research and clinical applications in areas such as cancer genetics, hereditary diseases, and prenatal diagnostics. His key areas of interest also include cancer genetics (lung, breast, colon, prostate), neuromuscular disorders (SMA, DMD, Fragile X), autoinflammatory and metabolic diseases (FMF, mitochondrial disorders), prenatal diagnostics (NIPT, WES), and sports genetics. Dr. Alp is dedicated to leveraging genetic insights for personalized treatment strategies and disease prevention.",
  },
  {
    id: 4,
    name: "Zübeyde Gündüz",
    role: "Prof. Dr.",
    specialization: "Professor of Medicine",
    image: "/ddt4.png",
    experience: "15 Years",
    patients: "3,500+",
    rating: 5.0,
    detailedBio:
      "Prof. Dr. Zübeyde GÜNDÜZ is a highly esteemed pediatric specialist with expertise in pediatric rheumatology, pediatric nephrology, and child health and diseases. She has dedicated her career to advancing pediatric medicine through clinical practice, research, and education. She earned her medical degree from Anadolu University Faculty of Medicine in 1985 and went on to specialize in Pediatrics at Erciyes University Faculty of Medicine in 1991. Furthering her expertise, she completed her pediatric nephrology training in 2001 and later obtained a subspecialty certification in pediatric rheumatology from the Board of Medical Specialties in 2011. Since 2023, she has been part of the Acıbadem Healthcare Group, where she continues her work in pediatric medicine. Throughout her career, Prof. Dr. Gündüz has been involved in numerous scientific research projects, clinical studies, and publications in pediatric rheumatology, nephrology, and child health. She has authored many scientific papers in national and international journals, contributing significantly to medical literature. Her research focuses on improving diagnostic and treatment approaches for pediatric autoimmune, inflammatory, and kidney-related diseases. With a career spanning decades in both clinical and academic settings, Prof. Dr. Zübeyde Gündüz remains a leading figure in pediatric medicine, shaping the future of child healthcare through her expertise, research, and dedication.",
  },
  {
    id: 5,
    name: "Neval Burkay",
    role: "Dietitian",
    specialization: "Nutrition & Dietary Health",
    image: "/ddt5.png",
    experience: "7 Years",
    patients: "1,800+",
    rating: 4.7,
    detailedBio:
      'Neval Burkay graduated with High Honors from the Department of Nutrition and Dietetics in June 2023. Her academic journey was deeply influenced by her certification in Epigenetic Coaching, which led to her active involvement with the Epigenetic Coaching team. Driven by a strong passion for Epigenetics and Nutrigenetics, she has chosen to further her studies with a Master\'s degree in this specialized field. Currently, She works as a trainer within the Epigenetic Coaching team, delivering lectures on fundamental topics such as "Methylation Cycles" and "Nutrigenetics." She is actively engaged in research and development for personalized health reports and provides epigenetic-based dietary counseling, integrating cutting-edge nutritional science with epigenetic insights. Her contributions to the Epigenetics and Nutrigenetics Organization extend beyond research; she played a key role in the organizing committee of the 2nd International Congress on Epigenetics (September 2023). She recently started her Master\'s program in Nutrition and Dietetics at Mediterranean University, aiming to deepen her expertise in this ever-evolving field. With a strong scientific foundation and a commitment to personalized health solutions, she remains dedicated to advancing the role of epigenetics in nutrition and well-being.',
  },
  {
    id: 6,
    name: "Aslıhan Özkur",
    role: "Dt.",
    specialization: "Dental Health Specialist",
    image: "/ddt1.png",
    experience: "6 Years",
    patients: "1,200+",
    rating: 4.6,
    detailedBio:
      "She graduated from Gazi University, Faculty of Economics and Administrative Sciences - Department of Economics and Banking in 1996. After working as an inspector in a private bank, she worked as a Branch Manager. After graduating from İstinye University Department of Nutrition and Dietetics and continuing for 1 year, she transferred to Üsküdar University Department of Nutrition and Dietetics and graduated from there. During her undergraduate education, she attended many seminars and conferences. She completed compulsory internships in public and private hospitals, private clinics and institutions providing mass nutrition. The subject of undergraduate thesis is Evaluation of the Relationship between Stress and Depression Levels, Health Anxiety and Nutrition in Bank Personnel. Phytotherapy, Functional Nutrition and Epigenetic coaching are among the trainings she received. She currently provides nutrition consultancy services in her office located in Istanbul Metropol mall.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Define the doctor type
type Doctor = {
  id: number;
  name: string;
  role: string;
  specialization: string;
  image: string;
  experience: string;
  patients: string;
  rating: number;
  detailedBio: string;
};

export default function TeamPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const openModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 xl:py-32 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-white">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-16 sm:w-32 h-16 sm:h-32 bg-blue-400 rounded-full opacity-10 animate-float"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-12 sm:w-24 h-12 sm:h-24 bg-blue-600 rounded-full opacity-15 animate-float animate-delay-400"></div>
          <div className="absolute top-1/2 left-1/3 w-8 sm:w-16 h-8 sm:h-16 bg-blue-300 rounded-full opacity-10 animate-rotate-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-2 sm:mr-3" />
              <span className="text-blue-600 font-semibold text-base sm:text-lg">
                Our Team
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
              Meet Our Expert
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 block">
                Medical Team
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our world-class medical professionals are dedicated to providing
              you with the highest quality healthcare through innovative digital
              solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Manager Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 mb-3 sm:mb-4">
                Leadership
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Meet the visionary leader behind our digital healthcare
                revolution
              </p>
            </div>

            <Card className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 xl:p-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div className="relative order-first lg:order-first">
                  <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl blur-xl opacity-20"></div>
                    <Image
                      src={manager.image}
                      alt={manager.name}
                      width={400}
                      height={500}
                      className="relative w-full h-auto rounded-2xl shadow-2xl object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-blue-600 text-white p-2 sm:p-3 rounded-full shadow-lg">
                      <Award className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6 order-last lg:order-last">
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                      {manager.name}
                    </h3>
                    <p className="text-lg sm:text-xl text-blue-600 font-semibold mb-2">
                      {manager.role}
                    </p>
                    <p className="text-base sm:text-lg text-slate-600 mb-4">
                      {manager.specialization}
                    </p>
                  </div>

                  <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                    {manager.bio}
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg font-semibold text-slate-900">
                      Credentials:
                    </h4>
                    <ul className="space-y-2">
                      {manager.credentials.map((credential, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm sm:text-base text-slate-700"
                        >
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mr-2 flex-shrink-0" />
                          {credential}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 mb-3 sm:mb-4">
              Our Specialist Doctors
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto relative z-10">
              Meet our team of experienced specialists who are ready to provide
              you with personalized care and expert medical advice.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {doctors.map((doctor) => (
              <motion.div
                key={doctor.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full p-4 sm:p-6 shadow-lg border-0 bg-gradient-to-br from-white via-blue-50/30 to-slate-50/30 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 group-hover:border-blue-200 group-hover:from-blue-50/50 group-hover:to-slate-50/50">
                  <div className="relative mb-4 sm:mb-6">
                    <div className="relative w-full aspect-square max-w-xs mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        width={300}
                        height={300}
                        className="relative w-full h-full rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1.5 sm:p-2 shadow-lg">
                      <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                  </div>

                  <div className="text-center space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-blue-600 font-semibold mb-2 text-sm sm:text-base">
                        {doctor.role}
                      </p>
                      <p className="text-slate-600 text-xs sm:text-sm">
                        {doctor.specialization}
                      </p>
                    </div>

                    <Button
                      onClick={() => openModal(doctor)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white group-hover:scale-105 transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl"
                    >
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 xl:p-16 text-white relative overflow-hidden"
          >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-10 sm:w-20 h-10 sm:h-20 bg-white rounded-full opacity-10 animate-float"></div>
              <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-8 sm:w-16 h-8 sm:h-16 bg-white rounded-full opacity-10 animate-float animate-delay-400"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Ready to Meet Our Team?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
                Schedule a consultation with one of our expert doctors today and
                experience personalized healthcare at its finest.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
                >
                  Book Appointment
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Doctor Detail Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                    <Image
                      src={selectedDoctor.image}
                      alt={selectedDoctor.name}
                      width={96}
                      height={96}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {selectedDoctor.name}
                    </h3>
                    <p className="text-blue-600 font-semibold text-sm sm:text-base">
                      {selectedDoctor.role}
                    </p>
                    <p className="text-slate-600 text-sm">
                      {selectedDoctor.specialization}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={closeModal}
                  variant="ghost"
                  size="sm"
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {selectedDoctor.detailedBio && (
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    {selectedDoctor.detailedBio}
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={closeModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
