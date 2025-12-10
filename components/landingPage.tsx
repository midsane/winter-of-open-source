"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const mainVideoUrl = "/videos/landingPageVideo.mp4";
import handImg from "@/public/images/hand.png"
import { Button2 } from "./button";
import Link from "next/link";

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
    headline = "Winter of Open Source",
    subheadline = "This winter, contribute to open source projects on GitHub to earn points and feature on our college leaderboard.",
    primaryButtonText = "Leaderboards",
    primaryButtonHref = "/leaderboard",
    secondaryButtonText = "Register Now",
    secondaryButtonHref = "/register",
  } = props;

  return (
    <div className="relative py-5 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      <motion.div
        className="flex flex-col text-center lg:text-left relative z-20"
      >

        <motion.div

          className="inline-flex items-center bg-blue-700/30 text-blue-200 text-xs sm:text-sm font-medium px-3 py-1 rounded-full mb-4 self-center lg:self-start border border-blue-600/50 shadow-md"
        >
          <span role="img" aria-label="fire" className="mr-1">🔥</span>
          for IIEST Shibpur's students
        </motion.div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight 
          bg-gradient-to-r from-[#d1fe17] via-[#ffe500] to-[#53c546]
          text-transparent bg-clip-text">
          {headline}
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8">
          {subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
            href={primaryButtonHref}
          >
            <div
              className="inline-flex min-w-56 items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700
             text-white font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 text-base sm:text-lg"
            >
              {primaryButtonText}
              <ArrowUpRight className="ml-2 w-5 h-5" />
            </div>
          </Link>

          <Link href={secondaryButtonHref}>
            <div
              className="inline-flex min-w-56 items-center justify-center px-8 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 text-base sm:text-lg"
            >
              {secondaryButtonText}
            </div>
          </Link>
        </div>
      </motion.div>

      <div className="relative w-full aspect-square lg:h-[600px] flex items-center justify-center overflow-visible z-10">
        <div className="relative w-[90%] h-[90%] rounded-full flex items-center justify-center">
          <div className="w-full h-full border-2 border-blue-400 rounded-full overflow-hidden z-20">
            <video
              src={mainVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

          </div>
          <div
            className="
              fixed -bottom-14 scale-75 z-[1000]
              [@media(min-width:560px)]:absolute
              [@media(min-width:560px)]:-bottom-5
              [@media(min-width:560px)]:scale-100
            "
          >
            <Button2 text='Checkout out the Repos' link='/repos' />
            <Image width={250} src={handImg} alt='hand' />
          </div>

        </div>
      </div>
    </div>
  );
};
