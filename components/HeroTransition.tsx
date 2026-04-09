'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HeroTransition() {
  const [isMounted, setIsMounted] = useState(false)
  const [showBg, setShowBg] = useState(true)
  const [showText1, setShowText1] = useState(true)
  const [showText2, setShowText2] = useState(false)
  const [revealContent, setRevealContent] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const bgTimeout = setTimeout(() => setShowBg(false), 1600)
    const text1Timeout = setTimeout(() => setShowText1(false), 1400)
    const text2Timeout = setTimeout(() => setShowText2(true), 1400)
    const text2FadeTimeout = setTimeout(() => {
      setShowText2(false)
      setRevealContent(true)
    }, 2400)

    return () => {
      clearTimeout(bgTimeout)
      clearTimeout(text1Timeout)
      clearTimeout(text2Timeout)
      clearTimeout(text2FadeTimeout)
    }
  }, [isMounted])

  if (!isMounted) {
    return (
      <div className="fixed top-0 left-0 w-full h-full z-[9998] bg-white" />
    )
  }

  return (
    <>
      <AnimatePresence>
        {showBg && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full z-[9998] bg-gradient-to-br from-white via-slate-100 to-slate-200"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showText1 && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full z-[9999] flex flex-col items-center justify-center pointer-events-none"
            exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "easeIn" }}
          >
            <motion.span 
              initial={{ opacity: 0, letterSpacing: '1em' }}
              animate={{ opacity: 1, letterSpacing: '1.5em' }}
              transition={{ duration: 1.5 }}
              className="text-4xl md:text-5xl font-light text-[#D4AF37] uppercase tracking-[1.5em]"
            >
              LARAIB
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showText2 && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full z-[9999] flex flex-col items-center justify-center pointer-events-none"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl md:text-9xl font-bold text-white tracking-tighter"
            >
              SILVER'S
            </motion.span>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '150px' }}
              className="h-[2px] bg-[#D4AF37] mt-6"
            />
          </motion.div>
        )}
      </AnimatePresence>


      <AnimatePresence>
        {revealContent && (
          <motion.div
            className="fixed inset-0 z-[1] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

