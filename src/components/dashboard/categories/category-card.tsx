import type React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ActionMenu from "../action-menu/action-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface CategoryQuizCardProps {
  id: number;
  icon?: string;
  loading?: boolean;
  color: string;
  questionCount: number;
  name: string;
  description: string;
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onStart?: (id: number) => void;
}

export const CategoryQuizCard = ({
  id,
  loading,
  icon,
  color,
  questionCount,
  name,
  description,
  onDelete,
  onEdit,
  onStart,
  isAdmin = false,
}: CategoryQuizCardProps) => {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
      whileTap={{ scale: 0.98 }}
      className="overflow-hidden rounded-lg"
    >
      <Card className="hover:shadow-md transition-shadow px-0 pt-0">
        <CardHeader
          className="py-4 min-h-[160px]"
          style={{ backgroundColor: color }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex justify-between items-start"
          >
            <Avatar className="h-8 w-8 rounded-sm z-0">
              <AvatarImage
                src={icon || "https://www.svgrepo.com/show/445599/category.svg"}
                alt={`${name}'s avatar`}
              />
              <AvatarFallback className="dark:bg-gray-800 dark:text-gray-200 border">
                {name?.charAt(0)?.toUpperCase() || "CG"}
              </AvatarFallback>
            </Avatar>

            <div className="flex">
              <Badge variant="secondary" className="bg-white/50">
                {questionCount} Questions
              </Badge>
              {isAdmin && (
                <ActionMenu
                  className="-mr-4"
                  onDelete={() => !!onDelete && onDelete(id)}
                  onEdit={() => !!onEdit && onEdit(id)}
                />
              )}
            </div>
          </motion.div>
          <CardTitle className="mt-4 md:text-xl">{name}</CardTitle>
          <CardDescription className="text-foreground/70">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            <Badge variant="outline">Easy</Badge>
            <Badge variant="outline">Medium</Badge>
            <Badge variant="outline">Hard</Badge>
          </motion.div>
        </CardContent>
        <CardFooter className={cn(isAdmin && "hidden")}>
          <Button onClick={() => !!onStart && onStart(id)} className="w-full">
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Start Quiz"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
