"use client"

import { motion } from "framer-motion"
import { Github, Twitter } from "lucide-react"
import { useEffect, useState } from "react"
import BackgroundGrid from "./components/background-grid"
import NavBar from "./components/nav-bar"

export default function Page() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-[#232325] text-white relative overflow-hidden">
      <BackgroundGrid />
      <div className="relative z-10">
        <NavBar />
        <div className="container mx-auto px-4 pt-32 md:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block mb-2">Unleash the power of</span>
              <span className="recluse-primary">RecluseAI</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[#C7D2D5] text-xl md:text-2xl max-w-3xl mb-12"
            >
              Experience cutting-edge AI analysis that transforms your data into actionable insights. Discover patterns,
              predict trends, and make informed decisions with RecluseAI.
            </motion.p>
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a
                href="https://twitter.com/RecluseAI"
                target="_blank"
                rel="noopener noreferrer"
                className="recluse-bg-primary text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#b5182e] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5" />
                Follow on X
              </motion.a>
              <motion.a
                href="https://github.com/RecluseAI"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#333] text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#444] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
                Star on GitHub
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

