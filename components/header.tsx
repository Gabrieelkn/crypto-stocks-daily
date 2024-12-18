"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto">
        <div className="flex justify-between px-4 md:px-8 lg:px-20 items-center py-4">
          <div className="flex justify-start">
            <Link href="/" className="text-2xl font-bold text-primary">
              <Image src="/logo.svg" width={150} height={40} alt="logo" />
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/stocks"
              className="text-base font-medium text-gray-600 hover:text-primary"
            >
              Stocks
            </Link>
            <Link
              href="/crypto"
              className="text-base font-medium text-gray-600 hover:text-primary"
            >
              Crypto
            </Link>
            <Link
              href="/subscribe"
              className="px-4 bg-gray-800 rounded-md py-2 text-white hover:text-primary"
            >
              Subscribe
            </Link>
          </div>
          <div className="flex gap-2 items-center lg:hidden">
            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="bg-white rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 inset-x-0 z-50 p-4 transition transform origin-top-right lg:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
            <div className="px-5 pt-4 pb-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-primary">
                  <Image src="/logo.svg" width={150} height={40} alt="logo" />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="bg-white rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-4">
                  <Link
                    href="/stocks"
                    className="text-base font-medium text-gray-600 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Stocks
                  </Link>
                  <Link
                    href="/crypto"
                    className="text-base font-medium text-gray-600 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Crypto
                  </Link>
                </nav>
              </div>
            </div>
            <div className="px-5 py-6">
              <Link
                href="/subscribe"
                className="w-full bg-gray-800 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
