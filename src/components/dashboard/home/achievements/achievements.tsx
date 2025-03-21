import type React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface AchievementProps {
  title: string;
  ribbonColor: string;
  icon: React.ReactNode;
}

const Achievement = ({ title, ribbonColor, icon }: AchievementProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-3">
        {/* Hexagon shape with shadow */}
        <div className="w-20 h-20 bg-gray-100 rounded-2xl relative flex items-center justify-center shadow-md overflow-hidden">
          {/* Medal ribbons */}
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

          {/* Medal circle */}
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="text-center mt-1 text-sm font-medium">{title}</div>
      </div>
    </div>
  );
};

export default function AchievementsSection() {
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium">Achievements</h2>
      </div>

      <div className="grid grid-cols-3 grid-rows-2 gap-4 mb-auto">
        <Achievement
          title="Comeback"
          ribbonColor="bg-indigo-400"
          icon={<div className="text-white text-xs">•••</div>}
        />
        <Achievement
          title="Lucky"
          ribbonColor="bg-cyan-400"
          icon={<div className="text-white text-xs">☺</div>}
        />
        <Achievement
          title="Leader"
          ribbonColor="bg-amber-400"
          icon={<div className="text-white text-xs">★</div>}
        />
        <Achievement
          title="Comeback"
          ribbonColor="bg-indigo-400"
          icon={<div className="text-white text-xs">•••</div>}
        />
        <Achievement
          title="Lucky"
          ribbonColor="bg-cyan-400"
          icon={<div className="text-white text-xs">☺</div>}
        />
        <Achievement
          title="Leader"
          ribbonColor="bg-amber-400"
          icon={<div className="text-white text-xs">★</div>}
        />
      </div>

      <Separator className="my-2" />

      <div className="text-center">
        <Link href="#" className="text-gray-400 text-sm">
          View all
        </Link>
      </div>
    </div>
  );
}
