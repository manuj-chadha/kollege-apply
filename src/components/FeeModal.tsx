"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function FeeModal({ universityId, courseId, onClose }: any) {
  const [feeData, setFeeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    courseInterested: courseId,
    intakeYear: "",
    consent: false,
  });

  const pipedreamUrl = process.env.NEXT_PUBLIC_PIPEDREAM_URL;

  const theme =
    universityId === "uni-1"
      ? { color: "blue", bg: "bg-blue-600", hover: "hover:bg-blue-700" }
      : { color: "purple", bg: "bg-purple-600", hover: "hover:bg-purple-700" };

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        `/api/universities/${universityId}/fees?courseId=${courseId}`
      );
      const data=await res.json()
      setFeeData(data.feeResponse);
      setLoading(false);
    };
    load();
  }, [courseId, universityId]);

  const update = (key: string, value: any) =>
    setForm({ ...form, [key]: value });

  const submit = async () => {
    if (Object.values(form).includes("") || !form.consent) {
      alert("Please fill all fields.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      alert("Invalid phone number.");
      return;
    }

    await fetch(pipedreamUrl!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, university: universityId }),
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colored Header */}
        <div
          className={`${theme.bg} text-white px-5 py-4 flex justify-between items-center`}
        >
          <h2 className="text-lg font-semibold">Course Fees & Admissions</h2>
          <button onClick={onClose}>
            <X size={20} className="opacity-90" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <p className="text-center py-10">Loading...</p>
          ) : (
            <>
              {/* Fees Box */}
              <div className="bg-gray-50 border rounded-lg p-4 mb-5">
                <p className="font-medium text-base">
                  Tuition: {feeData.fees.tuitionPerYear}
                </p>
                <p className="text-sm text-gray-700">
                  Hostel: {feeData.fees.hostelPerYear}
                </p>
                <p
                  className={`font-semibold mt-1 ${
                    theme.color === "blue" ? "text-blue-600" : "text-purple-600"
                  }`}
                >
                  First Year Total: {feeData.fees.approxTotalFirstYear}
                </p>
              </div>

              <h3 className="text-lg font-semibold mb-3">Apply Now</h3>

              <div className="space-y-3">
                {/* Inputs */}
                {["fullName", "email", "phone"].map((field) => (
                  <input
                    key={field}
                    placeholder={
                      field === "fullName"
                        ? "Full Name"
                        : field === "email"
                        ? "Email"
                        : "Phone (10 digit)"
                    }
                    maxLength={field === "phone" ? 10 : undefined}
                    className="w-full border p-3 rounded-md text-sm focus:ring-2 focus:ring-black/10"
                    onChange={(e) => update(field, e.target.value)}
                  />
                ))}

                <select
                  className="w-full border p-3 rounded-md text-sm focus:ring-2 focus:ring-black/10"
                  onChange={(e) => update("state", e.target.value)}
                >
                  <option value="">Select State</option>
                  {["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "UP"].map(
                    (s) => (
                      <option key={s}>{s}</option>
                    )
                  )}
                </select>

                <select
                  className="w-full border p-3 rounded-md text-sm focus:ring-2 focus:ring-black/10"
                  onChange={(e) => update("intakeYear", e.target.value)}
                >
                  <option value="">Intake Year</option>
                  {[2025, 2026, 2027].map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>

                <label className="flex gap-2 text-xs text-gray-700">
                  <input
                    type="checkbox"
                    onChange={(e) => update("consent", e.target.checked)}
                  />
                  I agree to be contacted by the admissions team.
                </label>

                <button
                  onClick={submit}
                  className={`w-full ${theme.bg} ${theme.hover} text-white py-3 rounded-md text-sm font-medium transition`}
                >
                  Submit Application
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-scaleUp {
          animation: scaleUp 0.2s ease-out;
        }
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
