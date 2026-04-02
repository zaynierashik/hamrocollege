"use client";

export default function Footer() {
  const links = ["Home", "About", "Courses", "Colleges", "Contact"];

  return (
    <footer className="bg-[#111827] pt-16 relative overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10 pb-20 lg:pb-32">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 border-b border-gray-800 pb-12 mb-8">
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-base font-medium text-gray-400">
            {links.map((link, index) => (
              <a
                key={index}
                href={link === "Home" ? "#" : `#${link.toLowerCase()}`}
                className="hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-gray-500 font-light text-sm text-center lg:text-right max-w-sm">
            © 2026 HAMROCOLLEGE
          </div>
        </div>
      </div>

      {/* Huge Ghost Text Watermark */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none select-none flex justify-center translate-y-[20%] pointer-events-none">
        <span className="font-display font-medium text-[20vw] text-white/5 whitespace-nowrap tracking-tighter">
          HAMROCOLLEGE
        </span>
      </div>
    </footer>
  );
}
