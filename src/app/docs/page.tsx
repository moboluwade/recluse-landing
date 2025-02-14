"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Book, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import BackgroundGrid from "../components/background-grid";

export default function DocsComingSoon() {
  const [loadingText, setLoadingText] = useState("Compiling knowledge");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const texts = [
          "Compiling knowledge",
          "Debugging the future",
          "Optimizing AI neurons",
          "Feeding the AI hamsters",
          "Untangling quantum spaghetti",
        ];
        const currentIndex = texts.indexOf(prev);
        return texts[(currentIndex + 1) % texts.length];
      });
    }, 3000);

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => {
      clearInterval(textInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#232325] text-white flex flex-col items-center justify-center p-4">
      <BackgroundGrid />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="inline-block mb-8"
        >
          <Book size={64} className="recluse-primary" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Docs Coming Soon!
        </h1>
        <p className="text-xl md:text-2xl text-[#C7D2D5] mb-8">
          Our AI is furiously scribbling away. Please stand by.
        </p>
        <div className="flex items-center justify-center mb-8">
          <Loader2 className="animate-spin mr-2" />
          <span className="text-lg">
            {loadingText}
            <span className="inline-block w-6">{dots}</span>
          </span>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="recluse-bg-primary text-white px-6 py-3 rounded-full inline-flex items-center hover:bg-[#b5182e] transition-colors"
          >
            <ArrowLeft className="mr-2" /> Return to Homepage
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
