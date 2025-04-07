import React from "react";
import { Brain, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden min-h-screen -mt-16 flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 -z-10" />
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Master Programming with{" "}
            <span className="text-primary">AI-Powered</span> Quizzes
          </h1>
          <p className="text-lg text-muted-foreground">
            BYTEBATTLE generates fresh, challenging questions across various
            programming languages, adapting to your skill level for a
            personalized learning experience.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/quiz/new" passHref>
              <Button size="lg" className="gap-2">
                <Zap className="h-5 w-5" />
                Start Coding Quiz
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline">
                Explore Languages
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 w-full relative">
          <div className="relative w-full h-[400px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-lg shadow-lg p-4 rotate-6 animate-float">
              <div className="h-4 w-32 bg-primary/20 rounded mb-2"></div>
              <div className="h-3 w-28 bg-primary/20 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-accent/30 rounded"></div>
                <div className="h-3 w-full bg-accent/30 rounded"></div>
                <div className="h-3 w-full bg-accent/30 rounded"></div>
              </div>
            </div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-lg shadow-lg p-4 -rotate-3 animate-bounce-slow">
              <div className="h-4 w-32 bg-primary/20 rounded mb-2"></div>
              <div className="h-3 w-28 bg-primary/20 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 w-full bg-accent/30 rounded"></div>
                <div className="h-8 w-full bg-accent/30 rounded"></div>
                <div className="h-8 w-full bg-accent/30 rounded"></div>
                <div className="h-8 w-full bg-accent/30 rounded"></div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Brain className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
