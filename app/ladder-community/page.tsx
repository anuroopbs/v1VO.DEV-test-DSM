"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Users, Search, Award, RefreshCw, Calendar, Clock, Trophy, BarChart, Download } from "lucide-react"
import { useRouter } from "next/navigation"

// Define the Player type for better type safety
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
  matchHistory?: {
    date: string
    opponent: number
    result: "win" | "loss"
    score?: string
  }[]
  lastActive?: string
}

// This would typically come from a database, but we'll use localStorage for this demo
const getStoredPlayers = (): Player[] => {
  if (typeof window === "undefined") return []

  const storedPlayers = localStorage.getItem("ladderPlayers")
  if (storedPlayers) {
    return JSON.parse(storedPlayers)
  }

  // Default players if none are stored
  const defaultPlayers = [
    {
      id: 1,
      name: "Conor O'Sullivan",
      email: "conor.osullivan@example.com",
      phone: "+353 87 123 4567",
      skillLevel: "Division 3 (Intermediate club)",
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
      matchHistory: [
        { date: "2023-04-10", opponent: 7, result: "win", score: "3-1 (11-8, 11-6, 9-11, 11-7)" },
        { date: "2023-04-02", opponent: 3, result: "win", score: "3-0 (11-7, 11-5, 11-9)" },
      ],
    },
    {
      id: 2,
      name: "Aoife Ryan",
      email: "aoife.ryan@example.com",
      phone: "+353 85 234 5678",
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
      matchHistory: [
        { date: "2023-04-08", opponent: 4, result: "win", score: "3-2 (9-11, 11-8, 11-6, 8-11, 11-9)" },
        { date: "2023-03-30", opponent: 8, result: "win", score: "3-0 (11-5, 11-7, 11-4)" },
      ],
    },
    {
      id: 3,
      name: "Liam Byrne",
      email: "liam.byrne@example.com",
      phone: "+353 83 345 6789",
      skillLevel: "Division 5 & 6 (Entry-level / Beginner)",
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
      matchHistory: [
        { date: "2023-04-05", opponent: 1, result: "loss", score: "0-3 (7-11, 5-11, 9-11)" },
        { date: "2023-03-28", opponent: 7, result: "win", score: "3-1 (11-9, 8-11, 11-7, 11-5)" },
      ],
    },
    {
      id: 4,
      name: "Niamh Doyle",
      email: "niamh.doyle@example.com",
      phone: "+353 86 456 7890",
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
      matchHistory: [
        { date: "2023-04-08", opponent: 2, result: "loss", score: "2-3 (11-9, 8-11, 6-11, 11-8, 9-11)" },
        { date: "2023-03-25", opponent: 8, result: "win", score: "3-1 (11-7, 9-11, 11-8, 11-6)" },
      ],
    },
    {
      id: 5,
      name: "Seamus Murphy",
      email: "seamus.murphy@example.com",
      phone: "+353 89 567 8901",
      skillLevel: "Premier (Elite / PSA-level)",
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
      matchHistory: [
        { date: "2023-04-12", opponent: 7, result: "win", score: "3-0 (11-6, 11-4, 11-8)" },
        { date: "2023-04-01", opponent: 1, result: "loss", score: "2-3 (11-8, 11-6, 8-11, 9-11, 8-11)" },
      ],
    },
    {
      id: 6,
      name: "Siobhan Walsh",
      email: "siobhan.walsh@example.com",
      phone: "+353 87 987 6543",
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
      matchHistory: [
        { date: "2023-04-09", opponent: 8, result: "win", score: "3-0 (11-5, 11-3, 11-7)" },
        { date: "2023-03-29", opponent: 2, result: "loss", score: "1-3 (8-11, 11-9, 7-11, 6-11)" },
      ],
    },
    {
      id: 7,
      name: "Padraig Kelly",
      email: "padraig.kelly@example.com",
      phone: "+353 85 876 5432",
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
      matchHistory: [
        { date: "2023-04-12", opponent: 5, result: "loss", score: "0-3 (6-11, 4-11, 8-11)" },
        { date: "2023-04-03", opponent: 3, result: "loss", score: "1-3 (9-11, 11-8, 7-11, 5-11)" },
      ],
    },
    {
      id: 8,
      name: "Ciara Fitzgerald",
      email: "ciara.fitzgerald@example.com",
      phone: "+353 83 765 4321",
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
      matchHistory: [
        { date: "2023-04-09", opponent: 6, result: "loss", score: "0-3 (5-11, 3-11, 7-11)" },
        { date: "2023-03-30", opponent: 2, result: "loss", score: "0-3 (5-11, 7-11, 4-11)" },
      ],
    },
  ]

  // Save default players to localStorage
  localStorage.setItem("ladderPlayers", JSON.stringify(defaultPlayers))
  return defaultPlayers
}

