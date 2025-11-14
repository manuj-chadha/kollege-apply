import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-blue-50 to-purple-50 pt-28 px-4">

      {/* Gradient Blobs */}
      <div className="absolute top-32 left-10 w-60 h-60 bg-blue-300/20 blur-3xl rounded-full -z-10 md:w-72 md:h-72 md:left-20" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-300/20 blur-3xl rounded-full -z-10 md:w-72 md:h-72 md:right-20" />

      {/* Hero Card */}
      <div className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-lg rounded-2xl px-6 py-10 text-center max-w-2xl md:px-10 md:py-16">
        
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Build Better University Experiences
        </h1>

        <p className="text-gray-700 mt-4 text-base md:text-lg leading-relaxed">
          Two university landing pages with dynamic APIs, fee modals, and Pipedream
          lead integration for the KollegeApply assessment.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
          <a
            href="/lp1"
            className="px-6 py-3 rounded-xl text-white font-medium bg-blue-600 hover:bg-blue-700 transition shadow-md w-full sm:w-auto text-center"
          >
            Open LP1
          </a>

          <a
            href="/lp2"
            className="px-6 py-3 rounded-xl text-white font-medium bg-purple-600 hover:bg-purple-700 transition shadow-md w-full sm:w-auto text-center"
          >
            Open LP2
          </a>
        </div>
      </div>

      <p className="text-gray-600 mt-12 text-sm md:text-base">
        KollegeApply Assessment
      </p>
    </main>
  );
}
