"use client";

import { useEffect, useState } from "react";
import FeeModal from "@/components/FeeModal";
import { ArrowRight, BookOpen, Building, Users } from "lucide-react";

export default function Page() {
  const [university, setUniversity] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const uni = await fetch(`/api/universities/uni-1`).then((r) => r.json());
      const crs = await fetch(`/api/universities/uni-1/courses`).then((r) => r.json());
      setUniversity(uni);
      setCourses(crs);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 antialiased">
      {/* HERO */}
      <header className="bg-gradient-to-r from-sky-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-28 flex flex-col md:flex-row items-start gap-8">
          <div className="flex-1">
            <p className="inline-block bg-white/10 px-3 py-1 rounded-full text-sm font-medium mb-4">Private University • Engineering & Business</p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-sm">
              {university?.name ?? "Loading..."}
            </h1>
            <p className="mt-4 text-sky-100 max-w-2xl text-lg">
              {university?.overview ?? "Building industry-ready graduates with hands-on labs, strong placements and modern campus life."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 bg-white text-sky-700 px-5 py-3 rounded-lg font-medium shadow hover:translate-y-[-2px] transition"
                href="/brochure.pdf"
                download
              >
                Download Brochure
                <ArrowRight size={16} />
              </a>

              <button
                onClick={() => setSelectedCourseId(courses[0]?.courseId ?? null)}
                className="inline-flex items-center gap-2 bg-sky-900/90 hover:bg-sky-800 px-5 py-3 rounded-lg font-medium shadow text-white transition"
              >
                Apply Now
              </button>
            </div>

            {/* quick stats */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-white/10 px-4 py-2 rounded-md">
                <div className="text-sm text-sky-100">Avg. Package</div>
                <div className="font-semibold text-xl">4.8 LPA</div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-md">
                <div className="text-sm text-sky-100">Placement Rate</div>
                <div className="font-semibold text-xl">92%</div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-md">
                <div className="text-sm text-sky-100">Top Recruiters</div>
                <div className="font-semibold text-xl">250+</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 mt-10">
        {/* Courses */}
        <section className="bg-transparent py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Popular Courses</h2>
            <div className="text-sm text-slate-500">Explore course-wise fees & apply</div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <article key={course.courseId} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{course.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">Duration: {course.durationMonths / 12} yrs</p>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-slate-400">Fee Range</div>
                    <div className="font-semibold">{course.feeRange.currency} {Math.round(course.feeRange.min/1000)}k - {Math.round(course.feeRange.max/1000)}k</div>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setSelectedCourseId(course.courseId)}
                    className="ml-auto inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md font-medium hover:bg-sky-700 transition"
                  >
                    Check Course-wise Fees
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Facilities */}
        <section className="mt-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-start">
              <div className="p-3 rounded-lg bg-sky-50"><Building className="text-sky-600"/></div>
              <div>
                <h4 className="font-semibold">Modern Campus</h4>
                <p className="text-sm text-slate-500 mt-1">Contemporary classrooms, labs & green spaces.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-start">
              <div className="p-3 rounded-lg bg-sky-50"><Users className="text-sky-600"/></div>
              <div>
                <h4 className="font-semibold">Student Life</h4>
                <p className="text-sm text-slate-500 mt-1">Clubs, events and active student community.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-start">
              <div className="p-3 rounded-lg bg-sky-50"><BookOpen className="text-sky-600"/></div>
              <div>
                <h4 className="font-semibold">Library & Research</h4>
                <p className="text-sm text-slate-500 mt-1">Extensive resources and digital access.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Placements */}
        <section className="mt-10 mb-20">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Placements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-600">18 LPA</div>
                <div className="text-xs text-slate-500">Highest Package</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-600">4.8 LPA</div>
                <div className="text-xs text-slate-500">Average Package</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-600">250+</div>
                <div className="text-xs text-slate-500">Recruiters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-600">92%</div>
                <div className="text-xs text-slate-500">Placement Rate</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky CTA (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-sm border-t shadow-lg p-3 flex justify-between items-center">
        <div className="font-medium">Want a callback from admissions?</div>
        <button onClick={() => setSelectedCourseId(courses[0]?.courseId ?? null)} className="bg-sky-700 text-white px-4 py-2 rounded-md">Apply Now</button>
      </div>

      {selectedCourseId && (
        <FeeModal
          universityId="uni-1"
          courseId={selectedCourseId}
          onClose={() => setSelectedCourseId(null)}
        />
      )}
    </div>
  );
}
