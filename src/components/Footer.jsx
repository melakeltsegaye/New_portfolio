import {  Mail, ArrowUp } from "lucide-react";
import { theme } from "../theme";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa"; 

const links = [
  { icon: SiGithub, href: "https://github.com/melakeltsegaye", label: "GitHub" },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/melakel-tsegaye-bb5761245/?skipRedirect=true",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:melakeltsegaye@gmail.com", label: "Email" },
];

const navItems = ["About", "Skills", "Projects", "Journey", "Writing", "Contact"];

const scrollToTop = () => {
  const el = document.getElementById("home");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={`${theme.bg.card} relative border-t border-gray-700/40`}>
      <div className={`${theme.padding.pad} py-10`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Brand */}
          <div>
            <h2 className={`${theme.text.primary} text-2xl font-bold`}>
              Melakel<span className="text-emerald-500">.</span>
            </h2>
            <p className={`${theme.text.secondary} text-sm mt-1 max-w-xs`}>
              Building clean, functional web experiences from Addis Ababa, Ethiopia.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`${theme.text.secondary} text-sm hover:text-emerald-400 transition-colors duration-200`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {links.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`${theme.bg.card} group flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-gradient-to-br hover:from-emerald-400 hover:to-blue-500`}
              >
                <Icon
                  className={`${theme.text.secondary} h-4 w-4 group-hover:text-gray-900 transition-colors duration-200`}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-700/30 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <p className={`${theme.text.secondary} text-xs`}>
            © {year} Melak Tsegaye. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800/60">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