// Skill level options based on the new division system
const SKILL_LEVELS = [
  "Premier (Elite / PSA-level)",
  "Division 1 (Top national players)",
  "Division 2 (Advanced provincial)",
  "Division 3 (Intermediate club)",
  "Division 4 (Basic club level)",
  "Division 5 & 6 (Entry-level / Beginner)",
]

// Time slots for the time picker
const TIME_SLOTS = [
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
]

// Calculate ELO rating change
const calculateEloChange = (playerRating: number, opponentRating: number, result: "win" | "loss") => {
  const kFactor = 32 // Standard K-factor for ELO
  const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400))
  const actualScore = result === "win" ? 1 : 0
  return Math.round(kFactor * (actualScore - expectedScore))
}

export default function LadderCommunity() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("join")
  const [formData, setFormData] = useState<Omit<Player, "id" | "wins" | "losses" | "rank" | "points" | "joinedDate">>({
    name: "",
    email: "",
    phone: "",
    skillLevel: "Division 5 & 6 (Entry-level / Beginner)",
    gender: "male",
    preferredDate: new Date().toISOString().split("T")[0], // Default to today
    preferredTime: "18:00", // Default to 6:00 PM
    bio: "",
  })
  const [filter, setFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [players, setPlayers] = useState<Player[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [registeredPlayer, setRegisteredPlayer] = useState<Player | null>(null)
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")

  // Load players from localStorage on component mount
  useEffect(() => {
    const storedPlayers = getStoredPlayers()
    setPlayers(storedPlayers)

    // Check if user is already logged in
    const storedEmail = localStorage.getItem("currentUserEmail")
    if (storedEmail) {
      setUserEmail(storedEmail)
      setIsLoggedIn(true)

      // Find the player with this email
      const player = storedPlayers.find((p) => p.email === storedEmail)
      if (player) {
        setRegisteredPlayer(player)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Get players of the same gender to determine rank
    const sameGenderPlayers = players.filter((p) => p.gender === formData.gender)

    // Generate a new player object
    const newPlayer: Player = {
      ...formData,
      id: players.length > 0 ? Math.max(...players.map((p) => p.id)) + 1 : 1,
      wins: 0,
      losses: 0,
      rank: sameGenderPlayers.length + 1, // Rank based on gender
      points: 1200, // Starting ELO rating
      joinedDate: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString().split("T")[0],
      matchHistory: [],
    }

    // Add the new player to the list
    const updatedPlayers = [...players, newPlayer]

    // Sort players by gender and rank for display
    updatedPlayers.sort((a, b) => {
      if (a.gender !== b.gender) return a.gender.localeCompare(b.gender)
      return (a.rank || 999) - (b.rank || 999)
    })

    // Save to localStorage
    localStorage.setItem("ladderPlayers", JSON.stringify(updatedPlayers))
    localStorage.setItem("currentUserEmail", newPlayer.email)

    // Update state
    setPlayers(updatedPlayers)
    setRegisteredPlayer(newPlayer)
    setUserEmail(newPlayer.email)
    setIsLoggedIn(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitted(true)

    // In a real app, you might redirect to a confirmation page
    setTimeout(() => {
      setActiveTab("rankings")
    }, 2000)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Find player with matching email
    const player = players.find((p) => p.email === loginEmail)

    if (player) {
      setRegisteredPlayer(player)
      setUserEmail(player.email)
      setIsLoggedIn(true)
      localStorage.setItem("currentUserEmail", player.email)
      setActiveTab("rankings")
    } else {
      alert("No player found with that email. Please register first.")
    }
  }

  const handleLogout = () => {
    setRegisteredPlayer(null)
    setUserEmail("")
    setIsLoggedIn(false)
    localStorage.removeItem("currentUserEmail")
    setActiveTab("join")
  }

  // Format time for display (24h to 12h)
  const formatTime = (time24h: string) => {
    const [hours, minutes] = time24h.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hours12 = hours % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  // Filter players by skill level and gender
  const filteredPlayers = players.filter((player) => {
    const skillMatch = filter === "all" || player.skillLevel === filter
    const genderMatch = genderFilter === "all" || player.gender === genderFilter
    return skillMatch && genderMatch
  })

  // Get male and female players for rankings
  const malePlayers = players.filter((p) => p.gender === "male")
  const femalePlayers = players.filter((p) => p.gender === "female")

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
              className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 flex items-center gap-1"
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
        {isLoggedIn && (
          <div className="mb-6 bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                Logged in as: <span className="font-medium">{userEmail}</span>
              </p>
              {registeredPlayer && (
                <p className="text-sm text-gray-600">
                  Rank: <span className="font-medium">#{registeredPlayer.rank}</span> | Points:{" "}
                  <span className="font-medium">{registeredPlayer.points}</span> | Level:{" "}
                  <span className="font-medium">{registeredPlayer.skillLevel}</span>
                </p>
              )}
            </div>
            <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">
              Logout
            </button>
          </div>
        )}

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setActiveTab("join")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === "join"
                  ? "bg-[#111827] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Join the Ladder
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("find")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "find"
                  ? "bg-[#111827] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <Search className="w-4 h-4 inline mr-2" />
              Find Players
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("rankings")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === "rankings"
                  ? "bg-[#111827] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <Award className="w-4 h-4 inline mr-2" />
              Ladder Rankings
            </button>
          </div>
        </div>

        {activeTab === "join" && (
          <>
            {submitted ? (
              <div className="max-w-md mx-auto text-center p-8 bg-green-50 rounded-lg">
                <h2 className="text-2xl font-bold text-green-800">Registration Successful!</h2>
                <p className="mt-4 text-green-700">
                  You have been added to the squash ladder. You can now find players of your skill level to play with.
                </p>
                <div className="mt-6 flex gap-4 justify-center">
                  <button
                    onClick={() => setActiveTab("find")}
                    className="bg-[#111827] text-white px-4 py-2 rounded-md text-sm"
                  >
                    Find Players
                  </button>
                  <button
                    onClick={() => setActiveTab("rankings")}
                    className="bg-[#1e293b] text-white px-4 py-2 rounded-md text-sm"
                  >
                    View Rankings
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center mb-8">Join the Squash Ladder</h2>

                <div className="max-w-md mx-auto">
                  <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h3 className="text-lg font-medium mb-6">Register for the Ladder</h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Join our squash ladder to find players of your skill level and track your progress. No login
                      required - just fill out the form below to get started!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md"
                          placeholder="+353 XX XXX XXXX"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Gender</label>
                        <div className="grid grid-cols-2 gap-4">
                          <label
                            className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                              formData.gender === "male" ? "bg-blue-50 border-blue-500" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              checked={formData.gender === "male"}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <span>Male</span>
                          </label>
                          <label
                            className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                              formData.gender === "female" ? "bg-pink-50 border-pink-500" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              checked={formData.gender === "female"}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <span>Female</span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="skillLevel" className="block text-sm font-medium">
                          Skill Level
                        </label>
                        <select
                          id="skillLevel"
                          name="skillLevel"
                          required
                          value={formData.skillLevel}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md"
                        >
                          {SKILL_LEVELS.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="preferredDate" className="block text-sm font-medium flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Preferred Play Date
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          required
                          value={formData.preferredDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full p-2 border rounded-md"
                        />
                        <p className="text-xs text-gray-500">Select a date when you're available to play</p>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="preferredTime" className="block text-sm font-medium flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Preferred Time
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          required
                          value={formData.preferredTime}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md"
                        >
                          {TIME_SLOTS.map((time) => (
                            <option key={time} value={time}>
                              {formatTime(time)}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500">Select a time when you're available to play</p>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="bio" className="block text-sm font-medium">
                          About You (Optional)
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          rows={3}
                          value={formData.bio}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md"
                          placeholder="Tell us about your squash experience..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#111827] text-white py-3 rounded-md text-center flex items-center justify-center"
                      >
                        {isSubmitting ? "Submitting..." : "Join the Ladder"}
                      </button>
                    </form>
                  </div>

                  {isLoggedIn && (
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <h3 className="text-xl font-bold text-blue-800">You're Already Registered!</h3>
                      <p className="mt-4 text-blue-700">
                        You're already part of the squash ladder. You can find players to play with or view your current
                        ranking.
                      </p>
                      <div className="mt-6 flex gap-4 justify-center">
                        <button
                          onClick={() => setActiveTab("find")}
                          className="bg-[#111827] text-white px-4 py-2 rounded-md text-sm"
                        >
                          Find Players
                        </button>
                        <button
                          onClick={() => setActiveTab("rankings")}
                          className="bg-[#1e293b] text-white px-4 py-2 rounded-md text-sm"
                        >
                          View Rankings
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {activeTab === "find" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Find Players of Your Skill Level</h2>
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap justify-center mb-4 gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    filter === "all"
                      ? "bg-[#111827] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  All Levels
                </button>

                {SKILL_LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={() => setFilter(level)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      filter === level
                        ? "bg-[#111827] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {level.includes("Division") ? level.split("(")[0].trim() : level.split("(")[0].trim()}
                  </button>
                ))}
              </div>

              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    onClick={() => setGenderFilter("all")}
                    className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                      genderFilter === "all"
                        ? "bg-[#111827] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    All Players
                  </button>
                  <button
                    onClick={() => setGenderFilter("male")}
                    className={`px-4 py-2 text-sm font-medium ${
                      genderFilter === "male"
                        ? "bg-[#111827] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    Men
                  </button>
                  <button
                    onClick={() => setGenderFilter("female")}
                    className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                      genderFilter === "female"
                        ? "bg-[#111827] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    Women
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlayers.map((player) => (
                <div key={player.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{player.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{player.skillLevel}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        {player.rank !== undefined && (
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Rank #{player.rank} ({player.gender === "male" ? "Men" : "Women"})
                          </span>
                        )}
                        {player.points !== undefined && (
                          <span className="mt-1 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                            <Trophy className="w-3 h-3 mr-1" /> {player.points} pts
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm">{player.bio}</p>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">
                          {new Date(player.preferredDate).toLocaleDateString("en-IE", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{formatTime(player.preferredTime)}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                      <a
                        href={`mailto:${player.email}`}
                        className="text-sm flex items-center gap-2 text-gray-600 hover:text-gray-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        {player.email}
                      </a>
                      <a
                        href={`tel:${player.phone}`}
                        className="text-sm flex items-center gap-2 text-gray-600 hover:text-gray-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        {player.phone}
                      </a>
                    </div>
                  </div>

                  <div className="px-6 py-3 bg-gray-50 flex justify-end">
                    <Link
                      href={`/challenge/${player.id}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                    >
                      Challenge to Play
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredPlayers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No players found with the selected criteria.</p>
                <p className="mt-2 text-gray-500">Try selecting different filters or join the ladder yourself!</p>
                <button
                  onClick={() => setActiveTab("join")}
                  className="mt-4 bg-[#111827] text-white px-4 py-2 rounded-md text-sm"
                >
                  Join the Ladder
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === "rankings" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Squash Ladder Rankings</h2>
              {!isLoggedIn && (
                <button
                  onClick={() => setActiveTab("join")}
                  className="bg-[#111827] text-white px-4 py-2 rounded-md text-sm"
                >
                  Join the Ladder
                </button>
              )}
            </div>

            <div className="mb-8">
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="text-lg font-medium mb-2">Point System</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our ladder uses an ELO rating system, similar to chess rankings. Each player starts with 1200 points.
                  Points are gained or lost based on match results and the rating difference between players.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="text-sm font-medium">Beginner</h4>
                    <p className="text-xs text-gray-500">1000-1299 points</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="text-sm font-medium">Intermediate</h4>
                    <p className="text-xs text-gray-500">1300-1499 points</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="text-sm font-medium">Advanced</h4>
                    <p className="text-xs text-gray-500">1500+ points</p>
                  </div>
                </div>
              </div>

              {/* Women's rankings first */}
              <h3 className="text-xl font-semibold mb-4">Women's Rankings</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
                <div className="p-4 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-medium">Current Rankings</h3>
                  <button
                    onClick={() => {
                      // Refresh players from localStorage
                      const refreshedPlayers = getStoredPlayers()
                      setPlayers(refreshedPlayers)
                    }}
                    className="text-sm flex items-center gap-1 text-gray-600 hover:text-gray-900"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Rank
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Player
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Points
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Skill Level
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          W-L
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Win %
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {femalePlayers
                        .filter((player) => player.rank !== undefined)
                        .sort((a, b) => (a.rank || 999) - (b.rank || 999))
                        .map((player) => {
                          const totalGames = (player.wins || 0) + (player.losses || 0)
                          const winPercentage =
                            totalGames > 0 ? (((player.wins || 0) / totalGames) * 100).toFixed(1) : "0.0"

                          const isCurrentUser = isLoggedIn && player.email === userEmail

                          return (
                            <tr key={player.id} className={isCurrentUser ? "bg-pink-50" : ""}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {player.rank}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {player.name}
                                {isCurrentUser && <span className="ml-2 text-xs text-pink-600">(You)</span>}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {player.points}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {player.skillLevel.split(" ")[0]}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {player.wins || 0}-{player.losses || 0}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{winPercentage}%</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {!isCurrentUser && (
                                  <Link
                                    href={`/challenge/${player.id}`}
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    Challenge
                                  </Link>
                                )}
                                {isCurrentUser && <span className="text-gray-400">You</span>}
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Men's rankings second */}
              <h3 className="text-xl font-semibold mb-4">Men's Rankings</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Rank
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Player
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Points
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Skill Level
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          W-L
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Win %
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {malePlayers
                        .filter((player) => player.rank !== undefined)
                        .sort((a, b) => (a.rank || 999) - (b.rank || 999))
                        .map((player) => {
                          const totalGames = (player.wins || 0) + (player.losses || 0)
                          const winPercentage =
                            totalGames > 0 ? (((player.wins || 0) / totalGames) * 100).toFixed(1) : "0.0"

                          const isCurrentUser = isLoggedIn && player.email === userEmail

                          return (
                            <tr key={player.id} className={isCurrentUser ? "bg-blue-50" : ""}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {player.rank}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {player.name}
                                {isCurrentUser && <span className="ml-2 text-xs text-blue-600">(You)</span>}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {player.points}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {player.skillLevel.split(" ")[0]}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {player.wins || 0}-{player.losses || 0}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{winPercentage}%</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {!isCurrentUser && (
                                  <Link
                                    href={`/challenge/${player.id}`}
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    Challenge
                                  </Link>
                                )}
                                {isCurrentUser && <span className="text-gray-400">You</span>}
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <BarChart className="w-5 h-5 mr-2" />
                  Ladder System Features
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                  <li>
                    <strong>ELO Rating System:</strong> Points are awarded based on match results and opponent strength
                  </li>
                  <li>
                    <strong>Challenge System:</strong> Players can challenge others up to 2 positions above them
                  </li>
                  <li>
                    <strong>Activity Requirements:</strong> Players must play at least one match every 30 days
                  </li>
                  <li>
                    <strong>Match History:</strong> Complete record of all matches played
                  </li>
                  <li>
                    <strong>Separate Rankings:</strong> Men's and women's ladders are maintained separately
                  </li>
                </ul>
              </div>

              {isLoggedIn && registeredPlayer && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Your Profile
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{registeredPlayer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rank:</span>
                      <span className="font-medium">
                        #{registeredPlayer.rank} ({registeredPlayer.gender === "male" ? "Men" : "Women"})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Points:</span>
                      <span className="font-medium">{registeredPlayer.points}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Skill Level:</span>
                      <span className="font-medium">{registeredPlayer.skillLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Record:</span>
                      <span className="font-medium">
                        {registeredPlayer.wins || 0}W - {registeredPlayer.losses || 0}L
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Joined:</span>
                      <span className="font-medium">{registeredPlayer.joinedDate}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium mb-2">Report a Match Result</h4>
                    <Link
                      href="/report-match"
                      className="w-full bg-[#111827] text-white py-2 rounded-md text-center block text-sm"
                    >
                      Submit Match Result
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
