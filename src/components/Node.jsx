import { useNavigate } from 'react-router-dom'

export default function Node({ node }) {
  return (
    <div
      className="absolute"
      style={{
        left: node.x,
        top: node.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {node.kind === 'identity' && <Identity node={node} />}
      {node.kind === 'project' && <Project node={node} />}
      {node.kind === 'list' && <List node={node} />}
      {node.kind === 'contact' && <Contact node={node} />}
    </div>
  )
}

function Frame({ children, accent = false, clickable = false, pad = true }) {
  return (
    <div
      className={`group relative min-w-[220px] max-w-[300px] border backdrop-blur-md transition-all duration-300 ${
        accent
          ? 'border-white/30 bg-white/[0.03]'
          : 'border-white/10 bg-white/[0.015] hover:border-white/40 hover:bg-white/[0.04]'
      } ${clickable ? 'cursor-pointer' : ''} ${pad ? 'px-6 py-5' : ''}`}
    >
      <span className="pointer-events-none absolute -left-px -top-px z-10 h-2 w-2 border-l border-t border-white/50" />
      <span className="pointer-events-none absolute -right-px -top-px z-10 h-2 w-2 border-r border-t border-white/50" />
      <span className="pointer-events-none absolute -bottom-px -left-px z-10 h-2 w-2 border-b border-l border-white/50" />
      <span className="pointer-events-none absolute -bottom-px -right-px z-10 h-2 w-2 border-b border-r border-white/50" />
      {children}
    </div>
  )
}

function Identity({ node }) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate('/about')}>
      <Frame accent clickable>
        <div className="flex items-center gap-4">
          {/* avatar */}
          <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-white/20">
            <img
              src={node.image}
              alt={node.title}
              className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              draggable={false}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-1 font-mono-ui text-[9px] uppercase tracking-[0.35em] text-white/40">
               identity
            </p>
            <h1 className="truncate font-display text-2xl italic leading-none text-white">
              {node.title}
            </h1>
          </div>
        </div>

        <p className="mt-4 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-white/50">
          {node.subtitle}
        </p>
        <p className="mt-3 max-w-[240px] text-sm leading-relaxed text-white/70">
          {node.body}
        </p>
        <div className="mt-5 flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[0.3em] text-white/30 transition-colors group-hover:text-white">
          <span>about me</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </Frame>
    </div>
  )
}

function Project({ node }) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/project/${node.id}`)} className="w-[280px]">
      <Frame clickable pad={false}>
        {/* thumbnail */}
        <div className="relative h-32 w-full overflow-hidden border-b border-white/10 bg-black">
          <img
            src={node.thumb}
            alt={node.title}
            className="h-full w-full object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <p className="absolute bottom-2 left-3 font-mono-ui text-[9px] uppercase tracking-[0.3em] text-white/80">
            {node.subtitle}
          </p>
        </div>

        <div className="px-5 py-4">
          <h3 className="font-display text-2xl italic leading-none text-white">
            {node.title}
          </h3>
          <p className="mt-2 max-w-[240px] text-xs leading-relaxed text-white/60">
            {node.body}
          </p>
          <div className="mt-4 flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[0.3em] text-white/30 transition-colors group-hover:text-white">
            <span>view case</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Frame>
    </div>
  )
}

function List({ node }) {
  return (
    <Frame>
      <p className="mb-3 font-mono-ui text-[9px] uppercase tracking-[0.35em] text-white/40">
        {node.title}
      </p>
      <ul className="space-y-1.5">
        {node.items.map((it) => (
          <li
            key={it}
            className="flex items-center gap-2 font-mono-ui text-[11px] text-white/70"
          >
            <span className="h-px w-3 bg-white/30" />
            {it}
          </li>
        ))}
      </ul>
    </Frame>
  )
}

function Contact({ node }) {
  return (
    <Frame>
      <p className="mb-2 font-mono-ui text-[9px] uppercase tracking-[0.35em] text-white/40">
        {node.title}
      </p>
      <p className="font-display text-xl italic text-white">{node.subtitle}</p>
      <ul className="mt-4 space-y-2">
        {node.items.map((it) => (
          <li key={it.label}>
            <a
              href={it.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/l flex items-center justify-between gap-4 border-b border-white/10 pb-1 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
            >
              <span>{it.label}</span>
              <span className="text-white/40 transition-colors group-hover/l:text-white">
                {it.value} ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Frame>
  )
}