"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function FeeModal({
  universityId,
  courseId,
  onClose,
}: {
  universityId: string;
  courseId: string;
  onClose: () => void;
}) {
  const [feeData, setFeeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState<"success" | "error" | null>(null);

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
      ? { bg: "bg-blue-600", hover: "hover:bg-blue-700", highlight: "text-blue-600" }
      : { bg: "bg-purple-600", hover: "hover:bg-purple-700", highlight: "text-purple-600" };

  // Fetch Fee Data
  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/universities/${universityId}/fees?courseId=${courseId}`);
      const data = await res.json();
      setFeeData(data.feeResponse);
      setLoading(false);
    };
    load();
  }, [courseId, universityId]);

  const update = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    // Validation
    if (Object.values(form).includes("") || !form.consent) {
      alert("Please fill all fields.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      alert("Invalid phone number.");
      return;
    }

    // Submit
    try {
      const res = await fetch(pipedreamUrl!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, university: universityId }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => onClose(), 1200);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
        {/* Header */}
        <div className={`${theme.bg} text-white px-5 py-4 flex justify-between items-center`}>
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
              {/* STATUS MESSAGE */}
              {status === "success" && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 text-sm rounded-md">
                  Application submitted successfully!
                </div>
              )}

              {status === "error" && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md">
                  Something went wrong. Please try again.
                </div>
              )}

              {/* Fees */}
              <div className="bg-gray-50 border rounded-lg p-4 mb-5">
                <p className="font-medium text-base">
                  Tuition: {feeData.fees.tuitionPerYear}
                </p>
                <p className="text-sm text-gray-700">
                  Hostel: {feeData.fees.hostelPerYear}
                </p>

                <p className={`font-semibold mt-1 ${theme.highlight}`}>
                  First Year Total: {feeData.fees.approxTotalFirstYear}
                </p>
              </div>

              <h3 className="text-lg font-semibold mb-3">Apply Now</h3>

              <div className="space-y-3">
                {/* Basic Inputs */}
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

                {/* State */}
                <select
                  className="w-full border p-3 rounded-md text-sm focus:ring-2 focus:ring-black/10"
                  onChange={(e) => update("state", e.target.value)}
                >
                  <option value="">Select State</option>
                  {["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "UP"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>

                {/* Intake Year */}
                <select
                  className="w-full border p-3 rounded-md text-sm focus:ring-2 focus:ring-black/10"
                  onChange={(e) => update("intakeYear", e.target.value)}
                >
                  <option value="">Intake Year</option>
                  {[2025, 2026, 2027].map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>

                {/* Consent */}
                <label className="flex gap-2 text-xs text-gray-700">
                  <input
                    type="checkbox"
                    onChange={(e) => update("consent", e.target.checked)}
                  />
                  I agree to be contacted by the admissions team.
                </label>

                {/* Submit */}
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
