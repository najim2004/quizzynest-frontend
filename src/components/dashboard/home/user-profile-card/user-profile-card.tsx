import { Check, ArrowUpNarrowWide, Puzzle, Coins } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { FC } from "react";
interface UserProfileCardProps {
  name: string;
  email: string;
  avatar: string;
  successRate?: number;
  totalPlayedQuizzes?: number;
  correctAnswers?: number;
  totalEarnedCoin?: number;
  highScore?: number;
  rankThisMonth?: number;
}

const UserProfileCard: FC<UserProfileCardProps> = ({
  name,
  email,
  avatar,
  successRate = 0,
  highScore = 0,
  totalPlayedQuizzes = 0,
  correctAnswers = 0,
  totalEarnedCoin = 0,
  rankThisMonth = 0,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-5 items-center bg-gradient-to-r from-[#6C5CE7] to-[#4834D4] text-white p-5 rounded-4xl">
      {/* Profile Image Section */}

      <div className="relative rounded-4xl overflow-hidden size-52 flex items-center justify-center bg-gray-50/60">
        <Image
          src={avatar || "https://img.icons8.com/officel/208/user.png"} // Add a fallback image
          alt={`${name}'s profile avatar`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 208px) 100vw, 208px" // size-52 = 208px
          priority // Load image with priority since it's above the fold
          onError={(e) => {
            // Fallback to default avatar if image fails to load
            const imgElement = e.target as HTMLImageElement;
            imgElement.src = "/default-avatar.png";
          }}
        />

        <h3 className="absolute top-0 right-0 text-xl font-medium text-[#6A5AE0] bg-white/90 px-3 py-1 rounded-bl-2xl italic z-10">
          #{rankThisMonth}
        </h3>
      </div>

      {/* Profile Details Section */}
      <div className="px-6 flex-1 max-w-6xl">
        <h2 className="text-4xl font-medium">{name}</h2>
        <p className="text-gray-100 text-sm">{email}</p>

        {/* Progress Bar */}
        <div className="mb-1 mt-6">
          <Progress
            indicatorClassName="bg-gradient-to-r from-[#6C5CE7]/50 to-[#4834D4]/50"
            value={successRate}
            className="h-2"
          />
        </div>
        <div className="flex justify-end mb-6">
          <p className="text-gray-100 text-xs">success score {successRate}%</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 *:px-2">
          <div className="flex items-center justify-center gap-4 border-r">
            <Puzzle className="size-10 text-gray-200" />
            <div className="">
              <h3 className="font-medium text-4xl">{totalPlayedQuizzes}</h3>
              <p className="text-gray-100 text-xs">Total Played Quizzes</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 border-r">
            <ArrowUpNarrowWide className="size-10 text-gray-200" />
            <div className="">
              <h3 className="font-medium text-4xl">{highScore}</h3>
              <p className="text-gray-100 text-xs">Highest Score</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 border-r">
            <Check className="size-10 text-gray-200" />
            <div className="">
              <h3 className="font-medium text-4xl">{correctAnswers}</h3>
              <p className="text-gray-100 text-xs">Correct Answers</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Coins className="size-10 text-gray-200" />
            <div className="">
              <h3 className="font-medium text-4xl">{totalEarnedCoin}</h3>
              <p className="text-gray-100 text-xs">Total Earned Coins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
