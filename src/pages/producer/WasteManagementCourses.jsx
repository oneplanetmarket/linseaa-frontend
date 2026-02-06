import React from "react";

const wasteCourses = [
  { title: "Introduction to Dry Waste Management", category: "Waste Management", instructor: "Prof. S. Kumar", institute: "IIT Delhi" },
  { title: "Introduction to Wet Waste Management", category: "Waste Management", instructor: "Prof. R. Mehta", institute: "IIT Bombay" },
  { title: "Composting Fundamentals", category: "Waste Management", instructor: "Prof. A. Sharma", institute: "IIT Kanpur" },
  { title: "Hazardous Waste Disposal", category: "Waste Management", instructor: "Prof. P. Gupta", institute: "IIT Madras" },
  { title: "Plastic Recycling Techniques", category: "Waste Management", instructor: "Prof. V. Singh", institute: "IIT Roorkee" },
  { title: "E-Waste Processing & Recycling", category: "Waste Management", instructor: "Prof. K. Rao", institute: "IIT Kharagpur" },
  { title: "Biomedical Waste Handling", category: "Waste Management", instructor: "Prof. S. Roy", institute: "AIIMS Delhi" },
  { title: "Municipal Solid Waste Management", category: "Waste Management", instructor: "Prof. M. Patel", institute: "NIT Trichy" },
  { title: "Industrial Wastewater Treatment", category: "Waste Management", instructor: "Prof. A. Banerjee", institute: "IIT Guwahati" },
  { title: "Zero Waste Cities", category: "Waste Management", instructor: "Prof. L. Thomas", institute: "IISc Bangalore" },
  // 👉 continue adding till 42 topics
];

const WasteManagementCourses = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Search + Filters */}
      <div className="flex flex-wrap gap-4 mb-8 bg-blue-50 p-4 rounded-lg shadow-sm">
        <input
          type="text"
          placeholder="Search for courses"
          className="border rounded-md p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Search by instructor"
          className="border rounded-md p-2 flex-1"
        />
        <select className="border rounded-md p-2">
          <option>Select Disciplines</option>
          <option>Waste Management</option>
          <option>Recycling</option>
          <option>Environmental Engineering</option>
        </select>
        <select className="border rounded-md p-2">
          <option>Select Institutes</option>
          <option>IIT Delhi</option>
          <option>IIT Bombay</option>
          <option>IIT Madras</option>
          <option>IISc Bangalore</option>
        </select>
        <select className="border rounded-md p-2">
          <option>Select Course Type</option>
          <option>Video</option>
          <option>PDF</option>
          <option>Interactive</option>
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {wasteCourses.map((course, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              {course.title}
            </h2>
            <p className="text-gray-600 mb-1">{course.category}</p>
            <p className="text-sm text-gray-500">
              {course.instructor}, {course.institute}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WasteManagementCourses;
