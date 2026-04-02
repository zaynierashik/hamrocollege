"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full relative z-50">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="cursor-pointer h-12 flex items-center">
          <Image
            src="/logo.png"
            alt="Luise Walther Logo"
            width={150}
            height={48}
            priority
            className="h-12 w-auto"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-2 bg-white rounded-full px-2 py-2 shadow-sm border border-gray-100">
          <a
            href="#"
            className="px-6 py-2.5 rounded-full bg-primary text-white text-base font-normal transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="px-6 py-2.5 rounded-full text-gray-600 hover:text-gray-900 text-base font-normal transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="px-6 py-2.5 rounded-full text-gray-600 hover:text-gray-900 text-base font-normal transition-colors"
          >
            Was tue ich
          </a>
          <a
            href="#"
            className="px-6 py-2.5 rounded-full text-gray-600 hover:text-gray-900 text-base font-normal transition-colors"
          >
            Angebote
          </a>
          <a
            href="#"
            className="px-6 py-2.5 rounded-full text-gray-600 hover:text-gray-900 text-base font-normal transition-colors"
          >
            Shop
          </a>
          <a
            href="#"
            className="px-6 py-2.5 rounded-full text-gray-600 hover:text-gray-900 text-base font-normal transition-colors"
          >
            Kontakt
          </a>
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-white bg-primary hover:bg-primary-hover text-base font-medium transition-colors"
          >
            BOOK ONLINE
          </a>
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
          <a
            href="#"
            className="text-gray-600 hover:text-primary text-lg font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-primary text-lg font-medium"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-primary text-lg font-medium"
          >
            Was tue ich
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-primary text-lg font-medium"
          >
            Angebote
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-primary text-lg font-medium"
          >
            Shop
          </a>
          <a
            href="#kontakt"
            className="text-primary font-medium text-lg pt-2 border-t border-gray-100"
          >
            BOOK ONLINE
          </a>
        </div>
      )}
    </nav>
  );
}
