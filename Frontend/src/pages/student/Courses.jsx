import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { CloudRain } from "lucide-react";
 
const Courses = () => {
  const {data, isLoading, isError} = useGetPublishedCourseQuery();
 


  if(isError) return <h1>Some error occurred while fetching courses.
   <br></br> plz login to see the courses ....</h1>

// this component only show the courses which are published by the creator
  // this component is used to show the courses in the home page
  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto p-6">
        <h3 className="text-3xl text-center mb-10 text-blue-600">Our Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
              Array.from({length:(data?.courses.length)}).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : (
           data?.courses && data?.courses.map((course, index) =><Course key={index} course={course._id}/>))
          }
        </div>
      </div>
    </div>
  );
};

export default Courses;
// CourseSkeleton component to show loading state
// This component is used to show a skeleton loading state for the Course component
const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
