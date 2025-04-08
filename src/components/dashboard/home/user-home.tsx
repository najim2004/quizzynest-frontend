"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, BarChart3, Trophy, Calendar, ArrowUpRight } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";
import Image from "next/image";
import QuizHistoryCard from "./quiz-histories/quiz-histories-card";

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
};

export default function UserHome() {
  const { user } = useAuthStore();
  const { stats, achievements, quizHistory } = useProfileStore();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="w-full mx-auto pb-4"
    >
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

      {/* Tab Content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          variants={tabContentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full"
        >
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
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                  <CardDescription>
                    Your average scores by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div variants={staggerContainer} className="space-y-4">
                    {stats.categoryScores.map((category, index) => (
                      <motion.div
                        key={category.categoryId}
                        variants={slideIn}
                        custom={index}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            {category.categoryName}
                          </span>
                          <span className="text-sm font-medium">
                            {category.accuracy}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${category.accuracy}%` }}
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
                    <Link href="/dashboard/history">
                      <Button variant="ghost" size="sm" className="gap-1">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.div variants={staggerContainer} className="space-y-4">
                    {quizHistory?.slice(0, 3)?.map((quiz) => (
                      <motion.div key={quiz.id} variants={slideIn}>
                        <QuizHistoryCard
                          id={quiz.id}
                          categoryName={quiz.category.name}
                          completedAt={quiz.completedAt}
                          totalQuestions={quiz.totalQuestions}
                          correctAnswers={quiz.correctAnswers}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={fadeInUp} className="md:col-span-2">
              <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                  <div className="">
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>
                      Badges you&#39;ve earned through quizzing
                    </CardDescription>
                  </div>
                  <Link href="/dashboard/achievements">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
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
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
