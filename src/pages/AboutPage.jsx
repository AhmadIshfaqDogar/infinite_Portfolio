import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import { nodes } from '../data/nodes'

const identity = nodes.find((n) => n.id === 'me')
const contact = nodes.find((n) => n.id === 'contact')
const skills = nodes.find((n) => n.id === 'skills')

const timeline = [
  { year: '2025', role: 'Independent Designer & Developer', place: 'Remote' },
  { year: '2023', role: 'Product Designer', place: 'Studio Null' },
  { year: '2021', role: 'Frontend Engineer', place: 'Freelance' },
  { year: '2019', role: 'Started building on the web', place: 'Self-taught' },
]

export default function AboutPage() {
  return (
    <PageShell label="about / me">
      {/* HERO with PORTRAIT */}
      <section className="px-6 pb-24 pt-32 md:px-16 lg:px-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-10 font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/40"
        >
          ⟨ 00 ⟩ identity
        </motion.p>

        <div className="grid items-end gap-12 md:grid-cols-12">
          {/* portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative md:col-span-4"
          >
            <div className="relative aspect-square w-full max-w-sm overflow-hidden border border-white/15">
              <img
                src={identity.image}
                alt={identity.title}
                className="h-full w-full object-cover grayscale transition-all duration-1000 hover:grayscale-0"
                draggable={false}
              />
              <span className="absolute bottom-3 left-3 font-mono-ui text-[9px] uppercase tracking-[0.3em] text-white/70 mix-blend-difference">
                ⟨ me, {new Date().getFullYear()} ⟩
              </span>
            </div>
            {/* corner ticks */}
            <span className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-white/60" />
            <span className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-white/60" />
            <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-white/60" />
            <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-white/60" />
          </motion.div>

          {/* name + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="md:col-span-8"
          >
            <h1 className="font-display text-[14vw] italic leading-[0.85] tracking-tight text-white md:text-[8vw]">
              {identity.title}
            </h1>
            <p className="mt-6 font-mono-ui text-[11px] uppercase tracking-[0.35em] text-white/50">
              {identity.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* BIO */}
      <section className="px-6 pb-24 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12">
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/40 md:col-span-3">
            bio
          </p>
          <div className="space-y-6 md:col-span-8">
            <p className="font-display text-3xl italic leading-snug text-white md:text-4xl">
              I make things that feel like they shouldn't exist yet.
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-white/70">
              I'm a designer and developer who refuses to separate the two. I
              believe in interfaces that carry weight, tools that respect
              attention, and work that leaves a mark instead of a footprint.
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-white/70">
              Most of my time goes into the gap between what's technically
              possible and what's emotionally right. That gap is where the good
              stuff lives.
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-6 pb-24 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12">
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/40 md:col-span-3">
            stack
          </p>
          <ul className="flex flex-wrap gap-3 md:col-span-8">
            {skills.items.map((s) => (
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

      {/* TIMELINE */}
      <section className="px-6 pb-24 md:px-16 lg:px-24">
        <p className="mb-12 font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/40">
          journey
        </p>
        <ul>
          {timeline.map((t, i) => (
            <motion.li
              key={t.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group grid grid-cols-12 items-baseline gap-4 border-b border-white/10 py-6 transition-colors hover:bg-white/[0.02]"
            >
              <span className="col-span-3 font-mono-ui text-[10px] uppercase tracking-[0.3em] text-white/40 md:col-span-2">
                {t.year}
              </span>
              <span className="col-span-9 font-display text-xl italic text-white md:col-span-6 md:text-2xl">
                {t.role}
              </span>
              <span className="col-span-12 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-white/40 md:col-span-4 md:text-right">
                {t.place}
              </span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* CONTACT */}
      <section className="px-6 pb-40 md:px-16 lg:px-24">
        <div className="border border-white/15 p-10 md:p-16">
          <p className="mb-6 font-mono-ui text-[10px] uppercase tracking-[0.4em] text-white/40">
            {contact.title}
          </p>
          <h2 className="font-display text-4xl italic leading-tight text-white md:text-6xl">
            Let's build something <br />
            that doesn't exist yet.
          </h2>
          <ul className="mt-12 space-y-3">
            {contact.items.map((it) => (
              <li key={it.label}>
                <a
                  href={it.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 border-b border-white/10 pb-3 font-mono-ui text-[11px] uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-white"
                >
                  <span>{it.label}</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    {it.value} ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  )
}