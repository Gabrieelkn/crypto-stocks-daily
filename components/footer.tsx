import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10 py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-20 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-sm hover:text-blue-400">
                  Stocks
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm hover:text-blue-400">
                  Crypto
                </Link>
              </li>

              <li>
                <Link href="/contact" className="text-sm hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} CryptoStocksDaily. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
