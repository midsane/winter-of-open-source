"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import mainImg from "@/public/images/design-mode/Gemini_Generated_Image_fwaiiofwaiiofwai.png"
import { Navbar } from "./navbar";
import { avatarImages } from "./Leaderboard";
const mainImageUrl = mainImg ? (mainImg as any).src : "https://via.placeholder.com/600x600?text=Your+Image+Here"; // Fallback placeholder


type LandingPageContentProps = {
  dailyVolumeLabel?: string;
  headline?: string;
  subheadline?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
};

export const LandingPageContent = (props: LandingPageContentProps) => {
  const {
    dailyVolumeLabel = "CodeIIEST",
    headline = "Winter of Open Source",
    subheadline = "This winter, contribute to open source projects on GitHub to earn points and feature on our college leaderboard.",
    primaryButtonText = "Leaderboards",
    primaryButtonHref = "/leaderboard",
    secondaryButtonText = "Register Now",
    secondaryButtonHref = "/register",
  } = props;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0c0c0d] via-[#121218] to-[#0d0e10] text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-800/20 blur-[150px] rounded-full pointer-events-none z-0" />

      <Navbar />

      <div className="relative pt-12 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1], delay: 0.2 }}
          className="flex flex-col text-center lg:text-left relative z-20"
        >
          {/* "128% Collected" Bubble */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="inline-flex items-center bg-blue-700/30 text-blue-200 text-xs sm:text-sm font-medium px-3 py-1 rounded-full mb-4 self-center lg:self-start border border-blue-600/50 shadow-md"
          >
            <span role="img" aria-label="fire" className="mr-1">🔥</span>for IIEST Shibpur's students
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter text-white mb-6 animate-text-gradient">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8">
            {subheadline}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.a
              href={primaryButtonHref}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 text-base sm:text-lg"
            >
              {primaryButtonText} <ArrowUpRight className="ml-2 w-5 h-5" />
            </motion.a>
            <motion.a
              href={secondaryButtonHref}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 text-base sm:text-lg"
            >
              {secondaryButtonText}
            </motion.a>
          </div>
        </motion.div>

        {/* RIGHT SIDE: ABSTRACT WAVES / VISUALS */}
        <div className="relative w-full aspect-square lg:aspect-[unset] lg:h-[600px] flex items-center justify-center overflow-hidden z-10">
          {/* Main wave structure - using multiple divs for layering effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Largest Wave - Deepest Blue */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="absolute w-full h-full rounded-full bg-gradient-to-br from-blue-900/60 to-purple-900/60 blur-3xl"
              style={{
                transform: 'scale(1.5) translateY(10%) translateX(20%)',
                maskImage: 'radial-gradient(circle at 60% 50%, black 60%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle at 60% 50%, black 60%, transparent 100%)'
              }}
            />
            {/* Mid Wave - Lighter Blue */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              className="absolute w-full h-full rounded-full bg-gradient-to-br from-blue-700/60 to-purple-700/60 blur-2xl"
              style={{
                transform: 'scale(1.3) translateY(-10%) translateX(-10%)',
                maskImage: 'radial-gradient(circle at 40% 55%, black 60%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle at 40% 55%, black 60%, transparent 100%)'
              }}
            />
            
            {/* --- CENTRAL IMAGE --- */}
           {/* --- CENTRAL IMAGE --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                className="absolute w-[90%] h-[90%] rounded-full overflow-hidden z-10"
            >
                <img
                    src={mainImageUrl} // Use the resolved image URL
                    alt="Main visual for CodeIIEST"
                    className="w-full h-full object-cover" // Ensure it covers the circular div
                />
            </motion.div>

            {/* Top Wave - Brightest Blue */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
              className="absolute w-full h-full rounded-full bg-gradient-to-br from-blue-500/70 to-blue-700/70 blur-xl"
              style={{
                transform: 'scale(1.1) translateY(-20%) translateX(5%)',
                maskImage: 'radial-gradient(circle at 50% 60%, black 60%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle at 50% 60%, black 60%, transparent 100%)'
              }}
            />
          </div>

          {/* Coral-like element - Using CSS for a placeholder shape */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.2 }}
            className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-500 to-red-600 rounded-full blur-sm opacity-70"
            style={{
              clipPath: 'polygon(50% 0%, 100% 30%, 80% 100%, 20% 100%, 0% 30%)'
            }}
          />

          {/* Donation/Impact Card Placeholder (similar to Image 2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="absolute top-1/4 right-1/4 translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl flex items-center gap-3 text-gray-100 z-20"
          >
            <div className="w-12 h-12 rounded-full bg-purple-500 overflow-hidden">
              <img src={avatarImages[5]} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold">midsane</p>
              <p className="text-xs text-white">Achieved a milestone!</p>
            </div>
            <Trophy size={20} className="text-yellow-400" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};