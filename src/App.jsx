import Navigation from "./components/Navigation"
import Hero from "./components/Hero.jsx"
import ParticleBackground from './assets/ParticleBackground (1)'
import { variants, theme } from "./theme/index.js"
import Exp from "./components/Exp.jsx"
import About from "./components/About.jsx"
import Skills from "./components/Skills.jsx"
import Projects from "./components/Projects.jsx"
import Experience from "./components/Experience.jsx"
import Blog from "./components/Blog.jsx"
import Footer from "./components/Footer.jsx"
import Contact from "./components/Contact.jsx"

function App() {

  return (
  <div className={`scroll-container relative h-screen w-full overflow-y-auto ${theme.bg.page}`}>

   <ParticleBackground className="top-0 left-0 fixed inset-0 " />

    <div className=" fixed top-0 left-0 w-full z-50 isolate">
<Navigation />
    </div>

    <main className="relative pt-20 md:pt-16 z-10">
  <section id="home"><Hero /></section>
  <Exp />
  <section id="about"><About /></section>
  <section id="skills"><Skills /></section>
  <section id="projects"><Projects /></section>
  <section id="experience"><Experience /></section>
  <section id="blog"><Blog /></section>
  <section id="contact"><Contact /></section>
  <Footer />
</main>
  </div>
  )
}

export default App
