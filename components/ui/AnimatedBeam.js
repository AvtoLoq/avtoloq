'use client'
import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export const AnimatedBeam = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = true,
  duration = 5,
  delay = 0,
  pathColor = '#e2e8f0',
  pathWidth = 2,
  pathOpacity = 0.3,
  gradientStartColor = '#6366f1',
  gradientStopColor = '#06b6d4',
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId()
  const [pathD, setPathD] = useState('')
  const [svgDims, setSvgDims] = useState({ width: 0, height: 0 })

  const updatePath = () => {
    if (!containerRef?.current || !fromRef?.current || !toRef?.current) return

    const container = containerRef.current.getBoundingClientRect()
    const from = fromRef.current.getBoundingClientRect()
    const to = toRef.current.getBoundingClientRect()

    const svgW = container.width
    const svgH = container.height

    const sx = from.left - container.left + from.width / 2 + startXOffset
    const sy = from.top - container.top + from.height / 2 + startYOffset
    const ex = to.left - container.left + to.width / 2 + endXOffset
    const ey = to.top - container.top + to.height / 2 + endYOffset

    const mx = (sx + ex) / 2
    const my = (sy + ey) / 2 - curvature

    setSvgDims({ width: svgW, height: svgH })
    setPathD(`M ${sx},${sy} Q ${mx},${my} ${ex},${ey}`)
  }

  useEffect(() => {
    updatePath()
    const observer = new ResizeObserver(updatePath)
    if (containerRef?.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

  const gradId = `grad-${id}`

  return (
    <svg
      fill="none"
      width={svgDims.width}
      height={svgDims.height}
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute left-0 top-0 ${className ?? ''}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" x2="100%" y1="0%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="40%" stopColor={gradientStartColor} />
          <stop offset="60%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Static path */}
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} fill="none" />

      {/* Animated beam */}
      <motion.path
        d={pathD}
        stroke={`url(#${gradId})`}
        strokeWidth={pathWidth + 1}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, pathOffset: reverse ? -1 : 1, opacity: 0 }}
        animate={{ pathLength: 0.4, pathOffset: reverse ? 1 : -1, opacity: [0, 1, 1, 0] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 0.5,
        }}
      />
    </svg>
  )
}