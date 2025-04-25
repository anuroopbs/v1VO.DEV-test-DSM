"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Trophy } from "lucide-react"

// Define the Player type
type Player = {
  id: number
  name: string
  email: string
  phone: string
  skillLevel: string
  gender: string
  preferredDate: string
  preferredTime: string
  bio: string
  wins?: number
  losses?: number
  rank?: number
  points?: number
  joinedDate?: string
  lastActive?: string
  matchHistory?: {
    date: string
    opponent: number
    result: "win" | "loss"
    score?: string
  }[]
}

// Irish dummy data for the home page
const DUMMY_PLAYERS: Player[] = [
  // Men
  {
    id: 101,
    name: "Conor O'Sullivan",
    email: "conor.osullivan@example.com",
    phone: "+353 87 123 4567",
    skillLevel: "Division 2 (Advanced provincial)",
    gender: "male",
    preferredDate: "2023-10-15",
    preferredTime: "18:00",
    bio: "Playing squash for 5 years. Looking for competitive matches.",
    wins: 15,
    losses: 4,
    rank: 1,
    points: 1520,
    joinedDate: "2023-08-15",
    lastActive: "2023-04-10",
  },
  {
    id: 102,
    name: "Seamus Murphy",
    email: "seamus.murphy@example.com",
    phone: "+353 85 234 5678",
    skillLevel: "Division 1 (Top national players)",
    gender: "male",
    preferredDate: "2023-09-20",
    preferredTime: "19:30",
    bio: "National level player with 7 years experience.",
    wins: 12,
    losses: 5,
    rank: 2,
    points: 1450,
    joinedDate: "2023-09-20",
    lastActive: "2023-04-12",
  },
  {
    id: 103,
    name: "Liam Byrne",
    email: "liam.byrne@example.com",
    phone: "+353 83 345 6789",
    skillLevel: "Division 3 (Intermediate club)",
    gender: "male",
    preferredDate: "2024-01-10",
    preferredTime: "17:30",
    bio: "Club player for 3 years. Enjoy competitive matches.",
    wins: 9,
    losses: 7,
    rank: 3,
    points: 1320,
    joinedDate: "2023-10-10",
    lastActive: "2023-04-05",
  },
  {
    id: 104,
    name: "Padraig Kelly",
    email: "padraig.kelly@example.com",
    phone: "+353 86 456 7890",
    skillLevel: "Division 2 (Advanced provincial)",
    gender: "male",
    preferredDate: "2023-10-20",
    preferredTime: "17:00",
    bio: "Provincial player for 4 years. Looking for challenging games.",
    wins: 8,
    losses: 6,
    rank: 4,
    points: 1280,
    joinedDate: "2023-11-05",
    lastActive: "2023-04-12",
  },
  {
    id: 105,
    name: "Eoin Fitzgerald",
    email: "eoin.fitzgerald@example.com",
    phone: "+353 89 765 4321",
    skillLevel: "Division 4 (Basic club level)",
    gender: "male",
    preferredDate: "2023-11-15",
    preferredTime: "18:30",
    bio: "Playing for 1 year. Looking to improve my skills.",
    wins: 5,
    losses: 8,
    rank: 5,
    points: 1180,
    joinedDate: "2023-12-01",
    lastActive: "2023-04-08",
  },

  // Women
  {
    id: 201,
    name: "Aoife Ryan",
    email: "aoife.ryan@example.com",
    phone: "+353 87 987 6543",
    skillLevel: "Division 2 (Advanced provincial)",
    gender: "female",
    preferredDate: "2023-11-02",
    preferredTime: "19:00",
    bio: "Provincial player for 6 years. Looking for competitive matches.",
    wins: 14,
    losses: 3,
    rank: 1,
    points: 1480,
    joinedDate: "2023-07-15",
    lastActive: "2023-04-08",
  },
  {
    id: 202,
    name: "Siobhan Walsh",
    email: "siobhan.walsh@example.com",
    phone: "+353 85 876 5432",
    skillLevel: "Division 1 (Top national players)",
    gender: "female",
    preferredDate: "2023-08-15",
    preferredTime: "18:30",
    bio: "National level player with 8 years experience.",
    wins: 11,
    losses: 4,
    rank: 2,
    points: 1420,
    joinedDate: "2023-08-20",
    lastActive: "2023-04-09",
  },
  {
    id: 203,
    name: "Niamh Doyle",
    email: "niamh.doyle@example.com",
    phone: "+353 83 765 4321",
    skillLevel: "Division 3 (Intermediate club)",
    gender: "female",
    preferredDate: "2023-12-05",
    preferredTime: "20:00",
    bio: "Club player for 2 years. Enjoy competitive matches.",
    wins: 8,
    losses: 6,
    rank: 3,
    points: 1290,
    joinedDate: "2023-09-10",
    lastActive: "2023-04-08",
  },
  {
    id: 204,
    name: "Ciara Fitzgerald",
    email: "ciara.fitzgerald@example.com",
    phone: "+353 86 654 3210",
    skillLevel: "Division 4 (Basic club level)",
    gender: "female",
    preferredDate: "2024-01-05",
    preferredTime: "16:30",
    bio: "Provincial player for 5 years. Looking for challenging games.",
    wins: 7,
    losses: 5,
    rank: 4,
    points: 1250,
    joinedDate: "2023-10-05",
    lastActive: "2023-04-09",
  },
  {
    id: 205,
    name: "Orla McCarthy",
    email: "orla.mccarthy@example.com",
    phone: "+353 89 543 2109",
    skillLevel: "Division 5 & 6 (Entry-level / Beginner)",
    gender: "female",
    preferredDate: "2023-12-20",
    preferredTime: "17:30",
    bio: "New to squash, looking to improve my skills and meet new players.",
    wins: 3,
    losses: 9,
    rank: 5,
    points: 1150,
    joinedDate: "2024-01-10",
    lastActive: "2023-04-07",
  },
]

