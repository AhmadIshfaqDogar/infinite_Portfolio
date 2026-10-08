import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINES = [
  'initializing world',
  'mapping nodes',
  'threading connections',
  'ready',
]

export default function Boot({ onDone }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step >= LINES.length) {
      const t = setTimeout(onDone, 450)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStep((s) => s + 1), 340)
    return () => clearTimeout(t)
  }, [step, onDone])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0a0a0a]"
    >
      {/* corner ticks */}
      <span className="absolute left-6 top-6 h-4 w-4 border-l border-t border-white/30" />
      <span className="absolute right-6 top-6 h-4 w-4 border-r border-t border-white/30" />
      <span className="absolute bottom-6 left-6 h-4 w-4 border-b border-l border-white/30" />
      <span className="absolute bottom-6 right-6 h-4 w-4 border-b border-r border-white/30" />

      <div className="font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/50">
        {LINES.slice(0, step).map((l, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-2 ${i === LINES.length - 1 ? 'text-white' : ''}`}
          >
            <span className="text-white/30">› </span>
            {l}
            {i === step - 1 && i !== LINES.length - 1 && (
              <span className="ml-2 inline-block h-3 w-[6px] translate-y-[2px] animate-pulse bg-white/60" />
            )}
          </motion.div>
        ))}
        {step >= LINES.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white"
          >
            <span className="text-white/30">› </span>
            {LINES[LINES.length - 1]}
            <span className="ml-2 inline-block h-3 w-[6px] translate-y-[2px] animate-pulse bg-white" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}