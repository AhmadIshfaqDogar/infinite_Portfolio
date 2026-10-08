// src/data/nodes.js

export const nodes = [
  {
    id: 'me',
    x: 0,
    y: 0,
    kind: 'identity',
    title: 'Ahmad Dogar',
    subtitle: 'Designer · Developer',
    body: 'I build rare digital experiences. Not pages — worlds.',
    // ⬇️ SWAP THIS to '/images/me.jpg' when you add your photo
    image: `${import.meta.env.BASE_URL}/images/me.jpeg`,
  },

  {
    id: 'aurora',
    x: -520,
    y: -320,
    kind: 'project',
    title: 'Aurora',
    subtitle: '2025 · Interactive',
    body: 'A generative art engine driven by live weather data.',
    // ⬇️ SWAP to '/images/aurora-thumb.jpg' — small preview on the canvas
    thumb: 'https://picsum.photos/seed/aurora/600/400',
    // ⬇️ SWAP to '/images/aurora-hero.jpg'
    hero: 'https://picsum.photos/seed/aurorahero/1600/900',
    // ⬇️ SWAP to real screenshot URLs
    gallery: [
      'https://picsum.photos/seed/aurora1/1200/800',
      'https://picsum.photos/seed/aurora2/1200/800',
      'https://picsum.photos/seed/aurora3/1200/800',
    ],
    year: '2025',
    role: 'Designer & Developer',
    duration: '4 months',
    client: 'Personal',
    stack: ['React', 'WebGL', 'GLSL', 'Node'],
    tagline: 'Live weather becomes paint.',
    overview:
      'Aurora pulls real-time weather data from 12,000 cities and translates it into a living, breathing visual field. Wind becomes motion. Humidity becomes saturation. Rain becomes texture.',
    sections: [
      { title: 'The idea', body: 'I wanted to see weather, not read it. Every city has a mood — Aurora paints it.' },
      { title: 'The build', body: 'A GLSL shader reads weather vectors as forces. React orchestrates the canvas; a Node service streams data every 90 seconds.' },
      { title: 'The result', body: 'It runs at 60fps on mid-range phones and has been used by three meteorology students for their thesis projects.' },
    ],
  },

  {
    id: 'nullspace',
    x: 560,
    y: -260,
    kind: 'project',
    title: 'Nullspace',
    subtitle: '2024 · Product',
    body: 'A tool for thinking. Infinite canvas notes with AI recall.',
    thumb: 'https://picsum.photos/seed/nullspace/600/400',
    hero: 'https://picsum.photos/seed/nullhero/1600/900',
    gallery: [
      'https://picsum.photos/seed/null1/1200/800',
      'https://picsum.photos/seed/null2/1200/800',
    ],
    year: '2024',
    role: 'Product Designer',
    duration: '8 months',
    client: 'Studio Null',
    stack: ['TypeScript', 'React', 'GPT-4', 'Postgres'],
    tagline: 'Thinking, unbound.',
    overview:
      'Nullspace is a note tool that forgets nothing and surfaces everything. Infinite canvas, semantic search, and AI that remembers what you meant, not just what you typed.',
    sections: [
      { title: 'Why', body: 'Every notes app forces structure. Nullspace forces none — then finds it for you.' },
      { title: 'The AI layer', body: 'Embeddings run locally. Nothing leaves your device unless you ask it to.' },
      { title: 'Traction', body: '12,000 users in the first 90 days. Featured on Product Hunt.' },
    ],
  },

  {
    id: 'echo',
    x: -480,
    y: 380,
    kind: 'project',
    title: 'Echo',
    subtitle: '2024 · Experiment',
    body: 'Voice cloning playground. Sound as memory.',
    thumb: 'https://picsum.photos/seed/echo/600/400',
    hero: 'https://picsum.photos/seed/echohero/1600/900',
    gallery: ['https://picsum.photos/seed/echo1/1200/800'],
    year: '2024',
    role: 'Creative Technologist',
    duration: '3 weeks',
    client: 'Self-initiated',
    stack: ['Python', 'Tortoise TTS', 'Next.js'],
    tagline: 'Your voice, kept.',
    overview:
      'Echo records 30 seconds of your voice and lets you preserve it forever — as audio, as text-to-speech, as memory.',
    sections: [
      { title: 'Origin', body: 'I lost my grandfather. I had one voicemail. Echo exists so nobody has to lose the same thing twice.' },
      { title: 'Ethics', body: 'Local-only training. Watermarked output. Consent stored on-chain.' },
    ],
  },

  {
    id: 'monolith',
    x: 620,
    y: 360,
    kind: 'project',
    title: 'Monolith',
    subtitle: '2023 · Identity',
    body: 'Brand system for a brutalist architecture studio.',
    thumb: 'https://picsum.photos/seed/monolith/600/400',
    hero: 'https://picsum.photos/seed/monohero/1600/900',
    gallery: ['https://picsum.photos/seed/mono1/1200/800'],
    year: '2023',
    role: 'Brand Designer',
    duration: '2 months',
    client: 'Concrete & Co.',
    stack: ['Figma', 'Illustrator', 'After Effects'],
    tagline: 'Weight you can read.',
    overview:
      'A brand identity for an architecture studio that refuses decoration. Every mark, every margin, every kerning pair chosen for mass.',
    sections: [
      { title: 'The mark', body: 'A single rectangle. Rotated 17°. It never changes — not on a business card, not on a billboard.' },
      { title: 'The type', body: 'One family, three weights, zero ornament.' },
    ],
  },

  {
    id: 'skills',
    x: -920,
    y: 60,
    kind: 'list',
    title: 'Stack',
    items: ['React', 'TypeScript', 'WebGL', 'Tailwind', 'Node', 'GLSL'],
  },

  {
    id: 'contact',
    x: 940,
    y: 40,
    kind: 'contact',
    title: 'Contact',
    subtitle: 'Available for select work',
    items: [
      { label: 'Email', value: 'you@domain.com', link: 'mailto:you@domain.com' },
      { label: 'GitHub', value: '@you', link: 'https://github.com' },
      { label: 'X', value: '@you', link: 'https://x.com' },
    ],
  },
]

export const links = [
  ['me', 'aurora'],
  ['me', 'nullspace'],
  ['me', 'echo'],
  ['me', 'monolith'],
  ['me', 'skills'],
  ['me', 'contact'],
]