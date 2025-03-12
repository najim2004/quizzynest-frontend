import type React from "react";
import { DoorOpen, Gamepad2, Coins } from "lucide-react";

interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function HowItWorks() {
  const steps: Step[] = [
    {
      id: "enter-game",
      number: 1,
      title: "Enter the Game",
      description: "Choose your favorite quiz category and get started.",
      icon: <DoorOpen className="h-6 w-6" />,
    },
    {
      id: "play-quiz",
      number: 2,
      title: "Play the Quiz",
      description: "Answer questions and complete challenges within time.",
      icon: <Gamepad2 className="h-6 w-6" />,
    },
    {
      id: "earn-coins",
      number: 3,
      title: "Earn Coins",
      description: "Win coins and rewards for correct answers.",
      icon: <Coins className="h-6 w-6" />,
    },
  ];

  return (
    <section className="w-full mt-12 sm:mt-16 lg:mt-40 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">
          How It Works
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center"
            >
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full 
                bg-purple-100 dark:bg-purple-900"
              >
                <div className="text-purple-600 dark:text-purple-300">
                  {step.icon}
                </div>
              </div>
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
                <span>
                  {step.number}. {step.title}
                </span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
