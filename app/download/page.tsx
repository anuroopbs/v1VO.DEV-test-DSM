"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Download, Smartphone, Share2, PlusCircle, Calendar, Trophy, Users } from "lucide-react"
import Image from "next/image"

export default function DownloadApp() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if the app is running in standalone mode (already installed)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsStandalone(true)
      setIsInstalled(true)
    }

    // Check if the device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    setIsIOS(isIOS)

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
    })

    // Listen for app installed event
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener("beforeinstallprompt", () => {})
      window.removeEventListener("appinstalled", () => {})
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    // We no longer need the prompt. Clear it up
    setDeferredPrompt(null)
  }

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
              className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1"
            >
              <Users className="w-4 h-4" />
              Meet Players
            </Link>
            <Link
              href="/download"
              className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 flex items-center gap-1"
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
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-[#111827] rounded-xl mx-auto flex items-center justify-center mb-4">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Download Our App</h2>
            <p className="text-gray-600 mt-2">
              Get the Dublin Sports Mentor app on your device for the best experience
            </p>
          </div>

          {isInstalled ? (
            <div className="bg-green-50 p-6 rounded-lg text-center mb-8">
              <h3 className="text-lg font-medium text-green-800">App Successfully Installed!</h3>
              <p className="text-green-700 mt-2">
                You can now access Dublin Sports Mentor directly from your home screen.
              </p>
            </div>
          ) : (
            <>
              {deferredPrompt && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 text-center">
                  <h3 className="text-lg font-medium mb-4">Install Web App</h3>
                  <p className="text-gray-600 mb-4">
                    Install Dublin Sports Mentor on your home screen for quick and easy access when you're on the go.
                  </p>
                  <button
                    onClick={handleInstallClick}
                    className="w-full bg-[#111827] text-white py-3 rounded-md text-center flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Install App
                  </button>
                </div>
              )}

              {isIOS && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-medium mb-4">Install on iOS</h3>
                  <p className="text-gray-600 mb-4">To install this app on your iPhone:</p>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-600 mb-4">
                    <li>
                      Tap the <Share2 className="w-4 h-4 inline mx-1" /> share button
                    </li>
                    <li>
                      Scroll down and tap <strong>Add to Home Screen</strong>
                    </li>
                    <li>
                      Tap <strong>Add</strong> in the top right corner
                    </li>
                  </ol>
                  <div className="flex justify-center">
                    <Image
                      src="/ios-add-to-homescreen.png"
                      alt="iOS installation instructions"
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                  </div>
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">App Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <PlusCircle className="w-5 h-5 text-[#111827] flex-shrink-0 mt-0.5" />
                    <span>Book squash sessions even when offline</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <PlusCircle className="w-5 h-5 text-[#111827] flex-shrink-0 mt-0.5" />
                    <span>Get notifications for ladder challenges and matches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <PlusCircle className="w-5 h-5 text-[#111827] flex-shrink-0 mt-0.5" />
                    <span>Find and connect with players of your skill level</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <PlusCircle className="w-5 h-5 text-[#111827] flex-shrink-0 mt-0.5" />
                    <span>Track your progress and match history</span>
                  </li>
                </ul>
              </div>
            </>
          )}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-medium mb-4">Stay Connected</h3>
            <p className="text-gray-600 mb-4">
              Follow us on Instagram for the latest updates, events, and squash tips!
            </p>
            <Link
              href="https://www.instagram.com/Dublinsquashmentor/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-md text-center flex items-center justify-center gap-2"
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
              Follow @Dublinsquashmentor
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
