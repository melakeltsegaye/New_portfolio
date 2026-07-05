import { useEffect, useRef, useState } from "react";
import { Calendar, Briefcase, Smile, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { theme } from "../theme";

const stats = [
  { end: 5, suffix: "+", label: "YEARS EXPERIENCE", icon: Calendar },
  { end: 10, suffix: "+", label: "PROJECTS COMPLETED", icon: Briefcase },
  { end: 3, suffix: "+", label: "HAPPY CLIENTS", icon: Smile },
  { end: 100, suffix: "K+", label: "LINES OF CODE", icon: Code2 },
];

// Container controls stagger timing for the stat cards
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Counts a number up from 0 to `end` once the element scrolls into view.
const Counter = ({ end, duration = 1600 }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // ease-out for a snappier finish
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{value}</span>;
};

const Exp = () => {
  return (
    <div className={`${theme.padding.pad} py-14 object-center`}>
      <div className={`w-full rounded-lg p-[1.4px] bg-gradient-to-r ${theme.bg.card} shadow-[0_0_0_1px_rgba(255,255,255,0.02)]`}>
        <motion.div
          className={` w-full rounded-lg rounded-[calc(0.375rem-1.5px)] grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-700/60  px-2 py-10`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map(({ end, suffix, label, icon: Icon }, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              className={`${theme.bord.bord} group flex flex-col items-center justify-center gap-2 px-4 py-6 text-center transition-colors duration-300 hover:bg-white/[0.03]`}
            >
              <Icon
                className="mb-1 h-5 w-5 text-blue-400 opacity-80 transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.75}
              />
              <h1 className={`text-3xl ${theme.text.primary} md:text-5xl font-semibold tabular-nums`}>
                <Counter end={end} />
                <span className="text-blue-600">{suffix}</span>
              </h1>
              <h1 className={`${theme.text.secondary} text-xs md:text-sm tracking-wider`}>
                {label}
              </h1>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Exp;