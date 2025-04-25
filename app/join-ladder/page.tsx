"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function JoinLadder() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skillLevel: "beginner",
    availability: [],
    bio: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          availability: [...prev.availability, value],
        }
      } else {
        return {
          ...prev,
          availability: prev.availability.filter((day) => day !== value),
        }
      }
    })
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
      router.push("/ladder-rankings")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b">
        <Link href="/" className="flex items-center gap-2 text-sm">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-xl font-bold">Dublin Sports Mentor</h1>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {submitted ? (
          <div className="max-w-md mx-auto text-center p-8 bg-green-50 rounded-lg">
            <h2 className="text-2xl font-bold text-green-800">Registration Successful!</h2>
            <p className="mt-4 text-green-700">
              You have been added to the squash ladder. You will be redirected to the rankings page shortly.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-8">Join the Squash Ladder</h2>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
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
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Availability</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="availability"
                        value={day}
                        onChange={handleCheckboxChange}
                        className="rounded"
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
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
                className="w-full bg-[#111827] text-white py-3 rounded-md text-center"
              >
                {isSubmitting ? "Submitting..." : "Join the Ladder"}
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  )
}
