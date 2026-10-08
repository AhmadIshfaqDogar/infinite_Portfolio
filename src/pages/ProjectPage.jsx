import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import { nodes } from '../data/nodes'

export default function ProjectPage() {
  const { id } = useParams()
  const project = nodes.find((n) => n.id === id && n.kind === 'project')
  const others = nodes.filter((n) => n.kind === 'project' && n.id !== id)

  if (!project) {
    return (
      <PageShell label="404">
        <div className="flex h-screen items-center justify-center">
          <p className="font-mono-ui text-xs uppercase tracking-[0.4em] text-white/40">
            project not found
          </p>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell label={`project / ${project.id}`}>
      {/* HERO */}
      <section className="relative px-6 pb-16 pt-40 md:px-16 lg:px-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-8 font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/40"
        >
          {project.subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[16vw] italic leading-[0.85] tracking-tight text-white md:text-[11vw]"
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-10 max-w-2xl font-display text-3xl italic leading-tight text-white/80 md:text-4xl"
        >
          {project.tagline}
        </motion.p>
      </section>

      {/* HERO IMAGE */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="px-6 pb-16 md:px-16 lg:px-24"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10">
          <img
            src={project.hero}
            alt={`${project.title} hero`}
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <p className="absolute bottom-4 left-4 font-mono-ui text-[9px] uppercase tracking-[0.3em] text-white/70">
            ⟨ hero / {project.year} ⟩
          </p>
        </div>
      </motion.section>

      {/* META */}
      <section className="px-6 pb-24 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-8 border-y border-white/10 py-8 md:grid-cols-4"
        >
          <Meta label="year" value={project.year} />
          <Meta label="role" value={project.role} />
          <Meta label="duration" value={project.duration} />
          <Meta label="client" value={project.client} />
        </motion.div>
      </section>

      {/* OVERVIEW */}
      <section className="px-6 pb-24 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12">
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/40 md:col-span-3">
            overview
          </p>
          <p className="text-xl leading-relaxed text-white/80 md:col-span-8 md:text-2xl">
            {project.overview}
          </p>
        </div>
      </section>

      {/* STACK */}
      <section className="px-6 pb-24 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12">
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/40 md:col-span-3">
            stack
          </p>
          <ul className="flex flex-wrap gap-3 md:col-span-8">
            {project.stack?.map((s) => (
              <li
                key={s}
                className="border border-white/15 px-4 py-2 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-white/70"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GALLERY */}
      {project.gallery?.length > 0 && (
        <section className="px-6 pb-24 md:px-16 lg:px-24">
          <p className="mb-12 font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/40">
            ⟨ gallery ⟩
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {project.gallery.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`group relative overflow-hidden border border-white/10 ${
                  i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={src}
                  alt={`${project.title} — ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  draggable={false}
                  loading="lazy"
                />
                <span className="absolute bottom-3 left-3 font-mono-ui text-[9px] uppercase tracking-[0.3em] text-white/60">
                  ⟨ {String(i + 1).padStart(2, '0')} ⟩
                </span>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* SECTIONS */}
      <section className="px-6 pb-24 md:px-16 lg:px-24">
        <div className="space-y-24">
          {project.sections?.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-12 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/40">
                  ⟨ {String(i + 1).padStart(2, '0')} ⟩
                </p>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-display text-3xl italic text-white md:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEXT */}
      <section className="border-t border-white/10 px-6 py-24 md:px-16 lg:px-24">
        <p className="mb-12 font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/40">
          next project
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {others.slice(0, 3).map((o) => (
            <Link
              key={o.id}
              to={`/project/${o.id}`}
              className="group block border border-white/10 transition-all hover:border-white/40 hover:bg-white/[0.03]"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                <img
                  src={o.thumb}
                  alt={o.title}
                  className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                  draggable={false}
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <p className="font-mono-ui text-[9px] uppercase tracking-[0.3em] text-white/40">
                  {o.subtitle}
                </p>
                <h4 className="mt-3 font-display text-3xl italic text-white">
                  {o.title}
                </h4>
                <p className="mt-2 text-sm text-white/50">{o.body}</p>
                <p className="mt-6 flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[0.3em] text-white/30 transition-colors group-hover:text-white">
                  open <span className="transition-transform group-hover:translate-x-1">→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="font-mono-ui text-[9px] uppercase tracking-[0.35em] text-white/30">
        {label}
      </p>
      <p className="mt-2 font-display text-lg italic text-white/90">{value}</p>
    </div>
  )
}