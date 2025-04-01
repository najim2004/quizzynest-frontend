
import QuestionCreateButton from "@/components/dashboard/questions/question-create-button";
import QuizQuestions from "@/components/dashboard/questions/questions";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const DashboardQuestions = () => {
  return (
    <div className="max-h-full overflow-y-auto w-full p-0.5">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 flex-1">
          <Input
            name="search"
            type="search"
            placeholder="Search"
            className="focus-visible:ring-0"
          />
          
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="geography">Geography</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <QuestionCreateButton />
      </div>
      <QuizQuestions />
    </div>
  );
};

export default DashboardQuestions;
