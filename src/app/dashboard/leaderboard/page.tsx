import LeaderboardCard from "@/components/dashboard/leaderboard/leaderboard-card/leaderboard-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Coins, Crown } from "lucide-react";

type LeaderboardEntry = {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  score: number;
  position: number;
};

export default function LeaderboardUI() {
  const leaderboardData: LeaderboardEntry[] = [
    {
      id: 1,
      name: "Roy",
      avatar:
        "https://img.freepik.com/free-photo/school-boy-with-book-park_23-2148199240.jpg",
      phone: "01305***789",
      score: 678,
      position: 1,
    },
    {
      id: 2,
      name: "Day",
      avatar:
        "https://us.images.westend61.de/0001411501pw/portrait-of-confident-young-male-student-in-corridor-of-university-MASF19101.jpg",
      phone: "01305***789",
      score: 578,
      position: 2,
    },
    {
      id: 3,
      name: "Jay",
      avatar:
        "https://st.depositphotos.com/2931363/5142/i/450/depositphotos_51425493-stock-photo-student-holding-textbooks.jpg",
      phone: "01305***789",
      score: 489,
      position: 3,
    },
    {
      id: 4,
      name: "May",
      avatar: "/placeholder.svg?height=50&width=50",
      phone: "01305***789",
      score: 368,
      position: 4,
    },
    {
      id: 5,
      name: "Toy",
      avatar: "/placeholder.svg?height=50&width=50",
      phone: "01305***789",
      score: 368,
      position: 5,
    },
    {
      id: 6,
      name: "Zoe",
      avatar: "https://example.com/avatar6.jpg",
      phone: "01305***790",
      score: 350,
      position: 6,
    },
    {
      id: 7,
      name: "Leo",
      avatar: "https://example.com/avatar7.jpg",
      phone: "01305***791",
      score: 340,
      position: 7,
    },
    {
      id: 8,
      name: "Lily",
      avatar: "/placeholder.svg?height=50&width=50",
      phone: "01305***792",
      score: 330,
      position: 8,
    },
    {
      id: 9,
      name: "Max",
      avatar: "/placeholder.svg?height=50&width=50",
      phone: "01305***793",
      score: 320,
      position: 9,
    },
    {
      id: 10,
      name: "Luna",
      avatar: "/placeholder.svg?height=50&width=50",
      phone: "01305***794",
      score: 310,
      position: 10,
    },
    {
      id: 11,
      name: "Ruby",
      avatar: "https://example.com/avatar11.jpg",
      phone: "01305***795",
      score: 300,
      position: 11,
    },
  ];
  const topThree = leaderboardData.slice(0, 3);
  const restOfList = leaderboardData.slice(3);

  return (
    <div className="">
      {/* Top 3 Section */}
      <div className="bg-gradient-to-r from-[#6C5CE7] to-[#4834D4] rounded-2xl mb-4 relative overflow-hidden pt-8">
        <div className="relative">
          <div className="flex items-end justify-center">
            {/* Second Place */}
            <div className="flex flex-col items-center -mb-10 z-10">
              <Avatar className="w-16 h-16 border-2 border-white">
                <AvatarImage
                  className="object-cover"
                  src={topThree[1].avatar}
                  alt={topThree[1].name}
                />
                <AvatarFallback>{topThree[1].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-xs text-white/80">{topThree[1].phone}</div>
              <Card className="bg-red-300 py-2 border-0 w-24 mt-2 h-[170px] rounded-l-md rounded-r-none  -rotate-6 -mr-2.5">
                <CardContent className="p-0 flex flex-col items-center justify-start">
                  <h2 className="text-2xl font-bold text-white">2nd</h2>
                  <div className="text-xs text-white">Score:</div>
                  <div className="text-sm text-white font-medium">
                    {topThree[1].score} <Coins className="inline size-4" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* First Place - Center */}
            <div className="flex flex-col items-center -mb-10 z-20">
              <Avatar className="w-20 h-20 border-2 border-white">
                <AvatarImage
                  className="object-cover"
                  src={topThree[0].avatar}
                  alt={topThree[0].name}
                />
                <AvatarFallback>{topThree[0].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Crown className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-yellow-400 w-6 h-6 shadow-2xl" />
              <div className="text-xs text-white/80">{topThree[0].phone}</div>
              <Card className="bg-red-400 py-4 border-0 w-28 mt-2 h-[200px] rounded-md">
                <CardContent className="p-0 flex flex-col items-center justify-start">
                  <h2 className="text-2xl font-bold text-white">1st</h2>
                  <div className="text-xs text-white">Score:</div>
                  <div className="text-sm text-white font-medium">
                    {topThree[0].score} <Coins className="inline size-4" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Third Place */}
            <div className="flex flex-col items-center -mb-10 z-10">
              <Avatar className="w-16 h-16 border-2 border-white">
                <AvatarImage
                  className="object-cover"
                  src={topThree[2].avatar}
                  alt={topThree[2].name}
                />
                <AvatarFallback>{topThree[2].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-xs text-white/80">{topThree[2].phone}</div>
              <Card className="bg-red-300 py-1 border-0 w-24 mt-2 h-[130px] rounded-r-md rounded-l-none  rotate-6 -ml-2.5">
                <CardContent className="p-0 flex flex-col items-center justify-start">
                  <h2 className="text-2xl font-bold text-white">3rd</h2>
                  <div className="text-xs text-white">Score:</div>
                  <div className="text-sm text-white font-medium">
                    {topThree[2].score} <Coins className="inline size-4" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        {/* Leaderboard Table */}
        <div className="rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {restOfList.map((entry) => (
              <LeaderboardCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-4 *:max-w-1/2 ">
          <LeaderboardCard
            entry={{
              name: "Najim(You)",
              avatar:
                "https://ik.imagekit.io/golcqzkpl/1734767925484-7x84ch_4esE9FmK3?updatedAt=1734767928633",
              score: 300,
              position: 12,
            }}
          />
        </div>
      </div>
    </div>
  );
}
