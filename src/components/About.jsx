import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../theme";

const tabs = {
  philosophy: {
    title: "Philosophy",
    content: (
      <p className={`${theme.text.secondary} text-lg leading-relaxed`}>
        I believe that the best software feels like an extension of the
        user's thought process. It should be fast, intuitive, and visually
        arresting. My work bridges the gap between deep technical
        architecture and polished user interfaces.
      </p>
    ),
  },
  education: {
    title: "Education",
    content: (
      <div className="flex flex-col gap-3">
        <div>
          <h2 className={`${theme.text.primary} text-xl font-semibold`}>
            BS Computer Science
          </h2>
          <p className={`${theme.text.secondary} text-base`}>
            American College of Technology
          </p>
          <p className="text-emerald-500 text-sm font-medium mt-1">2025</p>
        </div>

        <div className="pt-2">
          <p className={`${theme.text.secondary} text-sm font-semibold uppercase tracking-wider mb-2`}>
            Relevant Coursework
          </p>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
            {["Machine Learning", "Distributed Systems", "Human-Computer Interaction", "Advanced Algorithms"].map(
              (course) => (
                <li
                  key={course}
                  className={`${theme.text.secondary} text-sm flex items-center gap-2`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {course}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    ),
  },
};

const InfoCard = () => {
  const [active, setActive] = useState("philosophy");

  return (
    <div className={`${theme.bg.card} rounded-md p-6 w-full md:w-[420px] min-h-[260px]`}>
      <div className="relative flex gap-6 mb-5 border-b border-gray-700/50 pb-3">
        {Object.entries(tabs).map(([key, { title }]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`relative text-lg font-semibold transition-colors duration-200 pb-3 -mb-3 ${
              active === key
                ? `${theme.text.primary}`
                : `${theme.text.secondary} hover:text-emerald-500`
            }`}
          >
            {title}
            {active === key && (
              <motion.div
                layoutId="tab-underline"
                className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-emerald-500"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {tabs[active].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const About = () => {
  return (
    <div className={`${theme.padding.pad} py-14`}>
      <motion.div
        className="flex flex-col md:flex-row w-full justify-between items-center gap-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-2xl">
          <div className="flex gap-2 items-center ">
            <h1 className={`${theme.text.primary} font-bold text-3xl md:text-5xl pb-4`}>About Me</h1>
            <div className="border border-1 w-20 border-blue-800" />
          </div>
          <p className={`${theme.text.secondary}  text-2xl`}>
            I'm a multidisciplinary engineer who cares deeply about the intersection of design and robust architecture.
          </p>
          <p className={`${theme.text.secondary} pt-4  text-2xl`}>
            When I'm not writing code, I'm exploring digital art, reading sci-fi, or contributing to open-source UI libraries. My goal is to build digital products that feel inevitable.
          </p>
        </div>

        <InfoCard />
      </motion.div>
    </div>
  );
};

export default About;