import Link from "next/link"
import { ChevronLeft, Calendar, Mail, Phone, Users, Download, Trophy } from "lucide-react"

// This would typically come from a database
const PLAYERS = [
  {
    id: 1,
    name: "John Smith",
    skillLevel: "Intermediate",
    availability: ["Monday", "Wednesday", "Friday"],
    bio: "Playing squash for 3 years. Looking for regular games to improve my skills.",
    email: "john.smith@example.com",
    phone: "+353 87 123 4567",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    skillLevel: "Advanced",
    availability: ["Tuesday", "Thursday", "Saturday"],
    bio: "Former college player getting back into the game after a break. Happy to play with all levels and offer tips.",
    email: "sarah.j@example.com",
    phone: "+353 85 234 5678",
  },
  {
    id: 3,
    name: "Michael Brown",
    skillLevel: "Beginner",
    availability: ["Monday", "Thursday", "Sunday"],
    bio: "New to squash but athletic. Looking for patient players to practice with.",
    email: "mbrown@example.com",
    phone: "+353 83 345 6789",
  },
  {
    id: 4,
    name: "Emma Wilson",
    skillLevel: "Intermediate",
    availability: ["Wednesday", "Friday", "Saturday"],
    bio: "Playing for 2 years. Enjoy competitive games but also happy to play with beginners.",
    email: "emma.w@example.com",
    phone: "+353 86 456 7890",
  },
  {
    id: 5,
    name: "David Lee",
    skillLevel: "Expert",
    availability: ["Tuesday", "Thursday", "Sunday"],
    bio: "Competitive player with 10+ years experience. Looking for challenging games.",
    email: "david.lee@example.com",
    phone: "+353 89 567 8901",
  },
]

export default function MeetPlayers() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-6 border-b">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-sm">
              <ChevronLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-xl font-bold ml-4">Dublin Sports Mentor</h1>
          </div>

          <nav className="flex flex-wrap items-center gap-3 md:gap-6">
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
              className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 flex items-center gap-1"
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
            <Link
              href="https://www.instagram.com/Dublinsquashmentor/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1"
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
              Instagram
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
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Meet New Players</h2>
          <Link href="/join-ladder" className="bg-[#111827] text-white px-4 py-2 rounded-md text-sm">
            Join the Community
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLAYERS.map((player) => (
            <div key={player.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold">{player.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{player.skillLevel} Player</p>

                <div className="mt-4">
                  <p className="text-sm">{player.bio}</p>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Available on:
                  </h4>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {player.availability.map((day) => (
                      <span key={day} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                  <a
                    href={`mailto:${player.email}`}
                    className="text-sm flex items-center gap-2 text-gray-600 hover:text-gray-900"
                  >
                    <Mail className="w-4 h-4" />
                    {player.email}
                  </a>
                  <a
                    href={`tel:${player.phone}`}
                    className="text-sm flex items-center gap-2 text-gray-600 hover:text-gray-900"
                  >
                    <Phone className="w-4 h-4" />
                    {player.phone}
                  </a>
                </div>
              </div>

              <div className="px-6 py-3 bg-gray-50 flex justify-end">
                <Link
                  href={`/contact-player/${player.id}`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                >
                  Contact to Play
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">Don't see anyone that matches your schedule or skill level?</p>
          <Link href="/join-ladder" className="mt-2 inline-block text-indigo-600 font-medium hover:text-indigo-900">
            Register yourself to be found by other players
          </Link>
        </div>
      </main>
    </div>
  )
}
