import React from "react";
import Image from "next/image";
import heroImg from "../../../../public/Illusttration.svg";
import { Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#6C5CE7] to-[#4834D4] min-h-screen -mt-16 py-10 md:py-16">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 md:grid-cols-1 items-center min-h-screen gap-8 py-20 lg:gap-20">
        {/* Text Content */}
        <div className="space-y-6 md:space-y-8 z-10 flex flex-col items-center text-center lg:text-start lg:items-start pt-20 lg:pt-0">
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Daily Quiz, Daily Bonus – Play Today!
          </h2>
          <p className="text-white text-base md:text-xl leading-relaxed">
            Challenge yourself, compete with others, and win amazing rewards
            daily.
          </p>
          <button className="bg-[#FFC107] mt-8 md:mt-12 text-lg md:text-xl text-black px-6 md:px-7 py-2.5 md:py-3 flex items-center gap-2 rounded-full hover:bg-[#FFB300] transition-colors">
            Play Now <Play className="w-5 h-5" />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-auto max-h-[500px] lg:h-[700px] lg:max-h-full">
          <Image
            src={heroImg}
            alt="hero"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          />
        </div>
      </div>

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="224"
          viewBox="0 0 1440 224"
          className="w-full"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 0L48 16C96 32 192 64 288 64C384 64 480 32 576 16C672 0 768 0 864 16C960 32 1056 64 1152 64C1248 64 1344 32 1392 16L1440 0V224H1392C1344 224 1248 224 1152 224C1056 224 960 224 864 224C768 224 672 224 576 224C480 224 384 224 288 224C192 224 96 224 48 224H0V0Z"
            className="fill-white dark:fill-gray-900 transition-colors duration-300"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
