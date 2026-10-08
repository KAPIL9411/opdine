import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white px-5 py-16 md:px-16 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img 
              src="/images/logo.png" 
              alt="opdine" 
              className="mb-4 h-8 w-auto"
            />
            <p className="max-w-sm text-sm leading-relaxed text-gray-600">
              opdine — Restaurant operating system for the modern dine-in experience.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-sm text-gray-600 transition-colors hover:text-red-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm text-gray-600 transition-colors hover:text-red-600">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#restaurants" className="text-sm text-gray-600 transition-colors hover:text-red-600">
                  For Restaurants
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#contact" className="text-sm text-gray-600 transition-colors hover:text-red-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="https://instagram.com/opdine" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-red-600">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-sm text-gray-600 transition-colors hover:text-red-600">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-sm text-gray-600 transition-colors hover:text-red-600">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} opdine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
