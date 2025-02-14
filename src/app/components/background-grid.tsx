"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

export default function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const scale = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * scale
      canvas.height = window.innerHeight * scale
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(scale, scale)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationFrameId: number
    let time = 0

    const drawGrid = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(35, 35, 37, 0.95)")
      gradient.addColorStop(0.5, "rgba(35, 35, 37, 0.85)")
      gradient.addColorStop(1, "rgba(35, 35, 37, 0.95)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const spacing = 30
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw main grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x < canvas.width; x += spacing) {
        const opacity = Math.abs(Math.sin((x + time) * 0.01)) * 0.1
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += spacing) {
        const opacity = Math.abs(Math.sin((y + time) * 0.01)) * 0.1
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw diagonal lines
      ctx.strokeStyle = "rgba(138, 16, 32, 0.1)"
      ctx.beginPath()
      for (let i = -canvas.height; i < canvas.width; i += spacing * 2) {
        ctx.moveTo(i, 0)
        ctx.lineTo(i + canvas.height, canvas.height)
      }
      ctx.stroke()

      // Draw symmetric dark overlays
      const overlayWidth = canvas.width * 0.4
      const overlayHeight = canvas.height * 0.6

      ctx.fillStyle = "rgba(35, 35, 37, 0.7)"

      // Left overlay
      ctx.beginPath()
      ctx.moveTo(0, centerY - overlayHeight / 2)
      ctx.lineTo(overlayWidth, centerY)
      ctx.lineTo(0, centerY + overlayHeight / 2)
      ctx.closePath()
      ctx.fill()

      // Right overlay
      ctx.beginPath()
      ctx.moveTo(canvas.width, centerY - overlayHeight / 2)
      ctx.lineTo(canvas.width - overlayWidth, centerY)
      ctx.lineTo(canvas.width, centerY + overlayHeight / 2)
      ctx.closePath()
      ctx.fill()

      // Draw glowing intersection points
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
          const maxDistance = Math.sqrt(Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2))
          const normalizedDistance = distanceFromCenter / maxDistance

          const glowSize = Math.abs(Math.sin((x + y + time) * 0.01)) * 2
          const glowOpacity = (1 - normalizedDistance) * 0.15

          // Draw glow effect
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize * 4)
          gradient.addColorStop(0, `rgba(138, 16, 32, ${glowOpacity})`)
          gradient.addColorStop(1, "rgba(138, 16, 32, 0)")

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, glowSize * 4, 0, Math.PI * 2)
          ctx.fill()

          // Draw center point
          ctx.fillStyle = `rgba(255, 255, 255, ${glowOpacity})`
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      time += 0.5
      animationFrameId = requestAnimationFrame(drawGrid)
    }

    drawGrid()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 pointer-events-none"
      />
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-[#232325] pointer-events-none" />
    </>
  )
}