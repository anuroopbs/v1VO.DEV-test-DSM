import Link from "next/link"
import { ChevronLeft, Calendar, Users, Download, HelpCircle, Gift, Star, Coffee } from "lucide-react"

export default function MiscellaneousServices() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-xs">
              <ChevronLeft className="w-3 h-3" />
              Back to Home
            </Link>
            <h1 className="text-lg font-bold ml-4">Dublin Sports Mentor</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="https://www.instagram.com/Dublinsquashmentor/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs flex items-center gap-1 text-gray-900 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span className="hidden sm:inline">@Dublinsquashmentor</span>
            </Link>
            <Link
              href="/under-construction"
              className="text-xs bg-[#111827] text-white px-3 py-1.5 rounded-md flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-in"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" x2="3" y1="12" y2="12"></line>
              </svg>
              Login / Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">Miscellaneous Services</h2>
            <p className="mt-1 text-sm text-gray-600">Explore additional services offered by Dublin Sports Mentor</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <Link
              href="/miscellaneous/join-friday-social"
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow flex flex-col items-center text-center"
            >
              <Calendar className="w-8 h-8 text-[#111827] mb-2" />
              <h3 className="text-sm font-bold mb-1">Join Social Friday</h3>
              <p className="text-xs text-gray-600">Weekly social events</p>
            </Link>

            <Link
              href="/download"
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow flex flex-col items-center text-center"
            >
              <Download className="w-8 h-8 text-[#111827] mb-2" />
              <h3 className="text-sm font-bold mb-1">App Download</h3>
              <p className="text-xs text-gray-600">Get our mobile app</p>
            </Link>

            <Link
              href="/under-construction"
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow flex flex-col items-center text-center"
            >
              <Users className="w-8 h-8 text-[#111827] mb-2" />
              <h3 className="text-sm font-bold mb-1">Sports Quiz</h3>
              <p className="text-xs text-gray-600">Test your knowledge</p>
            </Link>

            <Link
              href="/under-construction"
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow flex flex-col items-center text-center"
            >
              <HelpCircle className="w-8 h-8 text-[#111827] mb-2" />
              <h3 className="text-sm font-bold mb-1">Under Construction</h3>
              <p className="text-xs text-gray-600">Coming soon</p>
            </Link>

            <Link
              href="/under-construction"
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow flex flex-col items-center text-center"
            >
              <Gift className="w-8 h-8 text-[#111827] mb-2" />
              <h3 className="text-sm font-bold mb-1">Under Construction</h3>
              <p className="text-xs text-gray-600">Coming soon</p>
            </Link>

            <Link
              href="/under-construction"
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow flex flex-col items-center text-center"
            >
              <Star className="w-8 h-8 text-[#111827] mb-2" />
              <h3 className="text-sm font-bold mb-1">Under Construction</h3>
              <p className="text-xs text-gray-600">Coming soon</p>
            </Link>

            <Link
              href="/under-construction"
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow flex flex-col items-center text-center"
            >
              <Coffee className="w-8 h-8 text-[#111827] mb-2" />
              <h3 className="text-sm font-bold mb-1">Under Construction</h3>
              <p className="text-xs text-gray-600">Coming soon</p>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-[#111827] hover:underline">
              <ChevronLeft className="w-3 h-3" />
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
