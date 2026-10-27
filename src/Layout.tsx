import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import Header from './Header'
import Footer from './Footer'
import './index.css'

/*
  The shell every page shares: skip link, the fixed header, the page's own
  content as <main>, and the footer. Each page entry in src/pages calls
  mountPage with its content.
*/
function Layout({ children, before }: { children: ReactNode; before?: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      {before}
      <main id="main">{children}</main>
      <Footer />
    </MotionConfig>
  )
}

/** `before` renders ahead of <main>, for the home page's scroll stage. */
export function mountPage(children: ReactNode, before?: ReactNode) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Layout before={before}>{children}</Layout>
    </StrictMode>,
  )
}
