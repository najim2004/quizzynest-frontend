import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Player {
  id: string;
  name: string;
  points: number;
  rank: number;
  image: string;
  rankLabel: string;
}

export default function TopPlayers() {
  const players: Player[] = [
    {
      id: "alex-m",
      name: "Alex M.",
      points: 2850,
      rank: 2,
      image:
        "https://s3-alpha-sig.figma.com/img/410c/340a/a057242400c608368f918307cdd72438?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RMRl94mmHg9mWAHYlmRLZvE-jBVnrNo0xK9gpK-mOhwR1LlhjI7EcH~SCeG53xQG6gUBiLUIYKEZxzJVraHlziUkMLZ09ubz7CUemYeTQTHVCk1Q9iSyu0~KQJnYNL4P3b7KM-4SoYiNkLdkhXc~aXoMs9PC7b~ExM946qKLZzHHKH4dAf-oF4gXFLfosj4kMzacH2bY7h-TOPRtWedWTM5VoxqtP8ZoDYBWmdsQcMaxfh27C7yyHuHpOkvhH6hHlS3esgdTeBK1OMEd6dYEkAlwQaQ3z9GiRVdn0cWW7PgRgEuyLmImwigzpmmFAtVy8HSpgIFOTke4O88p3snrUA__",
      rankLabel: "2nd",
    },
    {
      id: "sarah-k",
      name: "Sarah K.",
      points: 3120,
      rank: 1,
      image:
        "https://s3-alpha-sig.figma.com/img/f578/f9c2/a181ef669150341163e63e6e9da01878?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=r3laRjezIlj6KXz3iORqHLqPjcg1uo2R7M5kPCInHUWaDjCjzpi69WZ6984x8PsnDDmIbxzqxa3GQw2llJ7oe-P1nwnwddHYEV6rFVnH0odVL8GJ~XS6svUivDMneXeq1FyranqKizyh5yMVLTh-tVVc7C9zkWlqbsiiX1x~qpQzFSOD8ZY8dIYmH6SimQokL7GHgN9PIRxtUW~0BvMcYl17cV7U5iZ3LJNQPh2VdFLYFuiLTmmEdWHNwZghTbuLbpP8P~kXynVnA99CsUIFcCNjZymE0syDdJIDDT9g~DiL8FAKoxLzU7YzeonUy5IHHFVgfIsXDO-aVt5ceQUv4w__",
      rankLabel: "1st",
    },
    {
      id: "mike-r",
      name: "Mike R.",
      points: 2640,
      rank: 3,
      image:
        "https://s3-alpha-sig.figma.com/img/1d5a/d8aa/f12fd61a75197f707f6ef40c7edd6e1f?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ce7VRhOhMUknI4Qpsf6F3WWW3VPraQQDbs1OzR4Kj-J7HtL0G-tyzXKVEjWa6xJM1tW6qmNKlNI7Tq~CVwiE~AQvjG9QjJzQJsY-orBAH4C28IiPL~40WpW2Sm746nawubq8S~FYwgpWNKBf45AxfWwOaWnksHGYq1VX215iRVjEfUdgKbjIqg-L5~oYX8yWZx2rs4Gm~3HtzcCEk7PL403GddIS2HukK4QmJqcUzC6t7H3Hi2wn7yDZHEv5ZFsuCklnrescw5HCxvNnwyE3T8puGYbeCwYcscwZTBbjPw9JxVfEBAyMYfL6Y2CYJFZ5w7WQ08TGdVk41MjgZg-HTw__",
      rankLabel: "3rd",
    },
  ];

  return (
    <section className="w-full bg-gray-900 dark:bg-gray-950 mt-12 sm:mt-16 lg:mt-40 py-12 sm:py-16 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 sm:mb-12 text-center text-xl sm:text-2xl md:text-3xl font-bold text-white">
          Top Players
        </h2>

        <div className="mb-6 sm:mb-8 flex flex-wrap items-end justify-center gap-6 sm:gap-8">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex flex-col items-center transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative mb-3">
                <Avatar
                  className={`border-2 border-gray-700 shadow-lg ring-2 ring-opacity-50 
                    ${
                      player.rank === 1
                        ? "ring-yellow-500 size-24"
                        : player.rank === 2
                        ? "ring-purple-500 size-20"
                        : "ring-gray-500 size-20"
                    }`}
                >
                  <AvatarImage src={player.image} alt={player.name} />
                  <AvatarFallback className="bg-gray-800 dark:bg-gray-700 text-gray-100">
                    {player.name.split(" ")[0][0]}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full 
                    ${
                      player.rank === 1
                        ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                        : player.rank === 2
                        ? "bg-gradient-to-br from-purple-400 to-purple-600"
                        : "bg-gradient-to-br from-gray-400 to-gray-600"
                    } 
                    text-xs font-bold text-white shadow-lg`}
                >
                  {player.rankLabel}
                </div>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-100 dark:text-gray-300">
                  {player.name}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {player.points} pts
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="secondary"
            className="rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white 
              hover:from-purple-600 hover:to-purple-800 transition-all duration-300 
              px-6 py-2 text-sm sm:text-base"
          >
            View Full Leaderboard
          </Button>
        </div>
      </div>
    </section>
  );
}
