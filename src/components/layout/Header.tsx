"use client";
import React, { useState, useEffect } from "react";
import { Container } from "./Container";
import { Button } from "../ui/Button";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Vehicles", megaKey: "vehicles" },
    { label: "Offers", href: "/offers" },
    { label: "Finance", href: "/finance" },
    { label: "Exchange", href: "/exchange" },
    { label: "Branches", href: "/branches" },
  ];

  return (
    <header className={`w-full z-40 transition-all duration-200 ${isSticky ? "fixed top-0 left-0 bg-white shadow-md" : "relative bg-white border-b border-gray-150"}`}>
      {/* Announcement Bar */}
      <div className="w-full bg-[#111111] text-white py-2 text-center text-xs font-semibold tracking-wide">
        🚨 Special Offers Active for South & West Odisha! Explore Toyota Hybrid range now.
      </div>

      <Container className="flex items-center justify-between h-20">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-[#EB0A1E] font-bold text-2xl tracking-wider">TOYOTA</span>
          <span className="text-gray-400 font-light text-xl">|</span>
          <span className="text-[#111111] font-semibold text-lg tracking-tight">Laxmi Toyota</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.megaKey && setActiveMegaMenu(link.megaKey)}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              {link.megaKey ? (
                <button className="text-gray-700 hover:text-[#EB0A1E] font-medium h-20 flex items-center transition-colors">
                  {link.label}
                </button>
              ) : (
                <a href={link.href} className="text-gray-700 hover:text-[#EB0A1E] font-medium transition-colors">
                  {link.label}
                </a>
              )}

              {/* Mega Menu Stub */}
              {link.megaKey && activeMegaMenu === link.megaKey && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-xl rounded-b-2xl border-t-2 border-[#EB0A1E] p-6 grid grid-cols-3 gap-6 animate-fade-in z-50">
                  <div>
                    <h4 className="font-bold text-[#111111] mb-3 border-b pb-1 text-sm uppercase">Popular SUVs</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="/vehicles/fortuner" className="hover:text-[#EB0A1E]">Fortuner</a></li>
                      <li><a href="/vehicles/hyryder" className="hover:text-[#EB0A1E]">Hyryder</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-3 border-b pb-1 text-sm uppercase">Hatchbacks & MPVs</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="/vehicles/glanza" className="hover:text-[#EB0A1E]">Glanza</a></li>
                      <li><a href="/vehicles/rumion" className="hover:text-[#EB0A1E]">Rumion</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-3 border-b pb-1 text-sm uppercase">Hybrid RANGE</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="/vehicles/hycross" className="hover:text-[#EB0A1E]">Innova Hycross</a></li>
                      <li><a href="/vehicles/camry" className="hover:text-[#EB0A1E]">Camry Hybrid</a></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/book-online">
            <Button variant="primary">Book Online</Button>
          </a>
        </div>

        {/* Mobile Hamburguer */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-between w-6 h-5 z-50"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          <span className={`w-full h-0.5 bg-gray-800 transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-full h-0.5 bg-gray-800 transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`w-full h-0.5 bg-gray-800 transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </Container>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-30 pt-24 px-6 flex flex-col gap-6 md:hidden animate-slide-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href || "/vehicles"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-semibold text-[#111111] hover:text-[#EB0A1E]"
            >
              {link.label}
            </a>
          ))}
          <a href="/book-online" onClick={() => setIsMobileMenuOpen(false)} className="w-full mt-4">
            <Button variant="primary" className="w-full">Book Online</Button>
          </a>
        </div>
      )}
    </header>
  );
};
