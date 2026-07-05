import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../theme";

const levelFromPercent = (p) => {
  if (p >= 90) return "Expert";
  if (p >= 75) return "Advanced";
  if (p >= 50) return "Intermediate";
  return "Beginner";
};

const skillData = {
  Frontend: [
    { name: "React", percent: 90 },
    { name: "Tailwind", percent: 85 },
    { name: "JavaScript", percent: 88 },
    { name: "TypeScript", percent: 75 },
  ],
  Backend: [
    { name: "Django", percent: 80 },
    { name: "Node.js", percent: 85 },
    { name: "Express", percent: 75 },
    { name: "Python", percent: 82 },
  ],
  Database: [
    { name: "MongoDB", percent: 80 },
    { name: "SQL", percent: 75 },
  ],
};

// Container controls stagger timing for skill cards
const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardEnter = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// Animated circular "donut" progress ring for a single skill.
const Donut = ({ percent }) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  const size = 96;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const duration = 1200;

          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(eased * percent);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [percent]);

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-gray-700/40"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#donutGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`${theme.text.primary} text-lg font-semibold tabular-nums`}>
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

const SkillCard = ({ name, percent }) => (
  <motion.div
    variants={cardEnter}
    whileHover={{ y: -6, scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`${theme.bg.carde} rounded-md p-5 flex flex-col items-center gap-3`}
  >
    <Donut percent={percent} />
    <h3 className={`${theme.text.primary} font-semibold text-lg`}>{name}</h3>
    <span className="text-emerald-500 text-sm font-medium">
      {levelFromPercent(percent)}
    </span>
  </motion.div>
);

const Skills = () => {
  const categories = Object.keys(skillData);
  const [active, setActive] = useState(categories[0]);

  return (
    <div className={`${theme.padding.pad} py-6`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="w-full text-center">
          <h1 className={`${theme.text.primary} text-3xl md:text-5xl font-bold`}>Tech Stack</h1>
          <p className={`${theme.text.secondary} text-2xl pt-2`}>Tools I use to bring ideas to life</p>
        </div>

        <div className="flex gap-3 items-center py-6 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative px-5 py-2 rounded-full font-semibold text-sm md:text-base transition-colors duration-200 ${
                active === cat
                  ? "text-gray-900"
                  : `${theme.bg.carde} ${theme.text.secondary} hover:text-emerald-500`
              }`}
            >
              {active === cat && (
                <motion.div
                  layoutId="skill-tab-bg"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {skillData[active].map((skill) => (
              <SkillCard key={skill.name} name={skill.name} percent={skill.percent} />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Skills;