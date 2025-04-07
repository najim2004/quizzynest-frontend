import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for leaderboard
const leaderboardData = [
  {
    id: "1",
    name: "Alex Johnson",
    score: 9850,
    quizzesTaken: 42,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jamie Smith",
    score: 8720,
    quizzesTaken: 38,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Taylor Brown",
    score: 8450,
    quizzesTaken: 35,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Jordan Wilson",
    score: 7980,
    quizzesTaken: 31,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Casey Miller",
    score: 7650,
    quizzesTaken: 29,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Riley Davis",
    score: 7320,
    quizzesTaken: 27,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Morgan Lee",
    score: 6890,
    quizzesTaken: 25,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Quinn Taylor",
    score: 6540,
    quizzesTaken: 23,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "9",
    name: "Avery Martin",
    score: 6210,
    quizzesTaken: 21,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "10",
    name: "Reese Clark",
    score: 5980,
    quizzesTaken: 19,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

// Mock data for category leaders
const categoryLeaders = [
  { category: "Science", name: "Alex Johnson", score: 2450 },
  { category: "Technology", name: "Jamie Smith", score: 2180 },
  { category: "History", name: "Taylor Brown", score: 1950 },
  { category: "Geography", name: "Jordan Wilson", score: 1820 },
];

export default function AllUserRank() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Leaderboard */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Global Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center gap-4 p-3 rounded-lg ${
                    index < 3 ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="w-8 text-center font-bold text-muted-foreground">
                    #{index + 1}
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={player.avatar || "/placeholder.svg"}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{player.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {player.quizzesTaken} quizzes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{player.score.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Leaders */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Category Champions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryLeaders.map((leader) => (
                <div
                  key={leader.category}
                  className="p-3 rounded-lg bg-muted/50"
                >
                  <p className="text-sm text-muted-foreground">
                    {leader.category}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="font-medium">{leader.name}</p>
                    <p className="font-bold">{leader.score.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">
                Sign in to see your ranking
              </p>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
