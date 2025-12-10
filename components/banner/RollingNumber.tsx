"use client";
import { AnimatePresence, motion } from 'framer-motion'

export function RollingNumber({ value }: { value: number }) {
  return (
    <div className="relative overflow-hidden h-[1em] w-[0.6em] flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100, mass: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
