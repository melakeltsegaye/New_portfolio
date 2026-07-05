import { theme, variants } from "../theme"
import { motion } from "framer-motion"
import { ChevronRight, Download, ArrowRight } from "lucide-react"
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa"; 
import { useState, useEffect } from "react";
import OrbitDashboard from "../assets/OrbitDashboard";

// Container controls stagger timing for children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Each child fades up into place
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Hero = () => {
    const phrases = [
  "Full Stack Developer",
  "React & Next.js Enthusiast",
  "UI/UX Tinkerer",
  "Problem Solver",
];


  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // typing forward
        setText(currentPhrase.slice(0, text.length + 1));
        if (text.length + 1 === currentPhrase.length) {
          // pause at full word before deleting
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        // deleting
        setText(currentPhrase.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <div className={`${theme.padding.pad} w-full flex justify-between items-center pt-9 md:pt-3`}>


{/* introduction */}

<motion.div
  className="flex flex-col"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
<motion.div
  variants={itemVariants}
  className={`flex gap-2 items-center px-4 py-1 rounded-full ${theme.bg.nav} ${theme.border.default} w-fit`}
>
    <motion.div
  className="w-3 h-3 bg-emerald-600 rounded-full"
  animate={{
    boxShadow: [
      "0 0 4px 0px rgba(5, 150, 105, 0.7)",
      "0 0 16px 4px rgba(5, 150, 105, 0.9)",
      "0 0 4px 0px rgba(5, 150, 105, 0.7)",
    ],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
    <p className="text-gray-600">
    open to opportunties
    </p>
</motion.div>

<motion.div variants={itemVariants} className="py-7 md:py-9 text-5xl md:text-7xl font-bold space-y-1">
    <h1 className={`${theme.text.primary}`}>Hi, i'm </h1>
    <h1 className="text-blue-700">Melakel tsegaye</h1>
</motion.div>

<motion.div variants={itemVariants} className="flex items-center gap-3">
    <ChevronRight className="text-emerald-600 size-9" />
    <span className={`font-mono text-2xl ${theme.text.primary}`}>
        {text}
        <span className="animate-pulse">|</span>
      </span>
</motion.div>


<motion.div variants={itemVariants} className="text-gray-400 text-lg py-7 md:py-9 md:w-2xl">
    I build high-performance digital experiences that live at the intersection of engineering precision and creative vision.
</motion.div>


<motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start-end gap-4 pt-5">

<motion.a
  href="#projects"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="flex items-center gap-2 text-white px-6 py-3 rounded-full bg-gradient-to-br from-[hsl(262,83%,58%)] to-[hsl(221,83%,53%)] cursor-pointer w-fit "
>
    <p>View My Work</p>
    <ArrowRight />
    </motion.a>
<motion.a
href="/CV_Melakel_Tsegaye_Zewide.pdf"
  download="Melakel_Tsegaye_Zewide_CV.pdf"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="w-fit"
>
  <div className={`flex items-center gap-2 px-6 py-3 rounded-full ${theme.text.primary} ${theme.border.default} ${theme.bg.nav} cursor-pointer w-fit`}>
    <Download />
    <p>Download CV</p>
  </div>
</motion.a>
</motion.div>

<motion.div variants={itemVariants} className="flex items-center gap-3 py-7 h-7xl md:py-9">
<motion.a
  href="https://github.com/melakeltsegaye"
  whileHover={{ scale: 1.15, rotate: -6 }}
  whileTap={{ scale: 0.9 }}
  className={`${theme.button.icon}`}
>
    <SiGithub />
</motion.a>
<motion.a
  href="https://x.com/MelakelTsegaye"
  whileHover={{ scale: 1.15, rotate: -6 }}
  whileTap={{ scale: 0.9 }}
  className={`${theme.button.icon}`}
>
    <SiX />
</motion.a>
<motion.a
  href="https://www.linkedin.com/in/melakel-tsegaye-bb5761245/?skipRedirect=true"
  whileHover={{ scale: 1.15, rotate: -6 }}
  whileTap={{ scale: 0.9 }}
  className={`${theme.button.icon}`}
>
    <FaLinkedin />
</motion.a>
</motion.div>

</motion.div>


{/* hero img */}

<motion.div
  className="hidden lg:block flex items-center"
  initial={{ opacity: 0, scale: 0.85 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
>
<OrbitDashboard />
</motion.div>


    </div>
  )
}

export default Hero