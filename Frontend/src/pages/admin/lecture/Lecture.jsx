import { Button } from "@/components/ui/button";
import { useLoadUserQuery } from "@/features/api/authApi";
import { Edit } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };

 

  return (
    <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-gray-900 px-4 py-2 rounded-md my-2">
      <h1 className="font-bold text-gray-800 dark:text-gray-100">
        Lecture - {index+1}: {lecture.lectureTitle}
      </h1>
       <div className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"  onClick={goToUpdateLecture}>
      <Edit
       
        size={17}
       
      />
      Edit
      </div>
    </div>
  );
};

export default Lecture;