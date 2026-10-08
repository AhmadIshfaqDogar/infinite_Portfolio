import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Canvas from './components/Canvas'
import Cursor from './components/Cursor'
import Grain from './components/Grain'
import Boot from './components/Boot'
import ProjectPage from './pages/ProjectPage'
import AboutPage from './pages/AboutPage'
import { nodes, links } from './data/nodes'

export default function App() {
  const [booted, setBooted] = useState(false)
  const location = useLocation()

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0a0a0a]">
      <AnimatePresence>
        {!booted && <Boot key="boot" onDone={() => setBooted(true)} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Canvas nodes={nodes} links={links} />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </AnimatePresence>

      <Grain />
      <Cursor />
    </main>
  )
}