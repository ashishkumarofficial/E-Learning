import BuyCourseButton from "@/components/BuyCourseButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useLoadUserQuery } from "@/features/api/authApi";
import basedUrl from "@/features/api/basedUrl";
import {
  useGetCourseDetailsQuery,
  useGetPublishedCourseQuery,
} from "@/features/api/courseApi";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { BadgeInfo, CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Continue = () => {
  const [result, setResult] = useState(null);
  let BasedUrl = basedUrl();
  // console.log("BasedUrl in continue page",BasedUrl)
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const { data: users, refetch: refetchdata } = useGetPublishedCourseQuery();
  
  const {
    data: courseDetail,
    isLoading: courseDetailsLoading,
    isError: courseDetailsError,
  } = useGetCourseDetailsQuery(courseId);
  const { data: islogin, refetch: refreshed } = useLoadUserQuery();

  useEffect(() => {
    refetchdata();
  }, [courseId]);
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

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
      } catch (error) {
        console.error("Error fetching lecture data:", error);
      }
    };

    if (courseDetail?.course) {
      fetchLectureData();
    }
  }, [courseDetail]);

  let purchased = false;
  if (
    islogin?.user.enrolledCourses.find((course) => course.courseId === courseId)
  ) {
    purchased = true;
  }

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  // initialze the first lecture is not exist
  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };
  // Handle select a specific lecture to watch
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  if (islogin?.user.role === "student" && !purchased) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Please buy this course to continue
          </h2>
          <p className="text-gray-700 mb-6">
            You are not authorized to access this Course.
          </p>
          <p className="text-sm text-gray-500">
            This area is restricted to unauthorized user. Please buy this course
            to access it buy first to continue learning.
          </p>
          <div className="flex items-center justify-center mt-4 gap-2">
            <Button className="w-full" onClick={() => navigate(-1)}>
              Back
            </Button>
            <BuyCourseButton
              className="w-full"
              courseId={courseId}
              price={data?.data.courseDetails.coursePrice}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 my-10">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl shadow-md my-2.5">
        <div className="max-w-7xl mx-auto py-5 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {data?.data.courseDetails.category}
          </h1>
          <p className="text-base md:text-lg">
            {data?.data.courseDetails.courseTitle}
          </p>
          <p>
            Created By{" "}
            <span className="text-black underline italic">
              {users?.courses.find(
                (course) =>
                  course.creator._id === data?.data.courseDetails.creator
              )?.creator.name || "NA"}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>
              Last updated {data?.data.courseDetails.createdAt.split("T")[0]}
            </p>
          </div>
          <p>
            Students enrolled:{" "}
            {data?.data.courseDetails.enrolledStudents.length}
          </p>
        </div>
      </div>

      {/* Display course name  */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        {/* Video section  */}
        <div className="flex-1 rounded-lg shadow-lg p-4">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video  rounded-lg overflow-hidden cursor-pointer">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  url={currentLecture?.videoUrl || initialLecture.videoUrl}
                  playing={true}
                  controls={true}
                  onPlay={() =>
                    handleLectureProgress(
                      currentLecture?._id || initialLecture._id
                    )
                  }
                />
              </div>
              {/* <h1> {videoTitle.toUpperCase()}</h1> */}
              <Separator className="my-2" />
              {/* <h1 className="text-lg md:text-xl font-semibold">₹{data?.course.coursePrice}</h1> */}
            </CardContent>
          </Card>

          {/* Display current watching lecture title */}
          <div className="mt-2 ">
            <h3 className="font-medium text-lg">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              } : ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>
          </div>
        </div>
        {/* Lecture Sidebar  */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200 dark:dark:bg-gray-800"
                    : ""
                } `}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Continue;
