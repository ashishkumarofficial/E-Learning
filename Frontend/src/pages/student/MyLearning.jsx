// import React from "react";
// import Course from "./Course";
// import { useLoadUserQuery } from "@/features/api/authApi";

// const MyLearning = () => {
//   const { data, isLoading } = useLoadUserQuery();

//   const enrolledCourses = data?.user?.enrolledCourses || [];

//   return (
//     <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">
//       <div className="mb-8 text-center">
//         <h1 className="text-3xl font-bold tracking-tight">🎓 My Learning</h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-2">
//           Continue your journey and explore the courses you've enrolled in.
//         </p>
//       </div>

//       {isLoading ? (
//         <MyLearningSkeleton />
//       ) : enrolledCourses.length === 0 ? (
//         <div className="text-center text-gray-500 dark:text-gray-400">
//           <p className="text-lg">You haven't enrolled in any course yet.</p>
//           <p className="mt-1">Explore our courses and start learning today!</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {enrolledCourses.map((courseItem) => (
//             <Course key={courseItem._id} course={courseItem.courseId} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyLearning;

// const MyLearningSkeleton = () => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//     {[...Array(6)].map((_, index) => (
//       <div
//         key={index}
//         className="bg-gray-300 dark:bg-gray-700 rounded-xl h-48 animate-pulse shadow-md"
//       ></div>
//     ))}
//   </div>
// );
import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";
import { BookOpen, Video, Globe } from "lucide-react";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const enrolledCourses = data?.user?.enrolledCourses || [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-10 mt-10">
      {/* Page Header */}
      <section className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">
          📚 My Learning Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          All your enrolled courses and learning tools in one place.
        </p>
      </section>

      {/* Enrolled Courses */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Enrolled Courses</h2>
        {isLoading ? (
          <SkeletonGrid />
        ) : enrolledCourses.length === 0 ? (
          <div className="text-center text-gray-500 mt-6">
            <p className="text-lg">You haven’t enrolled in any course yet.</p>
            <p>Visit our course catalog to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {enrolledCourses.map((courseItem) => (
              <Course key={courseItem._id} course={courseItem.courseId} />
            ))}
          </div>
        )}
      </section>

      {/* Resource Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📦 Extra Learning Resources</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {resources.map((res, index) => (
            <a
              key={index}
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-2 text-indigo-600 dark:text-indigo-400">
                <res.icon className="w-5 h-5" />
                <h3 className="font-semibold text-lg">{res.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {res.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyLearning;

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"
      />
    ))}
  </div>
);

// 📘 Extra Resource Links
export const resources = [
  {
    title: "freeCodeCamp",
    description: "Learn coding through interactive tutorials & projects.",
    link: "https://www.freecodecamp.org/",
    icon: BookOpen,
  },
  {
    title: "MDN Web Docs",
    description: "Comprehensive documentation on HTML, CSS & JS.",
    link: "https://developer.mozilla.org/",
    icon: Globe,
  },
  {
    title: "JavaScript.info",
    description: "Deep dive into modern JavaScript concepts.",
    link: "https://javascript.info/",
    icon: BookOpen,
  },
  {
    title: "CSS Tricks",
    description: "Tips, tricks, and guides for mastering CSS.",
    link: "https://css-tricks.com/",
    icon: BookOpen,
  },
  {
    title: "YouTube - Thapa Technical",
    description: "Top-quality video tutorials on web development.",
    link: "https://www.youtube.com/@ThapaTechnical",
    icon: Video,
  },
  {
    title: "Frontend Mentor",
    description: "Practice real-world frontend projects.",
    link: "https://www.frontendmentor.io/",
    icon: Globe,
  },
  {
    title: "W3Schools",
    description: "Learn web development with interactive examples.",
    link: "https://www.w3schools.com/",
    icon: BookOpen,
  },
  {
    title: "hackerRank",
    description: "Improve your coding skills with challenges.",
    link: "https://www.hackerrank.com/",
    icon: Globe,
  },
];
