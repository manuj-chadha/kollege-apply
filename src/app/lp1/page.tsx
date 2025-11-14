"use client";

import { useEffect, useRef, useState } from "react";
import FeeModal from "@/components/FeeModal";
import { ArrowRight, BookOpen, Building, Users } from "lucide-react";

export default function Page() {
  const [university, setUniversity] = useState<any | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const coursesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const load = async () => {
      const uni = await fetch(`/api/universities/uni-1`).then((r) => r.json());
      const crs = await fetch(`/api/universities/uni-1/courses`).then((r) => r.json());
      setUniversity(uni);
      setCourses(crs);
    };
    load();
  }, []);

  // header offset scroll
  const scrollToCourses = () => {
    if (!coursesRef.current) return;

    const offset = 120;
    const top = coursesRef.current.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  // format fee cleanly
  const formatMoney = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`;
    if (n >= 1000) return `₹${Math.round(n / 1000)}k`;
    return `₹${n}`;
  };

  const formatFeeRange = (fee: any) =>
    `${formatMoney(fee.min)} - ${formatMoney(fee.max)}`;

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 antialiased">

      {/* HERO */}
      <header className="bg-gradient-to-r from-sky-600 to-indigo-700 text-white pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start gap-8">
          <div className="flex-1">
            <p className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-4">
              Private University • Engineering & Business
            </p>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-sm">
              {university?.name ?? "Loading..."}
            </h1>

            <p className="mt-4 text-sky-100 max-w-2xl text-base md:text-lg leading-relaxed">
              {university?.overview ??
                "Building industry-ready graduates with hands-on labs, strong placements and modern campus life."}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                className="inline-flex items-center justify-center gap-2 bg-white text-sky-700 px-5 py-3 rounded-lg font-medium shadow hover:-translate-y-[2px] transition"
                href="/brochure.pdf"
                download
              >
                Download Brochure
                <ArrowRight size={16} />
              </a>

              <button
                onClick={scrollToCourses}
                className="inline-flex items-center justify-center gap-2 bg-sky-900/90 hover:bg-sky-800 px-5 py-3 rounded-lg font-medium shadow text-white transition"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-10 pb-28 md:pb-10">

        {/* COURSES */}
        <section ref={coursesRef} className="py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
            <h2 className="text-xl md:text-2xl font-semibold">Popular Courses</h2>
            <div className="text-sm text-slate-500">Explore course-wise fees & apply</div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <article
                key={course.courseId}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition hover:-translate-y-[2px]"
              >

                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4">

                  {/* LEFT */}
                  <div>
                    <h3 className="text-lg font-semibold">{course.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Duration: {course.durationMonths / 12} yrs
                    </p>
                  </div>

                  {/* RIGHT FEE RANGE */}
                  <div className="flex flex-col items-start sm:items-end min-w-[120px]">
                    <div className="text-xs text-slate-400 whitespace-nowrap">Fee Range</div>
                    <div className="font-semibold text-sky-700 text-sm sm:text-base leading-tight break-words">
                      {formatFeeRange(course.feeRange)}
                    </div>
                  </div>

                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedCourseId(course.courseId)}
                    className="inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md font-medium hover:bg-sky-700 transition"
                  >
                    Check Course-wise Fees
                  </button>
                </div>

              </article>
            ))}
          </div>
        </section>

        {/* FACILITIES */}
        <section className="mt-10">
          <div className="grid gap-6 md:grid-cols-3">

            <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-start">
              <div className="p-3 rounded-lg bg-sky-50">
                <Building className="text-sky-600" />
              </div>
              <div>
                <h4 className="font-semibold">Modern Campus</h4>
                <p className="text-sm text-slate-500 mt-1">
                  Contemporary classrooms, labs & green spaces.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-start">
              <div className="p-3 rounded-lg bg-sky-50">
                <Users className="text-sky-600" />
              </div>
              <div>
                <h4 className="font-semibold">Student Life</h4>
                <p className="text-sm text-slate-500 mt-1">
                  Clubs, events and active student community.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-start">
              <div className="p-3 rounded-lg bg-sky-50">
                <BookOpen className="text-sky-600" />
              </div>
              <div>
                <h4 className="font-semibold">Library & Research</h4>
                <p className="text-sm text-slate-500 mt-1">
                  Extensive resources and digital access.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* PLACEMENTS */}
        <section className="mt-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Placements</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-sky-600">18 LPA</div>
                <div className="text-xs text-slate-500">Highest Package</div>
              </div>

              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-sky-600">4.8 LPA</div>
                <div className="text-xs text-slate-500">Average Package</div>
              </div>

              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-sky-600">250+</div>
                <div className="text-xs text-slate-500">Recruiters</div>
              </div>

              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-sky-600">92%</div>
                <div className="text-xs text-slate-500">Placement Rate</div>
              </div>
            </div>
          </div>
        </section>

      </main>

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
