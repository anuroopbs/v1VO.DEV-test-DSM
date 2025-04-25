"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Save, Calendar, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

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
  joinedDate?: string
}

export default function ReportMatch() {
  const router = useRouter()
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [opponent, setOpponent] = useState<number | "">("")
  const [result, setResult] = useState<"win" | "loss" | "">("")
  const [matchDate, setMatchDate] = useState("")
  const [matchTime, setMatchTime] = useState("18:00")
  const [score, setScore] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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

  // Format time for display (24h to 12h)
  const formatTime = (time24h: string) => {
    const [hours, minutes] = time24h.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hours12 = hours % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  useEffect(() => {
    // Get current date in YYYY-MM-DD format for the date input
    const today = new Date().toISOString().split("T")[0]
    setMatchDate(today)

    // Load players from localStorage
    const storedPlayers = localStorage.getItem("ladderPlayers")
    if (storedPlayers) {
      const parsedPlayers = JSON.parse(storedPlayers)
      setPlayers(parsedPlayers)

      // Check if user is logged in
      const storedEmail = localStorage.getItem("currentUserEmail")
      if (storedEmail) {
        const player = parsedPlayers.find((p: Player) => p.email === storedEmail)
        if (player) {
          setCurrentPlayer(player)
        } else {
          // Redirect if no player found with this email
          router.push("/ladder-community")
        }
      } else {
        // Redirect if not logged in
        router.push("/ladder-community")
      }
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPlayer || !opponent || !result || !matchDate) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Find the opponent player
    const opponentPlayer = players.find((p) => p.id === Number(opponent))
    if (!opponentPlayer) {
      alert("Opponent not found")
      setIsSubmitting(false)
      return
    }

    // Update player records
    const updatedPlayers = players.map((player) => {
      if (player.id === currentPlayer.id) {
        return {
          ...player,
          wins: result === "win" ? (player.wins || 0) + 1 : player.wins || 0,
          losses: result === "loss" ? (player.losses || 0) + 1 : player.losses || 0,
        }
      }

      if (player.id === opponentPlayer.id) {
        return {
          ...player,
          wins: result === "loss" ? (player.wins || 0) + 1 : player.wins || 0,
          losses: result === "win" ? (player.losses || 0) + 1 : player.losses || 0,
        }
      }

      return player
    })

    // Only update rankings if players are of the same gender
    if (currentPlayer.gender === opponentPlayer.gender) {
      // Update rankings if the current player won against a higher-ranked player
      if (
        result === "win" &&
        currentPlayer.rank !== undefined &&
        opponentPlayer.rank !== undefined &&
        opponentPlayer.rank < currentPlayer.rank
      ) {
        // Swap ranks between the two players
        const currentRank = currentPlayer.rank
        const opponentRank = opponentPlayer.rank

        updatedPlayers.forEach((player) => {
          if (player.id === currentPlayer.id) {
            player.rank = opponentRank
          } else if (player.id === opponentPlayer.id) {
            player.rank = currentRank
          }
        })
      }
    }

    // Save updated players to localStorage
    localStorage.setItem("ladderPlayers", JSON.stringify(updatedPlayers))

    // In a real app, you would send this data to your backend
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitted(true)

    // Redirect after a delay
    setTimeout(() => {
      router.push("/ladder-community?tab=rankings")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b">
        <Link href="/ladder-community" className="flex items-center gap-2 text-sm">
          <ChevronLeft className="w-4 h-4" />
          Back to Ladder
        </Link>
        <h1 className="text-xl font-bold">Dublin Sports Mentor</h1>
        <Link
          href="https://www.instagram.com/Dublinsquashmentor/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm flex items-center gap-1 text-pink-600 hover:text-pink-700"
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
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {submitted ? (
          <div className="max-w-md mx-auto text-center p-8 bg-green-50 rounded-lg">
            <h2 className="text-2xl font-bold text-green-800">Match Result Submitted!</h2>
            <p className="mt-4 text-green-700">
              Your match result has been recorded. The ladder rankings have been updated accordingly.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-8">Report Match Result</h2>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Your Name</label>
                <input
                  type="text"
                  value={currentPlayer?.name || ""}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="opponent" className="block text-sm font-medium">
                  Opponent
                </label>
                <select
                  id="opponent"
                  value={opponent}
                  onChange={(e) => setOpponent(e.target.value ? Number(e.target.value) : "")}
                  required
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Opponent</option>
                  {players
                    .filter((p) => p.id !== currentPlayer?.id && p.gender === currentPlayer?.gender)
                    .map((player) => (
                      <option key={player.id} value={player.id}>
                        {player.name} (Rank: {player.rank || "N/A"})
                      </option>
                    ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Match Result</label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                      result === "win" ? "bg-green-50 border-green-500" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="result"
                      value="win"
                      checked={result === "win"}
                      onChange={() => setResult("win")}
                      className="sr-only"
                    />
                    <span>I Won</span>
                  </label>
                  <label
                    className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                      result === "loss" ? "bg-red-50 border-red-500" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="result"
                      value="loss"
                      checked={result === "loss"}
                      onChange={() => setResult("loss")}
                      className="sr-only"
                    />
                    <span>I Lost</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="matchDate" className="block text-sm font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Match Date
                </label>
                <input
                  type="date"
                  id="matchDate"
                  value={matchDate}
                  onChange={(e) => setMatchDate(e.target.value)}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="matchTime" className="block text-sm font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Match Time
                </label>
                <select
                  id="matchTime"
                  value={matchTime}
                  onChange={(e) => setMatchTime(e.target.value)}
                  required
                  className="w-full p-2 border rounded-md"
                >
                  {TIME_SLOTS.map((time) => (
                    <option key={time} value={time}>
                      {formatTime(time)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="score" className="block text-sm font-medium">
                  Score (Optional)
                </label>
                <input
                  type="text"
                  id="score"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="e.g., 3-1 (11-8, 11-6, 9-11, 11-7)"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="block text-sm font-medium">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Any comments about the match..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#111827] text-white py-3 rounded-md text-center flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Submit Match Result
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  )
}
