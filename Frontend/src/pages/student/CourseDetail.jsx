import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLoadUserQuery } from "@/features/api/authApi";
import basedUrl from "@/features/api/basedUrl";
import {
  useGetCourseDetailsQuery,
  useGetPublishedCourseQuery,
  useGetUserInfoQuery,
} from "@/features/api/courseApi";

import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseDetail = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [result, setResult] = useState(null);
  const [refresh,setrefresh]=useState(false);
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetCourseDetailsQuery(courseId);
  
  const { data: users } = useGetPublishedCourseQuery();
 
  const { data: islogin, refetch } = useLoadUserQuery();

  let BasedUrl = basedUrl();
  // console.log("BasedUrl in coursedetails",BasedUrl)

  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        const response = await fetch(
          `${BasedUrl}/api/v1/course/getuser`,
          {
            method: "POST", // ✅ change to POST
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ courseId: courseId }), // assuming you want to send courseId
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch lecture info");
        }

        const result = await response.json();
        
        setResult(result);
        const url = result?.courseId.lectures[0].videoUrl;

        setVideoUrl(url);
        setVideoTitle(result?.courseId.lectures[0].lectureTitle);

       
      } catch (error) {
        console.error("Error fetching lecture data:", error);
      }
    };

    if (data?.course) {
      fetchLectureData();
    }
  }, [data]);


  const handlevideoplay = (idx, result) => {
  
    const vedioUrl = result?.courseId.lectures[idx].videoUrl;
    setVideoUrl(vedioUrl);
    setVideoTitle(result?.courseId.lectures[idx].lectureTitle);
   
  };

  let purchased = false;
  if (
    islogin?.user.enrolledCourses.find((course) => course.courseId === courseId)){
    purchased = true;
  }

  useEffect(() => {
    refetch();
  }, [islogin,refresh]);

  return (
    <div className="my-20">
      <div className="space-y-5">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 text-white rounded-xl shadow-md m-7">
          <div className="max-w-7xl mx-auto py-5 px-4 md:px-8 flex flex-col gap-2">
            <h1 className="font-bold text-2xl md:text-3xl">
              {data?.course.category}
            </h1>
            <p className="text-base md:text-lg">{data?.course.courseTitle}</p>
            <p>
              Created By{" "}
              <span className="text-black underline italic">
                {users?.courses.find(
                  (course) => course.creator._id === data?.course.creator
                )?.creator.name || "NA"}
              </span>
            </p>
            <div className="flex items-center gap-2 text-sm">
              <BadgeInfo size={16} />
              <p>Last updated {data?.course.createdAt.split("T")[0]}</p>
            </div>
            <p>Students enrolled: {data?.course.enrolledStudents.length}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
          <div className="w-full lg:w-1/2 space-y-5">
            <h1 className="font-bold text-xl md:text-2xl">Description</h1>
            <p
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: data?.course.description }}
            />
            <Card className="dark:border-gray-600">
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>
                  {data?.course.lectures.length} lectures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 ">
                {purchased
                  ? result?.courseId.lectures.map((lecture, idx) => {
                      const isPreview = lecture?.isPreviewFree;

                      return (
                        <div
                          key={idx}
                          onClick={() => handlevideoplay(idx, result)}
                          className={`flex items-center gap-3 text-sm cursor-pointer `}
                        >
                          <span>
                            <PlayCircle size={14} />
                          </span>
                          <p>{lecture?.lectureTitle}</p>
                        </div>
                      );
                    })
                  : result?.courseId.lectures.map((lecture, idx) => {
                      const isPreview = lecture?.isPreviewFree;

                      return (
                        <div
                          key={idx}
                          onClick={
                            isPreview
                              ? () => handlevideoplay(idx, result)
                              : undefined
                          }
                          className={`flex items-center gap-3 text-sm ${
                            isPreview
                              ? "cursor-pointer"
                              : "cursor-not-allowed text-gray-400"
                          }`}
                        >
                          <span>
                            {isPreview ? (
                              <PlayCircle size={14} />
                            ) : (
                              <Lock size={14} />
                            )}
                          </span>
                          <p>{lecture?.lectureTitle}</p>
                        </div>
                      );
                    })}
              </CardContent>
            </Card>
          </div>
          <div className="w-full lg:w-1/3">
            <Card className="dark:border-gray-600">
              <CardContent className="p-4 flex flex-col">
                <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
                  <ReactPlayer
                    width="100%"
                    height={"100%"}
                    url={videoUrl}
                    playing={true}
                    controls={true}
                    light={data?.course.courseThumbnail}
                  />
                </div>
                <h1> {videoTitle.toUpperCase()}</h1>
                <Separator className="my-2" />
                <h1 className="text-lg md:text-xl font-semibold">
                  ₹{data?.course.coursePrice}
                </h1>
              </CardContent>
              <CardFooter className="flex justify-center ">
                {purchased ? (
                  <Link className="w-full" to={`continue`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Continue Course</Button>
                  </Link>
                ) : (
                  <BuyCourseButton
                    courseId={courseId}
                    price={data?.course.coursePrice}
                    refresh={setrefresh}
                  />
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
