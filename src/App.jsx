import { Header } from './components/Header'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useScrollAnimations } from './hooks/useScrollAnimations'
import Hero from './components/Hero/Hero'
import { BrandThesis } from './components/About'
import { Story } from './components/Story'
import VisionariesSection from './components/MouseImageDistortion'
import { VisionMission } from './components/Sections'
import Footer from './components/Footer/Footer'
import { VentureGallery } from './components/VentureGallery/VentureGallery'
// import { Leadership } from './components/Leadership'

const App = () => {
  useLenisScroll()
  useScrollAnimations()

  return (
    <>
      <Header />
      <main className="relative z-[2] min-h-screen bg-ivory">
        <Hero />
        <BrandThesis />
        <Story />
        <VisionariesSection />
        <VisionMission />
        <VentureGallery />
        {/* <Leadership /> */}
        {/* <Contact /> */}
        {/* <Impact /> */}
      </main>
      <Footer />
    </>
  )
}

export default App
