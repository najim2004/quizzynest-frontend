import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#6C5CE7] to-[#4834D4] h-screen -mt-16">
      Hero
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="224"
          viewBox="0 0 1440 224"
          className="w-full dark:invert"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 0L48 16C96 32 192 64 288 64C384 64 480 32 576 16C672 0 768 0 864 16C960 32 1056 64 1152 64C1248 64 1344 32 1392 16L1440 0V224H1392C1344 224 1248 224 1152 224C1056 224 960 224 864 224C768 224 672 224 576 224C480 224 384 224 288 224C192 224 96 224 48 224H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
