import AchievementsSection from "@/components/dashboard/home/achievements/achievements";
import PlayedQuizzesHistory from "@/components/dashboard/home/quizess-history/quizess-history";
import UserProfileCard from "@/components/dashboard/home/user-profile-card/user-profile-card";
import React from "react";

const DashboardHome = () => {
  return (
    <div className="w-full p-4 space-y-16">
      <UserProfileCard />
      <div className="grid grid-cols-2 gap-10">
        <AchievementsSection />
        <PlayedQuizzesHistory />
      </div>
    </div>
  );
};

export default DashboardHome;
