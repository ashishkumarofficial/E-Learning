// // HeroSection.jsx
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Courses from "./Courses";
// import { useLoadUserQuery } from "@/features/api/authApi";
// import cartoons from "@/assets/cartoons.png";

// const HeroSection = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const { data: islogin } = useLoadUserQuery();

//   const searchHandler = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== "") {
//       navigate(`/course/search?query=${searchQuery}`);
//     }
//     setSearchQuery("");
//   };

//   return (
//     <div className="mt-16">
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-20 py-20 bg-gradient-to-tr from-blue-500 to-indigo-700 dark:from-gray-900 dark:to-gray-800">
//         {/* Left content */}
//         <div className="text-white space-y-6">
//           <h1 className="text-5xl font-extrabold leading-tight">
//             Your Next <span className="text-yellow-300">Skill</span> Starts Here
//           </h1>
//           <p className="text-lg text-blue-100 dark:text-gray-300">
//             Learn at your own pace from industry experts. Get certified and
//             advance your career today.
//           </p>

//           <form
//             onSubmit={searchHandler}
//             className="flex bg-white dark:bg-gray-900 rounded-full shadow-lg overflow-hidden max-w-lg"
//           >
//             <Input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search for courses..."
//               className="flex-grow px-6 py-3 text-gray-900 dark:text-white bg-transparent border-none focus-visible:ring-0"
//             />
//             <Button
//               type="submit"
//               className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-r-full"
//             >
//               Search
//             </Button>
//           </form>

//           <Button
//             onClick={() => navigate(`/course/search?query`)}
//             className="bg-white text-blue-600 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 mt-4 px-6 py-3 rounded-full font-medium"
//           >
//             🔍 Explore All Courses
//           </Button>
//         </div>

//         {/* Right image or illustration */}
//         <div className="relative z-10">
//           <img
//             src={cartoons}
//             alt="Online Learning"
//             className="w-full max-w-xl mx-auto md:max-w-2xl lg:max-w-3xl"
//           />
//         </div>
//       </section>

//       <Courses />
//     </div>
//   );
// };

// export default HeroSection;


// HeroSection.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useLoadUserQuery } from "@/features/api/authApi";
import cartoons from "@/assets/cartoons.png";
import Courses from "./Courses";
import "@/assets/animations.css"; // import custom animation styles
import { resources } from "./MyLearning";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: islogin } = useLoadUserQuery();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="mt-10">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-20 py-20 bg-gradient-to-tr from-green-600 to-indigo-700 dark:from-green-800 dark:to-pink-700">
        {/* Left Content */}
        <div className="text-white space-y-6 animate-slide-in-left">
          <h1 className="text-5xl font-extrabold leading-tight animate-fade-in-down">
            Your Next <span className="text-yellow-300">Skill</span> Starts Here
          </h1>

          <p className="text-lg text-blue-100 dark:text-gray-300 animate-fade-in">
            Learn at your own pace from industry experts. Get certified and
            advance your career today.
          </p>

          <form
            onSubmit={searchHandler}
            className="flex bg-white dark:bg-gray-900 rounded-full shadow-lg overflow-hidden max-w-lg animate-fade-in-up"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for courses..."
              className="flex-grow px-6 py-3 text-gray-900 dark:text-white bg-transparent border-none focus-visible:ring-0"
            />
            <Button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-r-full"
            >
              Search
            </Button>
          </form>

          <Button
            onClick={() => navigate(`/course/search?query`)}
            className="bg-white text-blue-600 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 mt-4 px-6 py-3 rounded-full font-medium hover:animate-pulse transition"
          >
            🔍 Explore All Courses
          </Button>
        </div>

        {/* Right Image */}
        <div className="relative z-10 animate-zoom-in">
          <img
            src={cartoons}
            alt="Online Learning"
            className="w-full max-w-xl mx-auto md:max-w-2xl lg:max-w-3xl rounded-lg transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      </section>

      {/* Courses Section */}
      <Courses />
         <div className="m-10 ">
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
    </div>
    
  );
};

export default HeroSection;
