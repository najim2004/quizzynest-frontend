"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useProfileStore from "@/stores/profileStore";
import { Trophy } from "lucide-react";
import PrivateRoute from "@/components/private-route/private-route";

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const Achievement = () => {
  const { achievements } = useProfileStore();
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="p-4"
    >
      <div className="flex flex-col justify-center items-center mb-8 p-2">
        <h2 className="leading-none font-semibold text-lg">Achievements</h2>
        <p className="text-muted-foreground text-sm">
          All achievements you&#39;ve earned
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Earned Badges</CardTitle>
            <CardDescription>Achievements you&#39;ve unlocked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {achievements?.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-muted/50 rounded-lg p-4 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Earned on Feb 28, 2023
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Badges</CardTitle>
            <CardDescription>Achievements to unlock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Geography Pro",
                "Music Maestro",
                "Entertainment Guru",
                "100 Quizzes",
              ].map((badge) => (
                <div
                  key={badge}
                  className="bg-muted/50 rounded-lg p-4 text-center opacity-60"
                >
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                    <Trophy className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="font-medium">{badge}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Not yet earned
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default function Page() {
  return (
    <PrivateRoute roles={["USER"]}>
      <Achievement />
    </PrivateRoute>
  );
}
