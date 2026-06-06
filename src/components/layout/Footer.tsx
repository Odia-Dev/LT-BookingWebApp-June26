import React from "react";
import { Container } from "./Container";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white py-16 mt-auto border-t-4 border-[#EB0A1E]">
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold tracking-wider text-[#EB0A1E]">TOYOTA</span>
          <p className="text-sm text-gray-400">
            Authorized Toyota Dealership serving South & West Odisha. Trust, quality, and exceptional customer experience.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-base mb-4 tracking-wider uppercase text-gray-200">Vehicles</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/vehicles/glanza" className="hover:text-white transition-colors">Glanza</a></li>
            <li><a href="/vehicles/hyryder" className="hover:text-white transition-colors">Hyryder</a></li>
            <li><a href="/vehicles/fortuner" className="hover:text-white transition-colors">Fortuner</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-base mb-4 tracking-wider uppercase text-gray-200">Services</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/finance" className="hover:text-white transition-colors">Finance Assistance</a></li>
            <li><a href="/exchange" className="hover:text-white transition-colors">Exchange Evaluation</a></li>
            <li><a href="/branches" className="hover:text-white transition-colors">Our Showrooms</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-base mb-4 tracking-wider uppercase text-gray-200">Contact</h4>
          <p className="text-sm text-gray-400 mb-2">Brahmapur Main Road, Ganjam, Odisha</p>
          <p className="text-sm text-gray-400">Email: info@laxmitoyota.com</p>
        </div>
      </Container>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Laxmi Toyota. All rights reserved. Non-ERP Dealership Platform.
      </div>
    </footer>
  );
};
