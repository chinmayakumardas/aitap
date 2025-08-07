
"use client";

import React, { useState } from "react";
import AuthForm from "@/components/forms/authForm";
import Preloader from "@/components/antd/Preloader";
import CutoutModal from "@/components/shared/CutoutTransition";

export default function ResponsiveHomepage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* <Preloader /> */}

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.0&auto=format&fit=crop&w=2069&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto text-white">
          <h1 className="text-2xl md:text-3xl font-bold">AdminHub</h1>

          <button
            onClick={() => setIsLoginModalOpen(true)}
            type="button"
            className="relative cursor-pointer flex items-center justify-around w-[8.5em] h-[2.9em] border-[0.2em] rounded-[11px] transition-all duration-500 ease-in-out
              bg-black text-white border-[#3654ff] hover:bg-[#3654ff]
              dark:bg-white dark:text-black dark:hover:bg-[#3654ff]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-[1.6em] ml-[0.8em] mr-[0.2em] transition-all duration-500 ease-in-out group-hover:translate-x-[5px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>

            <span className="mr-[1em] font-bold">Login</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center text-white px-4">
        <div className="text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Modern Admin Dashboard
          </h2>
          <p className="text-lg md:text-xl">
            Manage your business with powerful tools and intuitive interface.
          </p>
        </div>
      </main>

      {/* Login Modal */}
      <CutoutModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <AuthForm onClose={() => setIsLoginModalOpen(false)} />
      </CutoutModal>
    </div>
  );
}
