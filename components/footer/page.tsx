import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[var(--secondary-color)]  bg-opacity-80 text-black p-6 text-sm w-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Your Path to Better Health Starts Here</h2>
        
        {/* <button className="border  px-4 py-2 mb-4 hover:bg-white hover:text-black transition-colors">
          English
        </button> */}
        
        <nav className="mb-4">
          <ul className="space-y-2">
            <li><Link href="/about" className="text-[var(--primary-color)]">About Us</Link></li>
            <li><Link href="/privacy" className="text-[var(--primary-color)]">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-[var(--primary-color)]">Terms of Service</Link></li>
            <li><Link href="/health-privacy" className="text-[var(--primary-color)]">Consumer Health Data Privacy Policy</Link></li>
            <li><button className="hover:underline text-[var(--primary-color)]">Cookie settings</button></li>
            <li><Link href="/terms-conditions" className="text-[var(--primary-color)]">Terms & Conditions</Link></li>
          </ul>
        </nav>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p className="text-[var(--primary-color)]">Email: support@HelloDoctor.com</p>
          <p className="text-[var(--primary-color)]">Phone: 3498134803134809</p>
        </div>
        
        <div className="text-xs text-black">
          © 2024 HelloDoctor. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;