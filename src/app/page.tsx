import CTASection from "@/components/home/cta-section/cta-section";
import FeaturedQuizzes from "@/components/home/featured-quiz/featured-quiz";
import Hero from "@/components/home/hero/hero";
import HowItWorks from "@/components/home/how-it-works/how-it-works";
import QuizCategories from "@/components/home/quiz-categories/quiz-categories";
import Statistics from "@/components/home/statistics/statistics";
import TopPlayers from "@/components/home/top-players/top-players";
import React from "react";

const Home = () => {
  return (
    <>
      <Hero />
      <QuizCategories/>
      <FeaturedQuizzes/>
      <TopPlayers/>
      <HowItWorks/>
      <Statistics/>
      <CTASection/>
    </>
  );
};

export default Home;
