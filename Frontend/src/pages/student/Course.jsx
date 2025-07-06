import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCourseByIdQuery, useGetUserInfoQuery } from "@/features/api/courseApi";
import React, { use, useEffect } from "react";
import { Link } from "react-router-dom";

const Course = ({course}) => {
// console.log("setpayment in course => ",setpayment);

  const {data} = useGetCourseByIdQuery(course)
  let userId = data?.course.creator;
//  console.log("userId => ", data);
// useEffect(() => {
//   if (data?.course.coursePrice) {
//     setpayment((prev) => prev + data?.course.coursePrice);
//   }
// }, [data?.course.coursePrice]);

const {data:user,isLoading}=useGetUserInfoQuery(userId)
  
  // this component is used to show the course in the home page
  // this component is used to show the course in the course detail page
  return (
    <Link to={`/course-detail/${course}`}>
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 border-neutral-600 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src={data?.course.courseThumbnail}
          alt="course"
          className="w-full h-36 object-fill rounded-t-lg hover:opacity-90 transition-opacity duration-300"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate hover:text-blue-600">
          {data?.course.courseTitle}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.user.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">{user?.user.name}</h1>
          </div>
          <Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full hover:bg-blue-800'}>
            {data?.course.courseLevel}
          </Badge>
        </div>
        <div className="text-lg font-bold">
            <span>₹{data?.course.coursePrice}</span>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};

export default Course;