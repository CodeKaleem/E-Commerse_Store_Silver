// 'use client'

// import { useCallback, useEffect, useRef, useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { usePathname, useRouter } from 'next/navigation'
// import { flushSync } from 'react-dom'

// type Phase = 'idle' | 'bg' | 'text'

// /**
//  * ExitTransition
//  * - Plays luxury Gold/Black exit animations on internal navigations.
//  */
// export default function ExitTransition() {
//   const router = useRouter()
//   const pathname = usePathname()

//   const [phase, setPhase] = useState<Phase>('idle')
//   const isAnimating = useRef(false)
//   const timers = useRef<number[]>([])
//   const prevPath = useRef(pathname)

//   const DURATION = {
//     bgIn: 0.3,         // background sweep in (s)
//     textDelay: 0.1,    // delay before text reveal (s)
//     total: 0.6,        // total before navigation (s)
//   }

//   const clearTimers = useCallback(() => {
//     timers.current.forEach(clearTimeout)
//     timers.current = []
//   }, [])

//   const reset = useCallback(() => {
//     clearTimers()
//     isAnimating.current = false
//     setPhase('idle')
//     document.documentElement.classList.remove('overflow-hidden')
//   }, [clearTimers])

//   useEffect(() => {
//     if (pathname !== prevPath.current) {
//       reset()
//       prevPath.current = pathname
//     }
//   }, [pathname, reset])

//   useEffect(() => () => {
//     clearTimers()
//     document.documentElement.classList.remove('overflow-hidden')
//   }, [clearTimers])

//   const schedule = (fn: () => void, ms: number) => {
//     const id = window.setTimeout(fn, ms)
//     timers.current.push(id)
//   }

//   const startTransition = useCallback((url: string) => {
//     if (isAnimating.current) return
//     isAnimating.current = true
//     document.documentElement.classList.add('overflow-hidden')

//     flushSync(() => setPhase('bg'))         
//     schedule(() => setPhase('text'), DURATION.textDelay * 1000)
//     schedule(() => router.push(url), DURATION.total * 1000)
//   }, [router])

//   useEffect(() => {
//     const onClick = (e: MouseEvent) => {
//       if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

//       const anchor = (e.target as HTMLElement)?.closest('a') as HTMLAnchorElement | null
//       if (!anchor) return
//       if (anchor.hasAttribute('download') || anchor.getAttribute('target') === '_blank' || anchor.dataset.noTransition !== undefined) return

//       const href = anchor.getAttribute('href')
//       if (!href || href.startsWith('#')) return

//       try {
//         const next = new URL(href, window.location.href)
//         if (next.origin !== window.location.origin) return
//       } catch {
//         return
//       }

//       if (href === window.location.pathname + window.location.search + window.location.hash) return

//       e.preventDefault()
//       startTransition(href)
//     }

//     document.addEventListener('click', onClick, true)
//     return () => document.removeEventListener('click', onClick, true)
//   }, [startTransition])

//   if (phase === 'idle') return null

//   return (
//     <>
//       <AnimatePresence>
//         {(phase as string) !== 'idle' && (
//           <motion.div
//             key="bg-overlay"

//             className="fixed inset-0 z-[9998] bg-black pointer-events-none border-l-4 border-[#D4AF37]"
//             initial={{ x: '100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '-100%' }}
//             transition={{ duration: DURATION.bgIn, ease: [0.4, 0, 0.2, 1] }}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {phase === 'text' && (
//           <motion.div
//             key="text-reveal"
//             className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 1.05 }}
//             transition={{ duration: 0.3, ease: 'easeOut' }}
//           >
//             <span className="text-3xl md:text-5xl font-bold text-white tracking-widest uppercase">LARAIB SILVER'S</span>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }