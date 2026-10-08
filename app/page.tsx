import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Placeholder sections below hero */}
      <section className="bg-white px-5 py-20 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Your next section
          </h2>
          <p className="text-lg text-gray-600">
            Add more content sections below the hero...
          </p>
        </div>
      </section>
    </div>
  );
}
