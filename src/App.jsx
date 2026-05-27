import { Header } from './components/Header'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useScrollAnimations } from './hooks/useScrollAnimations'
import Hero from './components/Hero/Hero'
import { BrandThesis } from './components/About'
import { Story } from './components/Story'
import { VentureConstellation } from './components/VentureConstellation'
import VisionariesSection from './components/MouseImageDistortion'
import { VisionMission, Impact, Contact, Footer } from './components/Sections'
import { VentureGallery } from './components/VentureGallery/VentureGallery'
import { Leadership } from './components/Leadership'

const App = () => {
  useLenisScroll()
  useScrollAnimations()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandThesis />
        <Story />
        <VisionariesSection />
        {/* <VentureConstellation /> */}
        <VisionMission />
        <VentureGallery />
        {/* <Leadership /> */}
        <Contact />
        <Impact />
      </main>
      <Footer />
    </>
  )
}

export default App
