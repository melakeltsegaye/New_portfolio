import React from 'react'
import { useState, useEffect } from 'react'
import { X, Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'
import { motion } from "framer-motion"
import { theme, variants } from "../theme/index.js"


const navLinks = [
  { label: "Home",     href: "#home"     },
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog",     href: "#blog"     },
  { label: "Contact",  href: "#contact"  },
]

const Navigation = () => {
    const { dark, setDark } = useTheme()
    const [toggle, setToggle] = useState(false)
    const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // The real scroll container is .scroll-container (in App.jsx), not window
    const scrollEl = document.querySelector(".scroll-container")
    if (!scrollEl) return

    const handleScroll = () => {
      setScrolled(scrollEl.scrollTop > 80) // appears after 80px of scroll
    }

    scrollEl.addEventListener("scroll", handleScroll)
    return () => scrollEl.removeEventListener("scroll", handleScroll)
  }, [])

   const handleClick = () => {
    if(toggle){
        setToggle(false)
    } else {
        setToggle(true)
    }
   }
   
  return (
    <motion.div
     variants={variants.fadeIn}
        initial="hidden"
        animate="visible"
      className={`
    w-full top-0 sticky  transition-all duration-300
    ${theme.padding.pad}
    ${toggle ? "h-screen bg-white/8 backdrop-blur-sm" : ""}
    ${scrolled ? "bg-white/8 backdrop-blur-sm shadow-lg" : "bg-transparent"}
  `}>

        <div className='flex py-4 justify-between items-center'>

            {/* logo */}
<div className='w-10  h-10 bg-blue-700 rounded-md text-center'>
    <h1 className='font-bold text-white text-3xl'>M</h1>
</div>

{/* nav list */}

<div className={`hidden py-3 px-5 ${theme.border.default} rounded-full bg-white/15 md:flex gap-7 backdrop-blur-md items-center ${theme.text.primary}`}>
 {navLinks.map((link) => (
           <a 
              key={link.href}
              href={link.href}
              className={`hover:${theme.text.primary} transition-colors duration-200 text-sm`}
            >
              {link.label}
            </a>
          ))}
</div>

<div className={`${theme.text.primary} cursor-pointer md:hidden`} onClick={handleClick}>
{toggle ? <X /> : <Menu />}
</div>


{/* hire me  */}

<div className=' hidden md:flex items-center gap-2'>
    <motion.button
      onClick={() => setDark(!dark)}
      whileHover={variants.hover.button}
      whileTap={variants.hover.tap}
      className={theme.button.icon}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
<a href='#contact' className={`${theme.button.secondary}`}>Hireme</a>
</div>
        </div>
         {toggle && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden flex flex-col items-center gap-4 pb-6  overflow-hidden`}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setToggle(false)}
                className={`${theme.text.primary} hover:${theme.text.accent} text-4xl transition-colors pt-2`}
              >
                {link.label}
              </a>
            ))}

            <div className='flex items-center gap-3 pt-2'>
              <motion.button
                onClick={() => setDark(!dark)}
                whileTap={variants.hover.tap}
                className={theme.button.icon}
              >
                {dark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              <button className={theme.button.secondary}>Hire Me</button>
            </div>
          </motion.div>
        )}
      
        
    </motion.div>
  )
}

export default Navigation