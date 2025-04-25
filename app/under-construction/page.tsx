import Link from "next/link"
import { ChevronLeft, Construction, AlertCircle, Calendar, Trophy, Users, Download } from "lucide-react"

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 text-sm">
                <ChevronLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-xl font-bold mt-2">Dublin Sports Mentor</h1>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link
                href="/book"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1"
              >
                <Calendar className="w-4 h-4" />
                Book Session
              </Link>
              <Link
                href="/ladder-community"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1"
              >
                <Trophy className="w-4 h-4" />
                Ladder Rankings
              </Link>
              <Link
                href="/meet-players"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1"
              >
                <Users className="w-4 h-4" />
                Meet Players
              </Link>
              <Link
                href="/download"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                Download App
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/Dublinsquashmentor/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm flex items-center gap-1 text-gray-900 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
              className="text-sm bg-[#111827] text-white px-4 py-2 rounded-md flex items-center gap-1"
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

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-6">
            <Construction className="w-16 h-16 text-yellow-500" />
          </div>

          <h2 className="text-2xl font-bold mb-4">Page Under Construction</h2>

          <p className="text-gray-600 mb-6">We're currently working on this feature. It will be available soon!</p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-amber-800 text-left">
                <strong>Important:</strong> You don't need to login to register for the ladder ranking. You can directly
                join the ladder from the home page or ladder community page.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/" className="block w-full bg-[#111827] text-white py-3 rounded-md text-center">
              Return to Home
            </Link>

            <Link href="/ladder-community" className="block w-full bg-[#1e293b] text-white py-3 rounded-md text-center">
              Join the Ladder
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
