import { GraduationCap, Code2, Briefcase, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { theme } from "../theme";

// Placeholder milestones — swap in your real dates/roles.
const journey = [
  {
    year: "2021",
    title: "Started Learning to Code",
    place: "Self-taught / Online",
    description:
      "Picked up HTML, CSS, and JavaScript fundamentals, building small projects to understand how the web actually works.",
    icon: Code2,
  },
  {
    year: "2022",
    title: "BS Computer Science",
    place: "American College of Technology",
    description:
      "Began formal studies, diving into data structures, algorithms, and the theory behind the code I'd already been writing.",
    icon: GraduationCap,
  },
  {
    year: "2024",
    title: "First Freelance Projects",
    place: "Independent",
    description:
      "Took on real client work — building full-stack apps end to end, from database design to deployment.",
    icon: Briefcase,
  },
  {
    year: "2025",
    title: "Graduated & Building",
    place: "American College of Technology",
    description:
      "Graduated and shifted focus toward polished, production-ready products — performance, design, and architecture all matter now.",
    icon: Rocket,
  },
];

const Experience = () => {
  return (
    <div className={`${theme.padding.pad} py-14`}>
      <motion.div
        className="flex justify-center pb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className={`${theme.text.primary} text-3xl md:text-5xl font-bold`}>
          My
          <span className="text-blue-600"> Journey</span>
        </h1>
      </motion.div>

      <div className="relative max-w-3xl mx-auto py-8">
        {/* vertical gradient line — draws downward as it enters view */}
        <motion.div
          className="absolute left-[19px] md:left-1/2 top-0 md:-translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-emerald-400 via-blue-500 to-purple-500 origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        <div className="flex flex-col gap-10">
          {journey.map((item, i) => {
            const Icon = item.icon;
            const isRight = i % 2 === 0;
            return (
              <div
                key={item.year}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 ${
                  isRight ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* node */}
                <motion.div
                  className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 border-2 border-emerald-400 shadow-[0_0_15px_-2px_rgba(52,211,153,0.6)]"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.15, ease: "backOut" }}
                >
                  <Icon className="h-4 w-4 text-emerald-400" strokeWidth={1.75} />
                </motion.div>

                {/* spacer for the opposite side on desktop */}
                <div className="hidden md:block md:w-1/2" />

                {/* card — slides in from its respective side */}
                <motion.div
                  initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className={`${theme.bg.carde ?? theme.bg.card} ml-14 md:ml-0 md:w-1/2 rounded-md p-5 ${
                    isRight ? "md:pl-10" : "md:pr-10"
                  }`}
                >
                  <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
                    {item.year}
                  </span>
                  <h3 className={`${theme.text.primary} text-lg font-semibold mt-1`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-blue-400 font-medium mt-0.5">{item.place}</p>
                  <p className={`${theme.text.secondary} text-sm leading-relaxed mt-2`}>
                    {item.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;