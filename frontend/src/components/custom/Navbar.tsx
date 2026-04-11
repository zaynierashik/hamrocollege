"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "courses", label: "Courses" },
    { id: "colleges", label: "Colleges" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const updateActiveSection = () => {
      const about = document.getElementById("about");
      const courses = document.getElementById("courses");
      const colleges = document.getElementById("colleges");
      const contact = document.getElementById("contact");

      if (!about || !courses || !colleges || !contact) return;

      const y = window.scrollY + 140;

      if (y < about.offsetTop) {
        setActiveSection("home");
      } else if (y < courses.offsetTop) {
        setActiveSection("about");
      } else if (y < colleges.offsetTop) {
        setActiveSection("courses");
      } else if (y < contact.offsetTop) {
        setActiveSection("colleges");
      } else {
        setActiveSection("contact");
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const desktopItemClass = (id: string) =>
    id === activeSection
      ? "px-4 py-2 rounded-full bg-primary text-white text-sm font-medium shadow-sm transition-all duration-300 ease-out"
      : "px-4 py-2 rounded-full bg-transparent text-gray-700 hover:text-gray-900 hover:bg-white/50 text-sm font-medium transition-all duration-300 ease-out";

  const mobileItemClass = (id: string) =>
    id === activeSection
      ? "text-primary text-lg font-semibold transition-colors duration-300 ease-out"
      : "text-gray-600 hover:text-primary text-lg font-medium transition-colors duration-300 ease-out";

  return (
    <nav className="w-full relative z-50">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="cursor-pointer h-12 flex items-center">
          <Image
            src="/logo.png"
            alt="Luise Walther Logo"
            width={150}
            height={48}
            priority
            className="h-12 w-auto"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-1 bg-white/65 backdrop-blur-xl rounded-full px-1.5 py-1.5 border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.08)] fixed top-6 left-1/2 -translate-x-1/2 z-50">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={desktopItemClass(item.id)}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-white uppercase bg-primary hover:bg-primary-hover text-base font-medium transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-900 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <iconify-icon
            icon="solar:hamburger-menu-linear"
            width="24"
            height="24"
          ></iconify-icon>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 px-6 py-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={mobileItemClass(item.id)}
              onClick={() => {
                setActiveSection(item.id);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white uppercase bg-primary hover:bg-primary-hover text-sm font-medium transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
