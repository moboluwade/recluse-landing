"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import BackgroundGrid from "../components/background-grid";

export default function CommunityComingSoon() {
  const [memberCount, setMemberCount] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setMemberCount((prev) => prev + Math.floor(Math.random() * 10));
    }, 5000);

    return () => clearInterval(interval);
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
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="inline-block mb-8"
        >
          <Users size={64} className="recluse-primary" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Community Launch Imminent!
        </h1>
        <p className="text-xl md:text-2xl text-[#C7D2D5] mb-8">
          Our AI is learning to be social. It&apos;s only a matter of time!
        </p>
        <div className="flex items-center justify-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <Zap className="recluse-primary mr-2" />
          </motion.div>
          <span className="text-lg">
            <strong>{memberCount}</strong> future members eagerly waiting
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
