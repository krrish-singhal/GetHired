import { useState, useEffect } from "react";
import { getFeedbacks, submitFeedback } from "../../services/api";

const DUMMY_FEEDBACKS = [
  {
    _id: "d1",
    name: "Aarav Sharma",
    designation: "Final Year",
    message:
      "GetHired helped me land my dream job at Infosys! The placement stats and company insights were incredibly useful during preparation.",
    createdAt: new Date("2025-03-10").toISOString(),
  },
  {
    _id: "d2",
    name: "Priya Gupta",
    designation: "Third Year",
    message:
      "Amazing platform! The trending skills section helped me understand what companies are actually looking for. Highly recommend to every KIET student.",
    createdAt: new Date("2025-04-01").toISOString(),
  },
  {
    _id: "d3",
    name: "Rohan Verma",
    designation: "Alumni",
    message:
      "I check this platform even after getting placed to refer my juniors. The blog posts and placement calendar are top-notch.",
    createdAt: new Date("2025-04-18").toISOString(),
  },
];

const DESIGNATIONS = [
  "First Year",
  "Second Year",
  "Third Year",
  "Final Year",
  "Alumni",
  "Faculty",
];

const AVATAR_COLORS = [
  "bg-yellow-400 text-yellow-900",
  "bg-blue-400 text-blue-900",
  "bg-green-400 text-green-900",
  "bg-purple-400 text-purple-900",
  "bg-pink-400 text-pink-900",
  "bg-orange-400 text-orange-900",
];

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
      </div>
    </div>
  );
}

function FeedbackCard({ feedback, colorClass }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Quote icon */}
      <div className="text-yellow-400 text-3xl leading-none select-none">"</div>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
        {feedback.message}
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${colorClass}`}
        >
          {getInitials(feedback.name)}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-white">
            {feedback.name}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {feedback.designation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", designation: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getFeedbacks()
      .then((res) => {
        setFeedbacks(res.data.length ? res.data : DUMMY_FEEDBACKS);
      })
      .catch(() => setFeedbacks(DUMMY_FEEDBACKS))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.designation || !form.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await submitFeedback(form);
      setFeedbacks((prev) => [res.data, ...prev]);
      setForm({ name: "", designation: "", message: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const displayFeedbacks = loading ? Array(3).fill(null) : feedbacks;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Heading */}
        <div className="mb-10">
          <span className="inline-block bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            What Students Say
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            Real feedback from the KIET community
          </p>
        </div>

        {/* Feedback Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {loading
            ? Array(3)
                .fill(null)
                .map((_, i) => <SkeletonCard key={i} />)
            : displayFeedbacks.map((fb, i) => (
                <FeedbackCard
                  key={fb._id}
                  feedback={fb}
                  colorClass={AVATAR_COLORS[i % AVATAR_COLORS.length]}
                />
              ))}
        </div>

        {/* Submit Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Share Your Feedback
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Your thoughts help us improve. We'd love to hear from you!
          </p>

          {success && (
            <div className="mb-5 flex items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3 text-sm">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.704 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Thanks for your feedback! It has been sent successfully. 🎉
            </div>
          )}

          {error && (
            <div className="mb-5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                  Designation
                </label>
                <select
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                >
                  <option value="">Select year / role</option>
                  {DESIGNATIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                Your Feedback
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Share your experience with GetHired..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-8 py-2.5 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Sending...
                </>
              ) : (
                "Submit Feedback"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
