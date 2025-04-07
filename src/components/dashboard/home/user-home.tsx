"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, BarChart3, Trophy, Calendar, ArrowUpRight } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";
import Image from "next/image";

// Animation variants
const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
};

const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.4 } },
};

const tabContentVariants = {
  initial: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  joinDate: "Jan 2023",
  totalScore: 9850,
  quizzesTaken: 42,
  averageScore: 85,
  badges: [
    "Science Expert",
    "History Buff",
    "Quiz Master",
    "Perfect Score",
    "Speed Demon",
  ],
  recentQuizzes: [
    { id: "1", category: "Science", score: 9, total: 10, date: "2023-03-01" },
    { id: "2", category: "History", score: 8, total: 10, date: "2023-02-28" },
    {
      id: "3",
      category: "Technology",
      score: 10,
      total: 10,
      date: "2023-02-25",
    },
    { id: "4", category: "Geography", score: 7, total: 10, date: "2023-02-20" },
  ],
  categoryPerformance: [
    { category: "Science", score: 92 },
    { category: "History", score: 88 },
    { category: "Technology", score: 95 },
    { category: "Geography", score: 78 },
    { category: "Entertainment", score: 82 },
  ],
};

export default function UserHome() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuthStore();
  const { stats, achievements, quizHistory } = useProfileStore();

  return (
    <motion.div initial="initial" animate="animate" className="w-full mx-auto pb-4">
      {/* Profile Header */}
      <motion.div
        variants={fadeInUp}
        className="rounded-xl p-6 border shadow-sm mb-8 flex flex-col md:flex-row gap-6 items-center md:items-start bg-primary"
      >
        <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center">
          {user?.profile?.profilePic ? (
            <Image
              src={user?.profile?.profilePic}
              alt="User Avatar"
              width={96}
              height={96}
              className="rounded-full"
            />
          ) : (
            <User className="h-12 w-12 text-muted" />
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-muted">{user?.fullName}</h1>
          <p className="text-muted">{user?.email}</p>
          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            <Badge
              variant="outline"
              className="gap-1 text-muted border-muted/30"
            >
              <Calendar className="h-3 w-3" />
              Joined {userData.joinDate}
            </Badge>
            <Badge
              variant="outline"
              className="gap-1 text-muted border-muted/30"
            >
              <Trophy className="h-3 w-3" />
              {stats.totalEarnedCoin.toLocaleString()} points
            </Badge>
            <Badge
              variant="outline"
              className="gap-1 text-muted border-muted/30"
            >
              <BarChart3 className="h-3 w-3" />
              {stats?.totalPlayedQuizzes} quizzes
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/quiz/new">
            <Button variant="default" className="bg-muted/50 font-medium">
              Start New Quiz
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Profile Tabs */}
      <motion.div variants={slideIn} className="flex border-b mb-8">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "overview"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "history"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("history")}
        >
          Quiz History
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "achievements"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("achievements")}
        >
          Achievements
        </button>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab}
          variants={tabContentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full"
        >
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Stats Cards */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  {
                    title: "Total Score",
                    value: stats.totalEarnedCoin.toLocaleString(),
                  },
                  { title: "Quizzes Taken", value: stats.totalPlayedQuizzes },
                  { title: "Average Score", value: `${stats.successRate}%` },
                  { title: "Global Rank", value: `#${stats.rankThisMonth}` },
                ].map((stat, index) => (
                  <motion.div key={index} variants={scaleIn}>
                    <Card className="h-full w-full">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{stat.value}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Category Performance */}
              <motion.div variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>Category Performance</CardTitle>
                    <CardDescription>
                      Your average scores by category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      variants={staggerContainer}
                      className="space-y-4"
                    >
                      {userData.categoryPerformance.map((category, index) => (
                        <motion.div
                          key={category.category}
                          variants={slideIn}
                          custom={index}
                        >
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              {category.category}
                            </span>
                            <span className="text-sm font-medium">
                              {category.score}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${category.score}%` }}
                            ></div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Quizzes */}
              <motion.div variants={fadeInUp} className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Quizzes</CardTitle>
                      <Link href="/profile/history">
                        <Button variant="ghost" size="sm" className="gap-1">
                          View All
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      variants={staggerContainer}
                      className="space-y-4"
                    >
                      {quizHistory?.slice(0, 3)?.map((quiz) => (
                        <motion.div
                          key={quiz.id}
                          variants={slideIn}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{quiz.category.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(quiz.completedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">
                              {quiz.correctAnswers}/{quiz.totalQuestions}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {Math.round(
                                (quiz.correctAnswers / quiz.totalQuestions) *
                                  100
                              )}
                              %
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Achievements */}
              <motion.div variants={fadeInUp} className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>
                      Badges you&#39;ve earned through quizzing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      variants={staggerContainer}
                      className="flex flex-wrap gap-2"
                    >
                      {achievements.map((achievement) => (
                        <motion.div key={achievement.id} variants={scaleIn}>
                          <Badge variant="secondary" className="px-3 py-1">
                            {achievement.title}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quiz History</CardTitle>
                  <CardDescription>
                    All quizzes you&#39;ve taken
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quizHistory.map((quiz, index) => (
                      <div
                        key={`${quiz.id}-${index}`}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{quiz.category.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(quiz.completedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold">
                              {quiz.correctAnswers}/{quiz.totalQuestions}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {Math.round(
                                (quiz.correctAnswers / quiz.totalQuestions) *
                                  100
                              )}
                              %
                            </p>
                          </div>
                          <Link href={`/quiz/results/${quiz.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">Load More</Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Earned Badges</CardTitle>
                  <CardDescription>
                    Achievements you&#39;ve unlocked
                  </CardDescription>
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
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
