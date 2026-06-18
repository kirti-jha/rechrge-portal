import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import BackToTop from './BackToTop'

export default function SiteLayout() {
  return (
    <>
      <div className="glow-bg glow-cyan" aria-hidden="true" />
      <div className="glow-bg glow-purple" aria-hidden="true" />
      <div className="page-noise" aria-hidden="true" />

      <div className="site-shell">
        <Header />
        <main className="page-main">
          <Outlet />
        </main>
        <Footer />
      </div>

      <BackToTop />
    </>
  )
}
