import type React from "react";
import { Separator } from "@/components/ui/separator";
import { Achievement } from "@/stores/profileStore";
import { Button } from "@/components/ui/button";

const achievementConfig: any = {
  QUIZ_MASTER: {
    icon: "👑",
    ribbonColor: "bg-amber-400",
  },
  HIGH_SCORER: {
    icon: "🎯",
    ribbonColor: "bg-indigo-400",
  },
  STREAK_KEEPER: {
    icon: "🔥",
    ribbonColor: "bg-red-400",
  },
  FAST_SOLVER: {
    icon: "⚡",
    ribbonColor: "bg-cyan-400",
  },
  PERFECT_SCORE: {
    icon: "⭐",
    ribbonColor: "bg-green-400",
  },
};

const AchievementCard = ({
  title,
  description,
  type,
  earnedAt,
}: Achievement) => {
  const { icon, ribbonColor } = achievementConfig[type];

  return (
    <div className="flex flex-col items-center group relative">
      <div className="relative mb-3">
        <div className="w-20 h-20 bg-gray-100 rounded-2xl relative flex items-center justify-center shadow-md overflow-hidden">
          <div
            className={`absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1`}
          >
            <div
              className={`w-2.5 h-8 ${ribbonColor} -rotate-[25deg] rounded-sm`}
            ></div>
            <div
              className={`w-2.5 h-8 ${ribbonColor} rotate-[25deg] rounded-sm`}
            ></div>
          </div>
          <div
            className={`absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1`}
          >
            <div
              className={`w-2.5 h-8 ${ribbonColor} -rotate-[25deg] -translate-x-4 rounded-sm`}
            ></div>
            <div
              className={`w-2.5 h-8 ${ribbonColor} rotate-[25deg] translate-x-4 rounded-sm`}
            ></div>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-2xl">{icon}</span>
          </div>
        </div>
        <div className="text-center mt-1 text-sm font-medium">{title}</div>
      </div>

      {/* Tooltip for description and earned date */}
      {description && (
        <div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                      bg-gray-800 text-white text-xs rounded py-1 px-2 w-48 text-center"
        >
          <p>{description}</p>
          <p className="text-gray-300 text-xs mt-1">
            {new Date(earnedAt).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default function AchievementsSection({
  achievements,
}: {
  achievements: Achievement[] | [];
}) {

  return (
    <div className="w-full bg-white p-6 border border-gray-100 rounded-xl shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium">Achievements</h2>
      </div>

      {achievements.length > 0 ? (
        <div className="grid grid-cols-3 grid-rows-2 gap-4 mb-auto">
          {achievements?.map((achievement, index) => (
            <AchievementCard key={index} {...achievement} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full mb-auto">
          No Achievements
        </div>
      )}

      <Separator className="my-2" />

      <div className="text-center">
        <Button
          variant="link"
          className="text-gray-400 text-sm hover:text-gray-600 transition-colors hover:no-underline"
        >
          View all
        </Button>
      </div>
    </div>
  );
}
