import { ExternalLink, Video, ShoppingCart, LayoutTemplate } from "lucide-react";
import { motion } from "framer-motion";
import { theme } from "../theme";

const projects = [
  {
    title: "Online Interview App",
    description:
      "A platform for conducting remote interviews online, built with a focus on real-time interaction and a smooth candidate/interviewer experience.",
    tags: ["React", "Node.js", "Real-time"],
    link: "https://online-interview-app-1.onrender.com/",
    icon: Video,
  },
  {
    title: "MERN E-Commerce",
    description:
      "A full-stack e-commerce application built on the MERN stack, covering product listings, cart flow, and order handling end to end.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://mern-e-commerce-5-ypjq.onrender.com/",
    icon: ShoppingCart,
  },
  {
    title: "Project 5",
    description:
      "A front-end project focused on clean layout and interactive UI, built and deployed as a static site.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://melakeltsegaye.github.io/project5/",
    icon: LayoutTemplate,
  },
];

// Container controls stagger timing for project cards
const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ProjectCard = ({ title, description, tags, link, icon: Icon }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    variants={cardVariants}
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 22 }}
    className={`${theme.bg.card} group relative rounded-md p-6 flex flex-col gap-4 overflow-hidden`}
  >
    {/* accent bar */}
    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 to-blue-500" />

    <div className="flex items-center justify-between">
      <motion.div
        whileHover={{ rotate: 8, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="h-11 w-11 rounded-lg bg-gradient-to-br from-emerald-400/20 to-blue-500/20 flex items-center justify-center"
      >
        <Icon className="h-5 w-5 text-emerald-400" strokeWidth={1.75} />
      </motion.div>
      <ExternalLink
        className={`${theme.text.secondary} h-4 w-4 transition-colors duration-200 group-hover:text-emerald-500`}
      />
    </div>

    <h3 className={`${theme.text.primary} text-xl font-semibold`}>{title}</h3>
    <p className={`${theme.text.secondary} text-sm leading-relaxed`}>{description}</p>

    <div className="flex flex-wrap gap-2 mt-auto pt-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-700/40 text-emerald-400"
        >
          {tag}
        </span>
      ))}
    </div>

    <span className="text-sm font-semibold text-emerald-500 inline-flex items-center gap-1 pt-1">
      View live project
      <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  </motion.a>
);

const Projects = () => {
  return (
    <div className={`${theme.padding.pad} py-14`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className={`${theme.text.primary} underline decoration-sky-600 font-bold text-3xl md:text-5xl`}>
          Projects
        </h1>
        <p className={`${theme.text.secondary} pt-2 text-2xl`}>Here are some of my projects</p>
      </motion.div>

      <motion.div
        className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;