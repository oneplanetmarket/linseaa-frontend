import React, { useMemo, useState } from "react";

/**
 * EnrolledCourses.jsx
 * - Self-contained React component (JSX)
 * - Uses Tailwind CSS classes for layout & styling
 * - No external UI libs required
 *
 * Usage: import EnrolledCourses from "./EnrolledCourses"; <EnrolledCourses />
 */

export default function EnrolledCourses() {
  // UI state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [level, setLevel] = useState("All Levels");
  const [statusFilter, setStatusFilter] = useState("All");

  // Sample course data
  const courses = [
    {
      id: 1,
      title: "Fundamentals of Waste Management",
      category: "Waste Management",
      level: "Beginner",
      status: "Completed",
      progress: 100,
      due: "Dec 15, 2024",
      certificateIssued: true,
    },
    {
      id: 2,
      title: "Safety Protocols in Waste Handling",
      category: "Safety",
      level: "Beginner",
      status: "Completed",
      progress: 100,
      due: "Dec 10, 2024",
      certificateIssued: true,
    },
    {
      id: 3,
      title: "Recycling & Disposal Techniques",
      category: "Recycling",
      level: "Intermediate",
      status: "In Progress",
      progress: 65,
      due: "Dec 30, 2024",
      certificateIssued: false,
    },
    {
      id: 4,
      title: "Hazardous Waste Identification",
      category: "Safety",
      level: "Intermediate",
      status: "In Progress",
      progress: 40,
      due: "Jan 10, 2025",
      certificateIssued: false,
    },
    {
      id: 5,
      title: "Sustainable Waste Solutions",
      category: "Sustainability",
      level: "Advanced",
      status: "In Progress",
      progress: 25,
      due: "Jan 25, 2025",
      certificateIssued: false,
    },
    {
      id: 6,
      title: "Advanced Waste Audit Practices",
      category: "Waste Management",
      level: "Advanced",
      status: "Not Started",
      progress: 0,
      due: "Feb 05, 2025",
      certificateIssued: false,
    },
  ];

  const categories = [
    "All Categories",
    "Waste Management",
    "Safety",
    "Recycling",
    "Sustainability",
  ];
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
  const statuses = ["All", "Not Started", "In Progress", "Completed"];

  // Filtering logic
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (search.trim()) {
        const s = search.toLowerCase();
        if (!c.title.toLowerCase().includes(s)) return false;
      }
      if (category !== "All Categories" && c.category !== category) return false;
      if (level !== "All Levels" && c.level !== level) return false;
      if (statusFilter !== "All" && c.status !== statusFilter) return false;
      return true;
    });
  }, [courses, search, category, level, statusFilter]);

  // Progress summary (across all courses)
  const totalCourses = courses.length;
  const completedCount = courses.filter((c) => c.status === "Completed")
    .length;
  const overallProgress =
    totalCourses > 0
      ? Math.round(
          courses.reduce((acc, c) => acc + (c.progress || 0), 0) / totalCourses
        )
      : 0;

  // helper: status color classes
  const statusClasses = (status) =>
    status === "Completed"
      ? "text-green-700 bg-green-50"
      : status === "In Progress"
      ? "text-yellow-700 bg-yellow-50"
      : "text-gray-600 bg-gray-50";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Enrolled Courses</h1>
            <p className="text-sm text-gray-500">
              Track and manage your ongoing courses.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-80">
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M21 21l-4.35-4.35"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="11"
                cy="11"
                r="6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, topics, or skills..."
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        {/* Layout: main + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main (filters + courses) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <div className="flex gap-3 items-center">
                  <label className="text-sm font-medium text-gray-700 mr-2">
                    Category
                  </label>
                  <select
                    className="rounded-lg border px-3 py-2 text-sm"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 items-center">
                  <label className="text-sm font-medium text-gray-700 mr-2">
                    Difficulty
                  </label>
                  <select
                    className="rounded-lg border px-3 py-2 text-sm"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    {levels.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 items-center">
                  <label className="text-sm font-medium text-gray-700 mr-2">
                    Status
                  </label>
                  <select
                    className="rounded-lg border px-3 py-2 text-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ml-auto">
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("All Categories");
                      setLevel("All Levels");
                      setStatusFilter("All");
                    }}
                    className="text-sm text-indigo-600 underline"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Courses grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {filteredCourses.length === 0 ? (
                <div className="col-span-full bg-white border border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-500">
                  No courses match your filters.
                </div>
              ) : (
                filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {course.title}
                        </h3>
                        <div className="mt-1 text-xs text-gray-500">
                          {course.category} • {course.level}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses(
                            course.status
                          )}`}
                        >
                          {course.status}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      {/* progress bar */}
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-indigo-500 transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                        <div>{course.progress}%</div>
                        <div>Due: {course.due}</div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700">
                        Continue
                      </button>
                      <button className="px-3 py-1.5 rounded-lg border text-sm">
                        View Details
                      </button>
                      {course.certificateIssued && (
                        <button
                          title="Download certificate"
                          className="ml-auto px-2 py-1.5 rounded-lg border text-sm flex items-center gap-2"
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M12 3v12"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 11l4 4 4-4"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 21H3"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="hidden sm:inline">Download</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar: Progress + Certificates */}
          <aside className="space-y-4">
            {/* Progress card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h4 className="text-sm font-semibold mb-2">Your Progress</h4>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {overallProgress}%
                  </div>
                  <div className="text-xs text-gray-500">
                    Overall Completion
                  </div>
                </div>
                <div className="text-sm text-gray-600 text-right">
                  <div className="font-medium">{completedCount}</div>
                  <div className="text-xs text-gray-400">Completed</div>
                  <div className="mt-2 font-medium">{totalCourses}</div>
                  <div className="text-xs text-gray-400">Total Courses</div>
                </div>
              </div>

              {/* overall progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-orange-500 transition-all"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            {/* Certificates card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Certificates</h4>
                <span className="text-xs text-gray-400">Issued</span>
              </div>

              <ul className="mt-3 space-y-3">
                {courses
                  .filter((c) => c.certificateIssued)
                  .map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-green-50"
                    >
                      <div>
                        <div className="text-sm font-medium">{c.title}</div>
                        <div className="text-xs text-gray-500">Issued</div>
                      </div>
                      <button className="px-2 py-1 rounded-md text-sm border flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <polyline
                            points="7 10 12 15 17 10"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <line
                            x1="12"
                            y1="15"
                            x2="12"
                            y2="3"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Download
                      </button>
                    </li>
                  ))}
                {courses.filter((c) => c.certificateIssued).length === 0 && (
                  <li className="text-xs text-gray-500">No certificates yet</li>
                )}
              </ul>
            </div>

            {/* Quick stats or quick actions (optional) */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-sm text-gray-600">
              <div className="font-medium mb-2">Quick Actions</div>
              <button className="w-full text-left px-3 py-2 rounded-lg border mb-2">
                Report an issue
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg border">
                Download progress report
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