// Client component for rankings
function LadderRankings() {
  const [malePlayers, setMalePlayers] = useState<Player[]>([])
  const [femalePlayers, setFemalePlayers] = useState<Player[]>([])

  useEffect(() => {
    // Load players from localStorage
    const storedPlayers = localStorage.getItem("ladderPlayers")
    let allPlayers: Player[] = []

    if (storedPlayers) {
      allPlayers = JSON.parse(storedPlayers)
    }

    // If no players in localStorage or fewer than needed, use dummy data
    if (!allPlayers.length) {
      allPlayers = DUMMY_PLAYERS
      // Save dummy data to localStorage for consistency
      localStorage.setItem("ladderPlayers", JSON.stringify(DUMMY_PLAYERS))
    }

    // Filter and sort by gender and rank
    const males = allPlayers
      .filter((p: Player) => p.gender === "male" && p.rank !== undefined)
      .sort((a: Player, b: Player) => (a.rank || 999) - (b.rank || 999))
      .slice(0, 5) // Top 5 players

    const females = allPlayers
      .filter((p: Player) => p.gender === "female" && p.rank !== undefined)
      .sort((a: Player, b: Player) => (a.rank || 999) - (b.rank || 999))
      .slice(0, 5) // Top 5 players

    setMalePlayers(males)
    setFemalePlayers(females)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 w-full max-w-4xl">
      {/* Women's rankings first */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Women's Ladder Rankings
        </h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">W-L</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {femalePlayers.length > 0 ? (
                femalePlayers.map((player) => (
                  <tr key={player.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{player.rank}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{player.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{player.points}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {player.wins || 0}-{player.losses || 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-center text-sm text-gray-500">
                    No players registered yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-2 text-right">
          <Link href="/ladder-community?tab=rankings" className="text-sm text-indigo-600 hover:text-indigo-900">
            View full rankings →
          </Link>
        </div>
      </div>

      {/* Men's rankings second */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Men's Ladder Rankings
        </h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">W-L</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {malePlayers.length > 0 ? (
                malePlayers.map((player) => (
                  <tr key={player.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{player.rank}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{player.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{player.points}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {player.wins || 0}-{player.losses || 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-center text-sm text-gray-500">
                    No players registered yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-2 text-right">
          <Link href="/ladder-community?tab=rankings" className="text-sm text-indigo-600 hover:text-indigo-900">
            View full rankings →
          </Link>
        </div>
      </div>
    </div>
  )
}

// Home page with client component
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Dublin Sports Mentor</h1>
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
              <span>@Dublinsquashmentor</span>
            </Link>
            <Link href="/under-construction" className="text-sm bg-[#111827] text-white px-4 py-2 rounded-md">
              Login / Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="w-full max-w-md space-y-4">
            <Link href="/book" className="w-full bg-[#111827] text-white py-3 rounded-md text-center block">
              Book a Squash Session
            </Link>

            <Link href="/ladder-community" className="w-full bg-[#1e293b] text-white py-3 rounded-md text-center block">
              Join the Ladder - Meet New Players of Your Skill
            </Link>

            <Link href="/miscellaneous" className="w-full border border-gray-200 py-3 rounded-md text-center block">
              Miscellaneous Services
            </Link>
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Our Vision</p>
            <h2 className="mt-4 text-3xl font-bold max-w-2xl">
              To inspire 1% of the planet to pick up a racket and discover the joy of sport
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-1 w-full max-w-4xl">
            <div className="bg-gray-50 p-8 text-center">
              <h3 className="text-4xl font-bold">833</h3>
              <p className="mt-2 text-sm text-gray-600">People introduced so far</p>
            </div>
            <div className="bg-gray-50 p-8 text-center">
              <h3 className="text-4xl font-bold">14,167</h3>
              <p className="mt-2 text-sm text-gray-600">Remaining to reach 1% of Dublin</p>
            </div>
            <div className="bg-gray-50 p-8 text-center">
              <h3 className="text-4xl font-bold">81M</h3>
              <p className="mt-2 text-sm text-gray-600">Remaining to reach 1% of the world</p>
            </div>
          </div>

          {/* Ladder Rankings Section - Replacing the Community Section */}
          <div className="mt-24 text-center">
            <h2 className="text-2xl font-bold">Current Ladder Rankings</h2>
            <p className="mt-2 text-gray-600">Join the ladder to compete and improve your ranking</p>

            {/* Client component for rankings */}
            <LadderRankings />
          </div>
        </div>
      </main>
      <footer className="w-full py-6 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Dublin Sports Mentor</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link
              href="https://www.instagram.com/Dublinsquashmentor/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-900 hover:text-gray-700"
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
              Follow us on Instagram
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
