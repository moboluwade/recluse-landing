"use client"

import { motion, useAnimationFrame } from "framer-motion"
import { Github, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

export default function NavBar() {
  const rotationRef = useRef(0)
  const glowRef = useRef<HTMLDivElement>(null)

  useAnimationFrame((time) => {
    if (glowRef.current) {
      rotationRef.current = (time * 0.1) % 360
      glowRef.current.style.background = `conic-gradient(from ${rotationRef.current}deg at 50% 50%, transparent 0deg, var(--primary) 60deg, transparent 120deg)`
    }
  })

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center p-4">
      <motion.div
        className="absolute left-4 md:left-8 z-30 hidden md:inline-block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/recluse-profile.jpg"
            alt="RecluseAI Logo"
            width={60}
            height={60}
            className="rounded-full recluse-bg-primary p-1"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1,
        }}
      >
        <motion.div
          ref={glowRef}
          className="absolute inset-[-2px] rounded-full blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{
            opacity: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            },
          }}
        />

        <motion.nav
          className="relative bg-[#232325]/80 backdrop-blur-md rounded-full border border-white/10"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="flex items-center justify-between gap-8 md:gap-16 px-6 py-4">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
              <Link
                href="/"
                className="recluse-primary text-xl font-bold tracking-wider transition-opacity hover:opacity-80"
              >
                RecluseAI
              </Link>
            </motion.div>

            <div className="flex md:flex items-center gap-2 md:gap-8">
              {["Docs", "Community"].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-[#C7D2D5] hover:text-white transition-colors relative group"
                  >
                    {item}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50"
                      whileHover={{ width: "100%" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.a
                href="https://x.com/recluseai_"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="text-[#C7D2D5] hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://github.com/recluseai/recluse-ai-agent"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="text-[#C7D2D5] hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.nav>
      </motion.div>
    </div>
  )
}

