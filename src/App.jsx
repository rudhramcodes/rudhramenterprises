import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import { Header } from './components/Header'
import SEO from './components/SEO'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useScrollAnimations } from './hooks/useScrollAnimations'
import Hero from './components/Hero/Hero'

const BrandThesis = lazy(() =>
  import('./components/About').then((m) => ({ default: m.BrandThesis })),
)
const Story = lazy(() =>
  import('./components/Story').then((m) => ({ default: m.Story })),
)
const VisionariesSection = lazy(() =>
  import('./components/MouseImageDistortion'),
)
const VisionMission = lazy(() =>
  import('./components/Sections').then((m) => ({ default: m.VisionMission })),
)
const VentureGallery = lazy(() =>
  import('./components/VentureGallery/VentureGallery').then((m) => ({
    default: m.VentureGallery,
  })),
)
const ContactForm = lazy(() => import('./components/ContactForm'))
const Footer = lazy(() => import('./components/Footer/Footer'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))

const LazySection = ({ children }) => (
  <Suspense fallback={<div aria-hidden="true" className="min-h-[1px]" />}>
    {children}
  </Suspense>
)

const HomePage = () => {
  useLenisScroll()
  useScrollAnimations()

  return (
    <>
      <SEO path="/" />
      <Header />
      <main className="relative z-[2] min-h-screen bg-ivory">
        <Hero />
        <LazySection>
          <BrandThesis />
        </LazySection>
        <LazySection>
          <Story />
        </LazySection>
        <LazySection>
          <VisionariesSection />
        </LazySection>
        <LazySection>
          <VisionMission />
        </LazySection>
        <LazySection>
          <VentureGallery />
        </LazySection>
        <LazySection>
          <ContactForm />
        </LazySection>
      </main>
      <LazySection>
        <Footer />
      </LazySection>
    </>
  )
}

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const App = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/terms" element={
        <Suspense fallback={<div aria-hidden="true" className="min-h-screen bg-ivory" />}>
          <TermsOfService />
        </Suspense>
      } />
      <Route path="/privacy" element={
        <Suspense fallback={<div aria-hidden="true" className="min-h-screen bg-ivory" />}>
          <PrivacyPolicy />
        </Suspense>
      } />
    </Routes>
  </>
)

export default App
