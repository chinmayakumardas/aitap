"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.from(".preloader-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    timeline.to(".preloader-container", {
      opacity: 0,
      delay: 1.5,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => setIsVisible(false),
    });
  }, []);

  if (!isVisible) return null;

  return (
    <div className="preloader-container fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white">
      <h1 className="preloader-text text-3xl md:text-5xl font-extrabold tracking-wide">
         AdminHub
      </h1>
    </div>
  );
};

export default Preloader;
