import { useState, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import Services from './components/Services'
import About from './components/About'
import HierarchyManager from './components/HierarchyManager'
import Results from './components/Results'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

function App() {
  const [activeSimTab, setActiveSimTab] = useState('mobile')

  const switchSimTab = useCallback((tab) => {
    setActiveSimTab(tab)
    setTimeout(() => {
      const el = document.getElementById('simulator')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }, [])

  return (
    <>
      <div className="glow-bg glow-cyan" aria-hidden="true" />
      <div className="glow-bg glow-purple" aria-hidden="true" />
      <div className="page-noise" aria-hidden="true" />

      <div className="site-shell">
        <Header />
        <main>
          <Hero activeSimTab={activeSimTab} setActiveSimTab={setActiveSimTab} />
          <MarqueeStrip />
          <Services switchSimTab={switchSimTab} />
          <About />
          <HierarchyManager />
          <Results />
          <FAQ />
          <Contact />
        </main>
        <Footer switchSimTab={switchSimTab} />
      </div>

      <BackToTop />
    </>
  )
}

export default App
