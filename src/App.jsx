import { Header } from './components/Header'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useScrollAnimations } from './hooks/useScrollAnimations'
import Hero from './components/Hero/Hero'
import { BrandThesis, OriginSymbol } from './components/About'
import { Pillars } from './components/Pillars'
import { VentureConstellation } from './components/VentureConstellation'
import { VisionMission, Impact, Contact, Footer } from './components/Sections'
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
        <OriginSymbol />
        <Pillars />
        <VentureConstellation />
        <VisionMission />
        <Leadership />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
