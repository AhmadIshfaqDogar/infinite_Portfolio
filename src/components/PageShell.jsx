import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function PageShell({ children, label }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-30 overflow-y-auto bg-[#0a0a0a]"
    >
      {/* fixed chrome */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 mix-blend-difference">
        <button
          onClick={() => navigate(-1)}
          className="pointer-events-auto group flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white"
        >
          <span className="inline-block transition-transform group-hover:-translate-x-1">
            ←
          </span>
          <span>back</span>
        </button>
        {label && (
          <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-white/40">
            {label}
          </span>
        )}
      </div>

      <div className="relative">{children}</div>

      {/* bottom fade */}
      <div className="pointer-events-none sticky bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </motion.div>
  )
}