import { useEffect, useRef, useState } from 'react'
import Node from './Node'

const MIN_S = 0.28
const MAX_S = 2.2
const clamp = (v, a, b) => Math.min(Math.max(v, a), b)

export default function Canvas({ nodes, links }) {
  const vpRef = useRef(null)
  const worldRef = useRef(null)
  const gridRef = useRef(null)
  const readoutRef = useRef(null)
  const [interacted, setInteracted] = useState(false)
  const interactedRef = useRef(false)

  const view = useRef({ x: 0, y: 0, s: 1 })
  const target = useRef({ x: 0, y: 0, s: 1 })
  const drag = useRef({ on: false, px: 0, py: 0, moved: false })
  const rafRef = useRef(0)

  useEffect(() => {
    const vp = vpRef.current
    const world = worldRef.current
    const grid = gridRef.current
    const cx = vp.clientWidth / 2
    const cy = vp.clientHeight / 2
    view.current = { x: cx, y: cy, s: 1 }
    target.current = { x: cx, y: cy, s: 1 }

    const mark = () => {
      if (!interactedRef.current) {
        interactedRef.current = true
        setInteracted(true)
      }
    }

    const onDown = (e) => {
      if (e.button !== 0) return
      drag.current = { on: true, px: e.clientX, py: e.clientY, moved: false }
      mark()
    }

    const onMove = (e) => {
      if (!drag.current.on) return
      const dx = e.clientX - drag.current.px
      const dy = e.clientY - drag.current.py
      drag.current.px = e.clientX
      drag.current.py = e.clientY
      if (Math.abs(dx) + Math.abs(dy) > 2) drag.current.moved = true
      target.current.x += dx
      target.current.y += dy
    }

    const onUp = () => {
      drag.current.on = false
    }

    const onClickCapture = (e) => {
      if (drag.current.moved) {
        e.stopPropagation()
        e.preventDefault()
      }
    }

    const onWheel = (e) => {
      e.preventDefault()
      mark()
      const r = vp.getBoundingClientRect()
      const mx = e.clientX - r.left
      const my = e.clientY - r.top
      const t = target.current
      const ns = clamp(t.s * Math.exp(-e.deltaY * 0.0012), MIN_S, MAX_S)
      const wx = (mx - t.x) / t.s
      const wy = (my - t.y) / t.s
      t.x = mx - wx * ns
      t.y = my - wy * ns
      t.s = ns
    }

    const onDblClick = () => {
      target.current.x = vp.clientWidth / 2
      target.current.y = vp.clientHeight / 2
      target.current.s = 1
    }

    vp.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    vp.addEventListener('click', onClickCapture, true)
    vp.addEventListener('wheel', onWheel, { passive: false })
    vp.addEventListener('dblclick', onDblClick)

    const tick = () => {
      const v = view.current
      const t = target.current
      v.x += (t.x - v.x) * 0.13
      v.y += (t.y - v.y) * 0.13
      v.s += (t.s - v.s) * 0.13

      world.style.transform = `translate3d(${v.x}px, ${v.y}px, 0) scale(${v.s})`

      if (grid) {
        grid.style.backgroundPosition = `${v.x}px ${v.y}px`
        grid.style.backgroundSize = `${48 * v.s}px ${48 * v.s}px`
      }

      const ro = readoutRef.current
      if (ro) {
        ro.textContent = `X ${v.x.toFixed(0)} · Y ${v.y.toFixed(0)} · ${(v.s * 100).toFixed(0)}%`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      vp.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      vp.removeEventListener('click', onClickCapture, true)
      vp.removeEventListener('wheel', onWheel)
      vp.removeEventListener('dblclick', onDblClick)
    }
  }, [])

  const map = Object.fromEntries(nodes.map((n) => [n.id, n]))

  return (
    <div
      ref={vpRef}
      className="absolute inset-0 touch-none overflow-hidden"
      style={{ cursor: 'none' }}
    >
      {/* grid backdrop */}
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(circle at 50% 50%, black 15%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 50%, black 15%, transparent 80%)',
        }}
      />

      {/* world */}
      <div
        ref={worldRef}
        className="absolute left-0 top-0 h-0 w-0"
        style={{ transformOrigin: '0 0', willChange: 'transform' }}
      >
        {/* ambient glow centered on origin */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: -800,
            top: -800,
            width: 1600,
            height: 1600,
            background:
              'radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 30%, transparent 65%)',
          }}
        />

        {/* pulse rings behind identity */}
        <div className="pointer-events-none absolute left-0 top-0">
          <span
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
            style={{
              width: 180,
              height: 180,
              animation: 'ping 3s cubic-bezier(0,0,0.2,1) infinite',
            }}
          />
          <span
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={{
              width: 320,
              height: 320,
              animation: 'ping 3s cubic-bezier(0,0,0.2,1) infinite',
              animationDelay: '1s',
            }}
          />
          <span
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
            style={{
              width: 480,
              height: 480,
              animation: 'ping 3s cubic-bezier(0,0,0.2,1) infinite',
              animationDelay: '2s',
            }}
          />
        </div>

        {/* connection lines */}
        <svg
          className="pointer-events-none absolute"
          style={{ left: -3000, top: -3000, width: 6000, height: 6000 }}
        >
          <defs>
            <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(232,230,225,0.04)" />
              <stop offset="50%" stopColor="rgba(232,230,225,0.28)" />
              <stop offset="100%" stopColor="rgba(232,230,225,0.04)" />
            </linearGradient>
          </defs>
          <g transform="translate(3000,3000)">
            {links.map(([a, b], i) => {
              const A = map[a]
              const B = map[b]
              if (!A || !B) return null
              return (
                <line
                  key={i}
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="url(#linkGrad)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                  style={{
                    animation: 'dashflow 30s linear infinite',
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              )
            })}
          </g>
        </svg>

        {nodes.map((n) => (
          <Node key={n.id} node={n} />
        ))}
      </div>

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* corner frame ticks */}
      <span className="pointer-events-none absolute left-4 top-4 z-30 h-4 w-4 border-l border-t border-white/25" />
      <span className="pointer-events-none absolute right-4 top-4 z-30 h-4 w-4 border-r border-t border-white/25" />
      <span className="pointer-events-none absolute bottom-4 left-4 z-30 h-4 w-4 border-b border-l border-white/25" />
      <span className="pointer-events-none absolute bottom-4 right-4 z-30 h-4 w-4 border-b border-r border-white/25" />

      {/* top-left: brand */}
      <div className="pointer-events-none absolute left-8 top-8 z-30">
        <p className="font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/70">
          Ahmad Ishfaq
        </p>
        <p className="mt-1 font-mono-ui text-[9px] uppercase tracking-[0.3em] text-white/30">
          portfolio · {new Date().getFullYear()}
        </p>
      </div>

      {/* top-right: availability */}
      <div className="pointer-events-none absolute right-8 top-8 z-30 text-right">
        <p className="font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/70">
          ⟨ Active ⟩
        </p>
        <p className="mt-1 flex items-center justify-end gap-2 font-mono-ui text-[9px] uppercase tracking-[0.3em] text-white/40">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          open for work
        </p>
      </div>

      {/* bottom-left: hints */}
      <div className="pointer-events-none absolute bottom-8 left-8 z-30">
        <ul className="space-y-1 font-mono-ui text-[9px] uppercase tracking-[0.3em] text-white/30">
          <li>drag · to pan</li>
          <li>scroll · to zoom</li>
          <li>click · to open</li>
        </ul>
      </div>

      {/* bottom-right: readout */}
      <div
        ref={readoutRef}
        className="pointer-events-none absolute bottom-8 right-8 z-30 font-mono-ui text-[9px] uppercase tracking-[0.3em] text-white/40"
      />

      {/* center onboarding hint */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-24 z-40 flex justify-center transition-all duration-700 ${
          interacted ? 'translate-y-2 opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-4 font-mono-ui text-[10px] uppercase tracking-[0.5em] text-white/50">
          <span className="inline-block h-px w-12 bg-white/70" />
          drag to explore
          <span className="inline-block h-px w-12 bg-white/70" />
        </div>
      </div>
    </div>
  )
}