import Link from 'next/link'
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">DriftsMan</h3>
            <p className="text-gray-300 text-sm">
              The best online store for all your needs. Quality products at competitive prices.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-5 w-5" />
                <span className="text-sm">123 Main St, City, Country</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-5 w-5" />
                <span className="text-sm">+1 234 567 890</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-5 w-5" />
                <span className="text-sm">info@driftsman.com</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/category/featured" className="text-gray-300 hover:text-white text-sm">Featured</Link></li>
              <li><Link href="/category/men" className="text-gray-300 hover:text-white text-sm">Men</Link></li>
              <li><Link href="/category/women" className="text-gray-300 hover:text-white text-sm">Women</Link></li>
              <li><Link href="/category/new-arrivals" className="text-gray-300 hover:text-white text-sm">New Arrivals</Link></li>
              <li><Link href="/category/trending" className="text-gray-300 hover:text-white text-sm">Trending</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white text-sm">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white text-sm">Terms & Conditions</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white text-sm">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Newsletter</h4>
              <p className="text-gray-300 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} DriftsMan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}