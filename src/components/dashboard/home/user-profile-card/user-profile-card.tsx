import { Check, ArrowUpNarrowWide, Puzzle, Coins } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { FC } from "react";
interface UserProfileCardProps {
  name: string;
  email: string;
  avatar: string;
  successRate?: number;
  totalPlayedQuizess?: number;
  correctAnswers?: number;
  totalEarnedCoin?: number;
  highScore?: number;
}

const UserProfileCard: FC<UserProfileCardProps> = ({
  name,
  email,
  avatar,
  successRate = 0,
  highScore = 0,
  totalPlayedQuizess = 0,
  correctAnswers = 0,
  totalEarnedCoin = 0,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-5 items-center bg-[#6A5AE0] text-white p-5 rounded-4xl">
      {/* Profile Image Section */}

      <div className="relative rounded-4xl overflow-hidden size-52 flex items-center justify-center bg-gray-50">
        <Image
          src={avatar}
          alt="Profile avatar"
          fill
          className="object-cover object-center"
        />
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
              <h3 className="font-medium text-4xl">{totalPlayedQuizess}</h3>
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
