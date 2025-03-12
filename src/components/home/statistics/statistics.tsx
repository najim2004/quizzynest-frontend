interface Statistic {
  id: string;
  value: string;
  label: string;
  gradient: string;
}

export default function Statistics() {
  const stats: Statistic[] = [
    {
      id: "quizzes-played",
      value: "50K+",
      label: "Quizzes Played",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      id: "active-players",
      value: "10K+",
      label: "Active Players",
      gradient: "from-purple-400 to-purple-600",
    },
    {
      id: "success-rate",
      value: "95%",
      label: "Success Rate",
      gradient: "from-green-400 to-green-600",
    },
    {
      id: "total-winners",
      value: "5K+",
      label: "Total Winners",
      gradient: "from-pink-400 to-pink-600",
    },
  ];

  return (
    <section className="w-full dark:bg-gray-900 mt-12 sm:mt-16 lg:mt-40 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group relative flex flex-col items-center p-6 rounded-xl 
                  bg-white dark:bg-gray-800 shadow-md dark:shadow-lg border border-gray-200 
                  dark:border-gray-700 transition-all duration-300 hover:scale-105
                  hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <span
                className={`mb-3 text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r 
                  ${stat.gradient} bg-clip-text text-transparent`}
              >
                {stat.value}
              </span>
              <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
