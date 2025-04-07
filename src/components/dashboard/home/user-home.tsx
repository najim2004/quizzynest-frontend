"use client";

import { useState } from "react";
import Link from "next/link";
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
    <div className=" w-full mx-auto">
      {/* Profile Header */}
      <div className="rounded-xl p-6 border shadow-sm mb-8 flex flex-col md:flex-row gap-6 items-center md:items-start bg-primary">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
          {user?.profile?.profilePic ? (
            <Image
              src={user?.profile?.profilePic}
              alt="User Avatar"
              width={96}
              height={96}
              className="rounded-full"
            />
          ) : (
            <User className="h-12 w-12 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold">{user?.fullName}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            <Badge variant="outline" className="gap-1">
              <Calendar className="h-3 w-3" />
              Joined {userData.joinDate}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Trophy className="h-3 w-3" />
              {stats.totalEarnedCoin.toLocaleString()} points
            </Badge>
            <Badge variant="outline" className="gap-1">
              <BarChart3 className="h-3 w-3" />
              {stats?.totalPlayedQuizzes} quizzes
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/quiz/new">
            <Button>Start New Quiz</Button>
          </Link>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="flex border-b mb-8">
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
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {stats.totalEarnedCoin.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Quizzes Taken
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {stats.totalPlayedQuizzes}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.successRate}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Global Rank
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">#{stats.rankThisMonth}</div>
              </CardContent>
            </Card>
          </div>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Your average scores by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.categoryPerformance.map((category) => (
                  <div key={category.category}>
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Quizzes */}
          <Card className="md:col-span-2">
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
              <div className="space-y-4">
                {quizHistory?.map((quiz) => (
                  <div
                    key={quiz.id}
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
                          (quiz.correctAnswers / quiz.totalQuestions) * 100
                        )}
                        %
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Badges you&#39;ve earned through quizzing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {achievements.map((achievement) => (
                  <Badge
                    key={achievement.id}
                    variant="secondary"
                    className="px-3 py-1"
                  >
                    {achievement.title}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "history" && (
        <Card>
          <CardHeader>
            <CardTitle>Quiz History</CardTitle>
            <CardDescription>All quizzes you&#39;ve taken</CardDescription>
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
                      {new Date(quiz.completedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold">
                        {quiz.correctAnswers}/{quiz.totalQuestions}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Math.round(
                          (quiz.correctAnswers / quiz.totalQuestions) * 100
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
      )}

      {activeTab === "achievements" && (
        <div className="grid md:grid-cols-2 gap-8">
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
        </div>
      )}
    </div>
  );
}
