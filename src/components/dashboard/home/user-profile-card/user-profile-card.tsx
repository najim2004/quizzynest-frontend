import {
  Check,
  ArrowUpNarrowWide,
  Puzzle,
  Coins,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function UserProfileCard() {
  return (
    <div className="flex flex-col sm:flex-row gap-5 items-center bg-[#6A5AE0] text-white p-5 rounded-4xl">
      {/* Profile Image Section */}

      <div className="relative rounded-4xl overflow-hidden size-52 flex items-center justify-center bg-gray-50">
        <Image
          src="https://s3-alpha-sig.figma.com/img/410c/340a/a057242400c608368f918307cdd72438?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=N311L7Krfcavx6KHOfe3GgI46SRRcioc5WHo0KxRETm3dktNkezQawpsdSscSbhmjfUrDzaLT3dKOCqLY0Cne1cL0QhTvNaQ8tCS-Jp4zzbMGCDtUhT4k3vPe8kGX-1QC9fB5bbPqQOR2jiV27VunsljAHaRFNUnwiVU0xBBAUX5GL8ICoeQcyWnBjzutSe0LjZRdVKLHNbpYjbes-pGUmlN367Cg2eXr19GStnI7-nkHn19xy~qie4RLooZ1eungJ7F8JVrad1dLR2hEgd0NVQfEMHTPTuupcwK~BxKeeZVQYcFFfaFJtacinC5uCplRPAysWR2knCAEKpK4D4Btg__"
          alt="Profile avatar"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Profile Details Section */}
      <div className="px-6 flex-1 max-w-6xl">
        <h2 className="text-4xl font-medium">John Willis</h2>
        <p className="text-gray-100 text-sm">johnwillis@gmai.com</p>

        {/* Progress Bar */}
        <div className="mb-1 mt-6">
          <Progress indicatorClassName="bg-gradient-to-r from-[#6C5CE7]/50 to-[#4834D4]/50" value={66.7} className="h-2" />
        </div>
        <div className="flex justify-end mb-6">
          <p className="text-gray-100 text-xs">success score 66.7%</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 *:px-2">
          <div className="flex items-center justify-center gap-4 border-r">
            <Puzzle className="size-10 text-gray-200" />
            <div className="">
              <h3 className="font-medium text-4xl">27</h3>
              <p className="text-gray-100 text-xs">Total Played Quizzes</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 border-r">
            <ArrowUpNarrowWide className="size-10 text-gray-200" />
            <div className="">
              <h3 className="font-medium text-4xl">910</h3>
              <p className="text-gray-100 text-xs">Highest Score</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 border-r">
            <Check className="size-10 text-gray-200" />
            <div className="">
              <h3 className="font-medium text-4xl">218</h3>
              <p className="text-gray-100 text-xs">Correct Answers</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Coins className="size-10 text-gray-200" />
            <div className="">
              <h3 className="font-medium text-4xl">218</h3>
              <p className="text-gray-100 text-xs">Total Earned Coins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
