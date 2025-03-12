import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="w-full bg-[#6366F1] mt-12 sm:mt-16 lg:mt-40 py-16 lg:py-36 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Ready to Test Your Knowledge?
        </h2>
        <p className="mb-8 text-lg text-white/90">
          Join millions of quiz enthusiasts today!
        </p>
        <Button
          size="lg"
          className="rounded-md bg-white px-8 text-gray-800 hover:bg-gray-100"
        >
          Get Started for Free
        </Button>
      </div>
    </section>
  );
}

