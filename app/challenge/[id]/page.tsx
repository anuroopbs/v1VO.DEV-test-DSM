"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Calendar, Clock } from "lucide-react"
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

export default function ChallengePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [player, setPlayer] = useState<Player | null>(null)
  const [currentUser, setCurrentUser] = useState<Player | null>(null)
  const [formData, setFormData] = useState({
    proposedDate: new Date().toISOString().split("T")[0],
    proposedTime: "18:00",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Format time for display (24h to 12h)
  const formatTime = (time24h: string) => {
    const [hours, minutes] = time24h.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hours12 = hours % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
  }

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

  useEffect(() => {
    // Load players from localStorage
    const storedPlayers = localStorage.getItem("ladderPlayers")
    if (storedPlayers) {
      const parsedPlayers = JSON.parse(storedPlayers)

      // Find the player being challenged
      const playerId = Number(params.id)
      const foundPlayer = parsedPlayers.find((p: Player) => p.id === playerId)
      if (foundPlayer) {
        setPlayer(foundPlayer)

        // Set initial proposed date/time to match the player's preferences
        setFormData((prev) => ({
          ...prev,
          proposedDate: foundPlayer.preferredDate || prev.proposedDate,
          proposedTime: foundPlayer.preferredTime || prev.proposedTime,
        }))
      }

      // Check if user is logged in
      const storedEmail = localStorage.getItem("currentUserEmail")
      if (storedEmail) {
        const loggedInPlayer = parsedPlayers.find((p: Player) => p.email === storedEmail)
        if (loggedInPlayer) {
          setCurrentUser(loggedInPlayer)
        }
      }
    }
  }, [params.id])

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

    // In a real application, you would send this data to your backend
    // For now, we'll simulate a successful submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitted(true)

    // In a real app, you might redirect to a confirmation page
    setTimeout(() => {
      router.push("/ladder-community?tab=rankings")
    }, 2000)
  }

  if (!player) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b">
          <Link href="/ladder-community" className="flex items-center gap-2 text-sm">
            <ChevronLeft className="w-4 h-4" />
            Back to Ladder
          </Link>
          <h1 className="text-xl font-bold">Dublin Sports Mentor</h1>
        </header>
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <p>Player not found</p>
        </main>
      </div>
    )
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
            <h2 className="text-2xl font-bold text-green-800">Challenge Sent!</h2>
            <p className="mt-4 text-green-700">
              Your challenge has been sent to {player.name}. They will contact you to arrange the match.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-8">Challenge {player.name}</h2>

            <div className="max-w-md mx-auto mb-8 bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{player.name}</h3>
                  <p className="text-sm text-gray-500">{player.skillLevel}</p>
                </div>
                {player.rank !== undefined && (
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Rank #{player.rank} ({player.gender === "male" ? "Men" : "Women"})
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Preferred Play Time:</h4>
                  <div className="mt-1 flex items-center gap-4">
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
                </div>

                {currentUser && player.rank !== undefined && currentUser.rank !== undefined && (
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    {currentUser.rank > player.rank + 2 ? (
                      <p className="text-blue-800">
                        <strong>Note:</strong> This player is ranked more than 2 positions above you. According to
                        ladder rules, you can only challenge players up to 2 positions above your current rank.
                      </p>
                    ) : (
                      <p className="text-blue-800">
                        <strong>Note:</strong> This player is ranked {player.rank - currentUser.rank} position(s) above
                        you. If you win, you will move up to rank #{player.rank}.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <label htmlFor="proposedDate" className="block text-sm font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Proposed Match Date
                </label>
                <input
                  type="date"
                  id="proposedDate"
                  name="proposedDate"
                  required
                  value={formData.proposedDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="proposedTime" className="block text-sm font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Proposed Match Time
                </label>
                <select
                  id="proposedTime"
                  name="proposedTime"
                  required
                  value={formData.proposedTime}
                  onChange={handleChange}
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
                <label htmlFor="message" className="block text-sm font-medium">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Any additional information..."
                />
              </div>

              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  (currentUser?.rank !== undefined && player.rank !== undefined && currentUser.rank > player.rank + 2)
                }
                className="w-full bg-[#111827] text-white py-3 rounded-md text-center disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending Challenge..." : "Send Challenge"}
              </button>

              {!currentUser && (
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    You don't need to be logged in to challenge a player. Just fill out the form above.
                  </p>
                </div>
              )}
            </form>
          </>
        )}
      </main>
    </div>
  )
}
