"use client";
import AchievementsSection from "@/components/dashboard/home/achievements/achievements";
import UserProfileCard from "@/components/dashboard/home/user-profile-card/user-profile-card";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";
import React from "react";
import PlayedQuizzesHistory from "./quiz-histories/quiz-histories";

const UserHome = () => {
  const { user } = useAuthStore();
  const { stats, achievements, quizHistory } = useProfileStore();
  return (
    <div className="w-full h-full flex flex-col space-y-16">
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
      <div className="grid grid-cols-2 flex-grow gap-10">
        <AchievementsSection achievements={achievements} />
        <PlayedQuizzesHistory quizHistory={quizHistory} />
      </div>
    </div>
  );
};

export default UserHome;
