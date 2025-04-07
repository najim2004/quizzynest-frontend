"use client";
import NewQuizPage from "@/components/dashboard/quiz/new-quiz";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCategoryStore } from "@/stores/categoryStore";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function QuizCategories() {
  const { categories } = useCategoryStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const onStart = async (id: number) => {
    setSelectedCategoryId(id);
  };
  return (
    <>
      <div className="w-full p-4">
        <div className="mb-4">
          <Input
            name="search"
            type="search"
            placeholder="Search questions..."
            className="focus-visible:ring-0 w-min"
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden hover:shadow-md transition-shadow px-0 pt-0 rounded-lg"
            >
              <CardHeader
                className="py-4 min-h-[160px]"
                style={{ backgroundColor: category.color }}
              >
                <div className="flex justify-between items-start">
                  <Avatar className="h-8 w-8 rounded-sm">
                    <AvatarImage
                      src={
                        category.icon ||
                        "https://www.svgrepo.com/show/445599/category.svg"
                      }
                      alt={`${category?.name}'s avatar`}
                    />
                    <AvatarFallback className="dark:bg-gray-800 dark:text-gray-200 border">
                      {category.name?.charAt(0)?.toUpperCase() || "CG"}
                    </AvatarFallback>
                  </Avatar>

                  <Badge variant="secondary" className="bg-white/50">
                    {category._count.quizzes}+ Questions
                  </Badge>
                </div>
                <CardTitle className="mt-4 md:text-xl">
                  {category.name}
                </CardTitle>
                <CardDescription className="text-foreground/70">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Easy</Badge>
                  <Badge variant="outline">Medium</Badge>
                  <Badge variant="outline">Hard</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => onStart(category.id)} className="w-full">
                  Start Quiz
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div
        className={`absolute transform top-0 duration-1000 w-full p-4 ${
          selectedCategoryId ? "translate-x-0" : "translate-x-[100vw]"
        }`}
      >
        <div className="relative">
          <Button
            onClick={() => setSelectedCategoryId(null)}
            size="icon"
            variant="outline"
            className="absolute top-0.5 left-0.5"
          >
            <ArrowLeft />
          </Button>
          <NewQuizPage categoryId={selectedCategoryId} />
        </div>
      </div>
    </>
  );
}
