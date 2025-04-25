"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Calendar, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"
import { submitFridaySocialForm } from "./actions"

// Time slots for the time picker
const TIME_SLOTS = [
  "18:00", // 6:00 PM
  "18:30", // 6:30 PM
  "19:00", // 7:00 PM
  "19:30", // 7:30 PM
  "20:00", // 8:00 PM
  "20:30", // 8:30 PM
]

// Skill level options
const SKILL_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Premier (Elite / PSA-level)",
  "Division 1 (Top national players)",
  "Division 2 (Advanced provincial)",
  "Division 3 (Intermediate club)",
  "Division 4 (Basic club level)",
  "Division 5 & 6 (Entry-level / Beginner)",
]

export default function JoinFridaySocial() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "18:00",
    skillLevel: "Beginner",
    comments: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Set default date to current date on component mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    setFormData((prev) => ({ ...prev, date: today }))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      // Format date and time for submission
      const formattedDateTime = `${formData.date} ${formData.time}`

      // Submit form data to server action
      const result = await submitFridaySocialForm({
        ...formData,
        dateTime: formattedDateTime,
      })

      if (result.success) {
        setSubmitStatus("success")
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          date: formData.date, // Keep the current date
          time: "18:00",
          skillLevel: "Beginner",
          comments: "",
        })
      } else {
        setSubmitStatus("error")
        setErrorMessage(result.message || "An unknown error occurred")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("There was an issue with your submission. Please try again.")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format time for display (24h to 12h)
  const formatTime = (time24h: string) => {
    const [hours, minutes] = time24h.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hours12 = hours % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/miscellaneous" className="flex items-center gap-2 text-xs">
              <ChevronLeft className="w-3 h-3" />
              Back to Miscellaneous
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
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">Join Friday Social Squash</h2>
            <p className="mt-1 text-sm text-gray-600">Fill out the form below to join our weekly social squash event</p>
          </div>

          {submitStatus === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Registration Successful!</h3>
                  <p className="mt-1 text-xs text-green-700">
                    Thank you for joining the Friday Social Squash! We'll send you an email with more details soon.
                  </p>
                  <div className="mt-3 flex gap-3">
                    <Link href="/" className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-md inline-block">
                      Return to Home
                    </Link>
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="text-xs bg-white border border-green-600 text-green-600 px-3 py-1.5 rounded-md"
                    >
                      Register Another
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">Submission Error</h3>
                      <p className="mt-1 text-xs text-red-700">
                        {errorMessage ||
                          "There was an issue with your submission. Please contact us via Instagram DMs if the issue persists."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label htmlFor="name" className="block text-xs font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 text-sm border rounded-md"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="block text-xs font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 text-sm border rounded-md"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="date" className="block text-xs font-medium flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-2 text-sm border rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="time" className="block text-xs font-medium flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Preferred Time *
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full p-2 text-sm border rounded-md"
                  >
                    {TIME_SLOTS.map((time) => (
                      <option key={time} value={time}>
                        {formatTime(time)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="skillLevel" className="block text-xs font-medium">
                  Skill Level *
                </label>
                <select
                  id="skillLevel"
                  name="skillLevel"
                  value={formData.skillLevel}
                  onChange={handleChange}
                  required
                  className="w-full p-2 text-sm border rounded-md"
                >
                  {SKILL_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="comments" className="block text-xs font-medium">
                  Additional Comments
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 text-sm border rounded-md"
                  placeholder="Any special requests or information..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#111827] text-white py-2 rounded-md text-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Registration
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
