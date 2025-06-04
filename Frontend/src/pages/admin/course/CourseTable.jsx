// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// // import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
// import { Edit, Edit2 } from "lucide-react";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ];

// const CourseTable = () => {
// //     const {data, isLoading} = useGetCreatorCourseQuery();
//   const navigate = useNavigate();

// //   if(isLoading) return <h1>Loading...</h1>

//   return (
//     <div className="mt-5">
//       <Button onClick={() => navigate(`create`)}>Create a new course</Button>
//       <Table>
//         <TableCaption>A list of your recent courses.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Price</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {invoices.map((course) => (
//             <TableRow>
//               <TableCell className="font-medium">{course?.invoice || "NA"}</TableCell>
//               <TableCell> <Badge>{course.paymentStatus}</Badge> </TableCell>
//               <TableCell>{course.totalAmount}</TableCell>
//               <TableCell className="text-right">
//                  <Button size='sm' variant='ghost' onClick={() => navigate(`s`)}><Edit2/>Edit</Button>
//               </TableCell>
//             </TableRow>
//           ))
//           }
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default CourseTable;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ];

const CourseTable = () => {
  const { data, isLoading, refetch } = useGetCreatorCourseQuery();
  // console.log("dataa",data);
  useEffect(() => {
    refetch();
  }, []);
  const navigate = useNavigate();
  //!  data is contain the all information about the courses
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Button onClick={() => navigate(`create`)}>Create a new course</Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Enrolled students</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course?.coursePrice ? `₹${course.coursePrice}` : "NA"}
              </TableCell>
              <TableCell>{course.courseTitle}</TableCell>
              <TableCell>
                <Badge
                  className={`rounded-full text-sm font-medium w-20 text-center flex justify-center items-center  ${
                    course.isPublished
                      ? "hover:bg-green-600 bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                {course?.enrolledStudents.length!==0 ? course?.enrolledStudents.length:""}
              </TableCell>


              <TableCell className="text-right">
                <Button
                  className=" text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`${course._id}`)}
                >
                  <Edit />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
{
  /* <div className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"  onClick={goToUpdateLecture}>
      <Edit
       
        size={17}
       
      />
      Edit
      </div> */
}
