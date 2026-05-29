import { lazy, Suspense } from 'react'

/* ── Eager: Above-the-fold ── */
import { Header } from './components/Header'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useScrollAnimations } from './hooks/useScrollAnimations'
import Hero from './components/Hero/Hero'

/* ── Lazy: Below-the-fold sections ── */
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
const Footer = lazy(() => import('./components/Footer/Footer'))

const LazySection = ({ children }) => (
  <Suspense fallback={<div aria-hidden="true" className="min-h-[1px]" />}>
    {children}
  </Suspense>
)

const App = () => {
  useLenisScroll()
  useScrollAnimations()

  return (
    <>
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
      </main>
      <LazySection>
        <Footer />
      </LazySection>
    </>
  )
}

export default App
