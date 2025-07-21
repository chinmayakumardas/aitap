

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const cutoutVariants = {
  hidden: {
    clipPath: "circle(0% at 100% 0%)",
    opacity: 0,
  },
  visible: {
    clipPath: "circle(150% at 100% 0%)",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  exit: {
    clipPath: "circle(0% at 100% 0%)",
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

export default function CutoutModal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cutout"
          variants={cutoutVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/90 text-white"
        >
          {/* Dark semi-transparent background with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute inset-0 bg-black/0 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="relative z-10 bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-black"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
