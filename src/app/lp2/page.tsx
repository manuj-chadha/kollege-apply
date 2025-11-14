"use client";

import { useEffect, useState } from "react";
import FeeModal from "@/components/FeeModal";
import { Star, BookOpen, MapPin, Users } from "lucide-react";

export default function Page() {
  const [university, setUniversity] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const uni = await fetch(`/api/universities/uni-2`).then((r) => r.json());
      const crs = await fetch(`/api/universities/uni-2/courses`).then((r) => r.json());
      setUniversity(uni);
      setCourses(crs);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 antialiased">
      {/* HERO */}
      <header className="bg-gradient-to-r pt-16 from-purple-700 to-fuchsia-600 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-28 flex flex-col md:flex-row items-start gap-8">
          <div className="flex-1">
            <p className="inline-block bg-white/10 px-3 py-1 rounded-full text-sm font-medium mb-4">Private University • Management & Health Sciences</p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-sm">
              {university?.name ?? "Loading..."}
            </h1>
            <p className="mt-4 text-purple-100 max-w-2xl text-lg">
              {university?.overview ?? "Industry-aligned programs, global partnerships and strong placement support."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 bg-white text-purple-700 px-5 py-3 rounded-lg font-medium shadow hover:translate-y-[-2px] transition"
                href="/brochure.pdf"
                download
              >
                Download Brochure
                <Star size={16} />
              </a>

              <button
                onClick={() => setSelectedCourseId(courses[0]?.courseId ?? null)}
                className="inline-flex items-center gap-2 bg-purple-900/90 hover:bg-purple-800 px-5 py-3 rounded-lg font-medium shadow text-white transition"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 mt-10">
        {/* Courses */}
        <section className="bg-transparent py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Popular Courses</h2>
            <div className="text-sm text-slate-500">Check fees & start your application</div>
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
                    <div className="font-semibold text-purple-700">{course.feeRange.currency} {Math.round(course.feeRange.min/1000)}k - {Math.round(course.feeRange.max/1000)}k</div>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setSelectedCourseId(course.courseId)}
                    className="ml-auto inline-flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-800 transition"
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
              <div className="p-3 rounded-lg bg-purple-50"><MapPin className="text-purple-600"/></div>
              <div>
                <h4 className="font-semibold">Strategic Location</h4>
                <p className="text-sm text-slate-500 mt-1">Close to industry hubs & transit links.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-start">
              <div className="p-3 rounded-lg bg-purple-50"><Users className="text-purple-600"/></div>
              <div>
                <h4 className="font-semibold">Student Support</h4>
                <p className="text-sm text-slate-500 mt-1">Career counselling, mentorship and placement coaching.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-start">
              <div className="p-3 rounded-lg bg-purple-50"><BookOpen className="text-purple-600"/></div>
              <div>
                <h4 className="font-semibold">Industry Projects</h4>
                <p className="text-sm text-slate-500 mt-1">Capstone projects with partner companies.</p>
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
                <div className="text-2xl font-bold text-purple-700">22 LPA</div>
                <div className="text-xs text-slate-500">Highest Package</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700">5.2 LPA</div>
                <div className="text-xs text-slate-500">Average Package</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700">300+</div>
                <div className="text-xs text-slate-500">Recruiters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700">94%</div>
                <div className="text-xs text-slate-500">Placement Rate</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky CTA (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-sm border-t shadow-lg p-3 flex justify-between items-center">
        <div className="font-medium">Ready to apply?</div>
        <button onClick={() => setSelectedCourseId(courses[0]?.courseId ?? null)} className="bg-purple-700 text-white px-4 py-2 rounded text-sm">Apply Now</button>
      </div>

      {selectedCourseId && (
        <FeeModal
          universityId="uni-2"
          courseId={selectedCourseId}
          onClose={() => setSelectedCourseId(null)}
        />
      )}
    </div>
  );
}
