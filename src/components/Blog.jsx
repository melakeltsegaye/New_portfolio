import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { theme } from "../theme";

const posts = [
  {
    number: "01",
    category: "Backend",
    title: "About Django",
    excerpt:
      "A walkthrough of Django's 'batteries-included' philosophy — setting up models, views, and URLs to build a simple furniture site from scratch.",
    date: "Feb 29, 2024",
    readTime: "7 min read",
    link: "https://medium.com/@melakeltsegaye/about-django-0d899ed6d4b3",
  },
  {
    number: "02",
    category: "Web Scraping",
    title: "About Addis Mercato",
    excerpt:
      "Scraping product data from Addis Mercato's online store with Python and BeautifulSoup, then piping the results straight into a Telegram bot and channel.",
    date: "Feb 29, 2024",
    readTime: "9 min read",
    link: "https://medium.com/@melakeltsegaye/about-addis-mercato-b6c72ced28a8",
  },
  {
    number: "03",
    category: "APIs",
    title: "About Last.fm",
    excerpt:
      "Connecting to the Last.fm API with plain JavaScript to fetch top tracks and artist info, then rendering results dynamically on a page.",
    date: "Feb 29, 2024",
    readTime: "6 min read",
    link: "https://medium.com/@melakeltsegaye/about-last-fm-73079917cdc4",
  },
];

// Container controls stagger timing for post rows
const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const PostRow = ({ number, category, title, excerpt, date, readTime, link }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    variants={rowVariants}
    whileHover={{ x: 8 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className={`group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-7 border-b border-gray-700/40 transition-colors duration-300 hover:border-emerald-500/60 `}
  >
    <span className="text-3xl md:text-4xl font-bold text-gray-700/60 group-hover:text-emerald-500 transition-colors duration-300 md:w-16 shrink-0">
      {number}
    </span>

    <div className="flex-1">
      <div className="flex items-center gap-3 mb-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
          {category}
        </span>
        <span className="h-1 w-1 rounded-full bg-gray-600" />
        <span className={`${theme.text.secondary} text-xs`}>{date}</span>
        <span className="h-1 w-1 rounded-full bg-gray-600" />
        <span className={`${theme.text.secondary} text-xs`}>{readTime}</span>
      </div>

      <h3
        className={`${theme.text.primary} text-xl md:text-2xl font-semibold transition-colors duration-300 group-hover:text-emerald-400`}
      >
        {title}
      </h3>
      <p className={`${theme.text.secondary} text-sm md:text-base leading-relaxed mt-1.5 max-w-2xl`}>
        {excerpt}
      </p>
    </div>

    <ArrowUpRight
      className={`${theme.text.secondary} h-6 w-6 shrink-0 transition-all duration-300 group-hover:text-emerald-500 group-hover:translate-x-1 group-hover:-translate-y-1`}
    />
  </motion.a>
);

const Blog = () => {
  return (
    <div className={`${theme.padding.pad} py-14`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className={`${theme.text.primary} font-bold pb-2 text-3xl md:text-5xl`}>Writing</h1>
        <p className={`${theme.text.secondary} text-2xl`}>Thoughts on code, design, and the future.</p>
      </motion.div>

      <motion.div
        className="flex flex-col mt-4"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {posts.map((post) => (
          <PostRow key={post.number} {...post} />
        ))}
      </motion.div>
    </div>
  );
};

export default Blog;