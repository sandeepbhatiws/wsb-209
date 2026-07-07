import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">
                <span className="text-white">FURNI</span>
                <span className="text-amber-600">HOME</span>
              </h1>
              <p className="text-xs text-gray-400 tracking-widest mt-2">LIVE BEAUTIFULLY</p>
              <p className="text-sm text-gray-400 mt-4">
                Your one-stop destination for premium furniture and home decor.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="hover:text-amber-600 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-amber-600 transition">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-amber-600 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-amber-600 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-5">
              Categories
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/furniture/living-room" className="hover:text-amber-600 transition">
                  Living Room
                </a>
              </li>
              <li>
                <a href="/furniture/bedroom" className="hover:text-amber-600 transition">
                  Bedroom
                </a>
              </li>
              <li>
                <a href="/furniture/dining" className="hover:text-amber-600 transition">
                  Dining
                </a>
              </li>
              <li>
                <a href="/furniture/office" className="hover:text-amber-600 transition">
                  Office
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-5">
              Policies
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/privacy" className="hover:text-amber-600 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-amber-600 transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-amber-600 transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-amber-600 transition">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-5">
              Get in Touch
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <a href="mailto:support@furnihome.com" className="hover:text-amber-600 transition">
                  support@furnihome.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <span>Jodhpur, Rajasthan, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          
          {/* Copyright */}
          <div className="text-sm text-gray-400 mb-6 md:mb-0">
            <p>© 2024 <span className="text-white font-semibold">FURNIHOME</span>. All Rights Reserved.</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-6">
            <a 
              href="#facebook" 
              className="text-gray-400 hover:text-amber-600 transition"
              aria-label="Facebook"
            >
             
            </a>
            <a 
              href="#twitter" 
              className="text-gray-400 hover:text-amber-600 transition"
              aria-label="Twitter"
            >
           
            </a>
            <a 
              href="#instagram" 
              className="text-gray-400 hover:text-amber-600 transition"
              aria-label="Instagram"
            >
              
            </a>
            <a 
              href="#linkedin" 
              className="text-gray-400 hover:text-amber-600 transition"
              aria-label="LinkedIn"
            >
             
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}