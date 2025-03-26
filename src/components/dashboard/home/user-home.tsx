"use client";
import AchievementsSection from "@/components/dashboard/home/achievements/achievements";
import PlayedQuizzesHistory from "@/components/dashboard/home/quizess-history/quizess-history";
import UserProfileCard from "@/components/dashboard/home/user-profile-card/user-profile-card";
import useAuthStore from "@/stores/authStore";
import React from "react";

const UserHome = () => {
  const { user } = useAuthStore();
  return (
    <div className="w-full space-y-16">
      <UserProfileCard
        name={user?.fullName || ""}
        email={user?.email || ""}
        avatar={user?.profile?.profilePic || ""}
      />
      <div className="grid grid-cols-2 gap-10">
        <AchievementsSection />
        <PlayedQuizzesHistory />
      </div>
    </div>
  );
};

export default UserHome;
