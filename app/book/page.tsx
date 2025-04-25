"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Calendar, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

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

export default function BookSession() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [selectedTime, setSelectedTime] = useState<string>("18:00")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      router.push("/")
    }, 2000)
  }

  // Format time for display (24h to 12h)
  const formatTime = (time24h: string) => {
    const [hours, minutes] = time24h.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hours12 = hours % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  // Generate next 14 days for date selection
  const generateDateOptions = () => {
    const dates = []
    const today = new Date()

    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dateString = date.toISOString().split("T")[0]
      const formattedDate = date.toLocaleDateString("en-IE", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })

      dates.push({ value: dateString, label: formattedDate })
    }

    return dates
  }

  const dateOptions = generateDateOptions()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-6 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-sm">
              <ChevronLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-xl font-bold ml-4">Dublin Sports Mentor</h1>
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

      <main className="flex-1 container mx-auto px-4 py-8">
        {submitted ? (
          <div className="max-w-md mx-auto text-center p-8 bg-green-50 rounded-lg">
            <h2 className="text-2xl font-bold text-green-800">Booking Confirmed!</h2>
            <p className="mt-4 text-green-700">
              Your squash session has been booked for{" "}
              {new Date(selectedDate).toLocaleDateString("en-IE", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}{" "}
              at {formatTime(selectedTime)}. You will receive a confirmation email shortly.
            </p>
            <div className="mt-6 p-4 bg-white rounded-lg border border-green-100">
              <h3 className="font-medium text-gray-900 mb-2">Booking Details:</h3>
              <ul className="text-left text-sm space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{formData.name}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{formData.phone || "Not provided"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(selectedDate).toLocaleDateString("en-IE", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{formatTime(selectedTime)}</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-8">Book a Squash Session</h2>

            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Select Date & Time
                </h3>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="bookingDate" className="block text-sm font-medium mb-2">
                      Date
                    </label>
                    <select
                      id="bookingDate"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 border rounded-md"
                    >
                      {dateOptions.map((date) => (
                        <option key={date.value} value={date.value}>
                          {date.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="bookingTime" className="block text-sm font-medium mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Time
                    </label>
                    <select
                      id="bookingTime"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-3 border rounded-md"
                    >
                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>
                          {formatTime(time)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 border-t pt-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
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
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="block text-sm font-medium">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Any special requests or information..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#111827] text-white py-3 rounded-md text-center"
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </button>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
