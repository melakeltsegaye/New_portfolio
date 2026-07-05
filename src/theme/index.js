export const theme = {
  // backgrounds
  bg: {
    page:    "bg-white       dark:bg-[hsl(240,52%,4%)]",
    card: "bg-gray-100 dark:bg-gray-900 shadow-[0_0_25px_-5px_rgba(16,185,129,0.35)] dark:shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]",
    nav:     "bg-white/80    dark:bg-white/8  backdrop-blur-md",
    badge:   "bg-purple-100  dark:bg-purple-900/40",
  },

  // text
  text: {
    primary:   "text-gray-900   dark:text-white",
    secondary: "text-gray-600   dark:text-gray-400",
    accent:    "text-purple-600 dark:text-purple-400",
    badge:     "text-purple-700 dark:text-purple-300",
  },
  // text
  padding: {
    pad:   "md:px-28 px-8",
   
  },
  // text
  bord: {
    bord:   "text-center text-white",
   
  },

  // borders
  border: {
    default: "border border-gray-200 dark:border-white/20",
    accent:  "border border-purple-400",
  },

  // buttons
  button: {
    primary:   "bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 transition-colors",
    secondary: "border border-purple-400 text-gray-500 hover:bg-purple-400/10 rounded-full px-6 py-2 transition-colors dark:text-white",
    icon:      "text-gray-600 dark:text-gray-300 hover:text-purple-400 dark:hover:text-purple-400 transition-colors p-2 md:p-3 border rounded-full bg-white/80    dark:bg-white/8  backdrop-blur-md md:scal-3",
  },

  // sections
  section: "px-8 md:px-28 py-20",
}


// ─── Framer Motion variants ───────────────────────────────────
export const variants = {

  // fade up — for headings, paragraphs
  fadeUp: {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },

  // fade in — for images, backgrounds
  fadeIn: {
    hidden:  { opacity: 0, y: -100, filter: "blur(130px)",},
    visible: { opacity: 1, y: 0, blure: 0,filter: "blur(0px)", transition: { duration: 1 } },
  },

  // slide in from left
  slideLeft: {
    hidden:  { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },

  // slide in from right
  slideRight: {
    hidden:  { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },

  // stagger container — for lists of cards
  staggerContainer: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.15 } },
  },

  // stagger item — children of staggerContainer
  staggerItem: {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },

  // hover effects
  hover: {
    card:   { y: -8,    transition: { duration: 0.2 } },
    button: { scale: 1.05, transition: { duration: 0.2 } },
    tap:    { scale: 0.95 },
    glow:   { boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)" },
  },
}