import Link from "next/link"
import { ChevronLeft } from "lucide-react"

// This would typically come from a database
const PLAYERS = [
  { id: 1, name: "John Smith", wins: 12, losses: 3, rank: 1 },
  { id: 2, name: "Sarah Johnson", wins: 10, losses: 4, rank: 2 },
  { id: 3, name: "Michael Brown", wins: 9, losses: 5, rank: 3 },
  { id: 4, name: "Emma Wilson", wins: 8, losses: 6, rank: 4 },
  { id: 5, name: "David Lee", wins: 7, losses: 6, rank: 5 },
  { id: 6, name: "Lisa Chen", wins: 7, losses: 7, rank: 6 },
  { id: 7, name: "Robert Taylor", wins: 6, losses: 8, rank: 7 },
  { id: 8, name: "Jennifer Garcia", wins: 5, losses: 8, rank: 8 },
  { id: 9, name: "James Rodriguez", wins: 4, losses: 9, rank: 9 },
  { id: 10, name: "Patricia Martinez", wins: 3, losses: 10, rank: 10 },
]

export default function LadderRankings() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b">
        <Link href="/" className="flex items-center gap-2 text-sm">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Squash Ladder Rankings</h2>
          <Link href="/join-ladder" className="bg-[#111827] text-white px-4 py-2 rounded-md text-sm">
            Join the Ladder
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
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
                  Wins
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Losses
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
              {PLAYERS.map((player) => {
                const totalGames = player.wins + player.losses
                const winPercentage = totalGames > 0 ? ((player.wins / totalGames) * 100).toFixed(1) : "0.0"

                return (
                  <tr key={player.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.wins}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.losses}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{winPercentage}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/challenge/${player.id}`} className="text-indigo-600 hover:text-indigo-900">
                        Challenge
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Ladder Rules</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>Players can challenge others up to 2 positions above them</li>
            <li>If the challenger wins, they swap positions with the defender</li>
            <li>Players must accept challenges within 48 hours</li>
            <li>Matches must be played within 7 days of accepting a challenge</li>
            <li>Both players must report the match result</li>
            <li>Inactive players (no matches for 30 days) may be moved down</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
