import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { CoinsIcon } from "lucide-react";

type LeaderboardEntry = {
  id?: number;
  name: string;
  avatar: string;
  score: number;
  position: number;
};

export default function LeaderboardCard({
  entry,
}: {
  entry: LeaderboardEntry;
}) {
  return (
    <Card className="flex-row items-center gap-4 px-4 py-3.5 rounded-lg bg-white w-full transition-all shadow-none">
      {/* Rank Indicator */}
      <div className="size-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium text-sm">
        {entry.position}
      </div>

      {/* Avatar */}
      <Avatar className="size-14">
        <AvatarImage className="object-cover" src={entry.avatar} alt={entry.name} />
        <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
      </Avatar>

      {/* Name & Points */}
      <div className="flex-1 md:flex items-center justify-between">
        <div className="font-semibold text-gray-800">{entry.name}</div>
        <div className="text-gray-500 text-sm">
          {entry.score} <CoinsIcon className="w-4 h-4 text-yellow-400 inline" />
        </div>
      </div>
    </Card>
  );
}
