import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-blue-50 to-purple-50">
      
      {/* Soft Blur Decoration */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-300/20 blur-3xl rounded-full -z-10" />

      {/* Hero Card */}
      <div className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-lg rounded-2xl px-10 py-16 text-center max-w-3xl mx-auto">
        
        <h1 className="text-4xl font-bold text-gray-900">
          Build Better University Experiences
        </h1>

        <p className="text-gray-700 mt-4 text-lg">
          Two high-quality landing pages with dynamic APIs, fee modals, and Pipedream 
          lead integration — crafted for the KollegeApply assignment.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <a
            href="/lp1"
            className="px-6 py-3 rounded-xl text-white font-medium bg-blue-600 hover:bg-blue-700 transition shadow-md"
          >
            Open LP1
          </a>
          <a
            href="/lp2"
            className="px-6 py-3 rounded-xl text-white font-medium bg-purple-600 hover:bg-purple-700 transition shadow-md"
          >
            Open LP2
          </a>
        </div>
      </div>

      <p className="text-gray-600 mt-12">
        © 2025 KollegeApply Assessment
      </p>
    </main>
  );
}
