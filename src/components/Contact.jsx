import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../theme";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa"; 

const CONTACT_EMAIL = "melakeltsegaye@gmail.com";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: SiGithub,
    label: "GitHub",
    value: "melakeltsegaye",
    href: "https://github.com/melakeltsegaye",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "melakel-tsegaye",
    href: "https://www.linkedin.com/in/melakel-tsegaye-bb5761245/?skipRedirect=true",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Addis Ababa, Ethiopia",
    href: null,
  },
];

// Stagger timing for contact link cards
const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "your site"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );

    // Opens the visitor's own email client with everything pre-filled —
    // works with zero backend, API keys, or third-party service signup.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className={`${theme.padding.pad} py-14`}>
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className={`${theme.text.primary} font-bold text-3xl md:text-5xl`}>
          Get In <span className="text-blue-600">Touch</span>
        </h1>
        <p className={`${theme.text.secondary} text-2xl pt-2`}>
          Have a project in mind? Let's talk.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact info */}
        <motion.div
          className="flex flex-col gap-4"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {contactLinks.map(({ icon: Icon, label, value, href }) => {
            const Wrapper = href ? motion.a : motion.div;
            return (
              <Wrapper
                key={label}
                {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
                variants={itemVariants}
                whileHover={href ? { x: 6, y: -2 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`${theme.bg.carde} group flex items-center gap-4 rounded-md p-4 ${
                  href ? "cursor-pointer" : ""
                }`}
              >
                <div className="h-11 w-11 shrink-0 rounded-lg bg-gradient-to-br from-emerald-400/20 to-blue-500/20 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-emerald-400" strokeWidth={1.75} />
                </div>
                <div>
                  <p className={`${theme.text.secondary} text-xs uppercase tracking-wider`}>
                    {label}
                  </p>
                  <p
                    className={`${theme.text.primary} font-medium ${
                      href ? "group-hover:text-emerald-400 transition-colors duration-300" : ""
                    }`}
                  >
                    {value}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </motion.div>

        {/* Contact form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`${theme.bg.card} rounded-md p-6 flex flex-col gap-4`}
        >
          <div>
            <label className={`${theme.text.secondary} text-xs uppercase tracking-wider`}>Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="mt-1 w-full rounded-md bg-gray-800/60 border border-gray-700/50 px-3 py-2.5 text-gray-100 placeholder:text-white outline-none focus:border-emerald-400 transition-colors duration-200"
            />
          </div>

          <div>
            <label className={`${theme.text.secondary} text-xs uppercase tracking-wider`}>Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md bg-gray-800/60 border border-gray-700/50 px-3 py-2.5 text-gray-100 placeholder:text-white outline-none focus:border-emerald-400 transition-colors duration-200"
            />
          </div>

          <div>
            <label className={`${theme.text.secondary} text-xs uppercase tracking-wider`}>Message</label>
            <textarea
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              className="mt-1 w-full rounded-md bg-gray-800/60 border border-gray-700/50 px-3 py-2.5 text-gray-100 placeholder:text-white outline-none focus:border-emerald-400 transition-colors duration-200 resize-none"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="mt-2 flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-gray-900 font-semibold py-2.5 transition-opacity duration-200 hover:opacity-90"
          >
            <Send className="h-4 w-4" />
            Send Message
          </motion.button>

          <AnimatePresence>
            {sent && (
              <motion.p
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-emerald-400 text-sm text-center pt-1 overflow-hidden"
              >
                Opening your email app... if nothing happened, email me directly at {CONTACT_EMAIL}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;