'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play } from 'lucide-react'

const animations = {
  'from-center': {
    initial: { scale: 0.85, opacity: 0 },
    animate: { scale: 1,    opacity: 1 },
    exit:    { scale: 0.85, opacity: 0 },
  },
  'from-bottom': {
    initial: { y: 80,  opacity: 0 },
    animate: { y: 0,   opacity: 1 },
    exit:    { y: 80,  opacity: 0 },
  },
  'fade': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  },
}

function VideoModal({ videoSrc, onClose, animationStyle }) {
  const anim = animations[animationStyle] ?? animations['from-center']

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(6px)',
        }}
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            zIndex: 10000,
          }}
        >
          <X size={20} />
        </button>

        {/* Video box */}
        <motion.div
          key="video"
          initial={anim.initial}
          animate={anim.animate}
          exit={anim.exit}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            maxWidth: 896,
            aspectRatio: '16/9',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={`${videoSrc}?autoplay=1&rel=0`}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="video"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export function HeroVideoDialog({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = 'Video',
  animationStyle = 'from-center',
  className = '',
}) {
  const [open, setOpen]       = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <>
      <div
        className={`relative group cursor-pointer overflow-hidden ${className}`}
        onClick={() => setOpen(true)}
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300"
            style={{ background: 'rgba(255,255,255,0.92)' }}
          >
            <Play className="w-6 h-6 text-gray-900 fill-gray-900 ml-1" />
          </div>
        </div>
      </div>

      {mounted && open && (
        <VideoModal
          videoSrc={videoSrc}
          onClose={() => setOpen(false)}
          animationStyle={animationStyle}
        />
      )}
    </>
  )
}