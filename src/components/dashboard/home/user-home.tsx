"use client";
import AchievementsSection from "@/components/dashboard/home/achievements/achievements";
import PlayedQuizzesHistory from "@/components/dashboard/home/quizess-history/quizess-history";
import UserProfileCard from "@/components/dashboard/home/user-profile-card/user-profile-card";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";
import React from "react";

const UserHome = () => {
  const { user } = useAuthStore();
  const { stats, achievements, quizHistory } = useProfileStore();
  return (
    <div className="w-full space-y-16">
      <UserProfileCard
        name={user?.fullName || ""}
        email={user?.email || ""}
        avatar={user?.profile?.profilePic || ""}
        totalEarnedCoin={stats.totalEarnedCoin}
        totalPlayedQuizzes={stats.totalPlayedQuizzes}
        highScore={stats.highScore}
        correctAnswers={stats.totalCorrectAnswers}
        rankThisMonth={stats.rankThisMonth}
        successRate={stats.successRate}
      />
      <div className="grid grid-cols-2 gap-10">
        <AchievementsSection achievements={achievements} />
        <PlayedQuizzesHistory/>
      </div>
    </div>
  );
};

export default UserHome;
