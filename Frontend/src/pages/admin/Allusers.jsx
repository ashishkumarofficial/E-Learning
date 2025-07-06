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
import { useGetAllUsersQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import React, { useEffect} from "react";
import { useNavigate,} from "react-router-dom";
import { Loading } from "./Dashboard";

function Allusers() {
  const { data, isLoading,refetch } = useGetAllUsersQuery();

  const navigate = useNavigate();
  useEffect(() => {
    refetch()
  }, []);
  // console.log("data for all user", data);
 if (isLoading)
   return (
    <Loading/>
   );
  return (
    <div className="flex-1 dark:bg-gray-900 dark:border-gray-600 rounded-md">
      <Table className="w-full mt-5">
          <TableCaption>A list of All users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Enrolled Courses</TableHead>
            <TableHead>Action</TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
         {data?.users.map((user) => (
            <TableRow key={user._id} className="dark:bg-gray-900 dark:border-gray-600">
              <TableCell className="font-medium">
                <img src={user?.photoUrl ? user.photoUrl : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"} alt="" className="w-10 h-10 rounded-full" />
              </TableCell>
              <TableCell>{user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : ''}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>  <Badge
                  className={`rounded-full text-sm font-medium w-32 text-center flex justify-center items-center dark:text-white ${
                   user?.role==="instructor" ? 'hover:bg-green-600 bg-green-500' : 'bg-gray-800'
                  }`}
                >
                  {user.role==="instructor"?"Admin":"Student"}
                </Badge>
              
                 </TableCell>
                 <TableCell className="text-center">{user?.enrolledCourses.length!==0?user?.enrolledCourses.length:""}</TableCell>
                 <TableCell>
                  {/* <Button size="sm" variant="ghost" onClick={() => navigate(`edit/${user._id}`)}><Edit size={20}/>Edit</Button> */}
                  <div className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" onClick={() => navigate(`edit/${user._id}`)}>
                        <Edit
                         
                          size={17}
                         
                        />
                        Edit
                        </div>
                 </TableCell>
                 
                
            </TableRow>
          ))}
          
          
        </TableBody>
       
      </Table>
      
     
    </div>
  );
}

export default Allusers;
