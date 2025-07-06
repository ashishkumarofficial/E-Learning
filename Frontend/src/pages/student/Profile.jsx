// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Loader2 } from "lucide-react";
// // import React, { useEffect, useState } from "react";
// // import Course from "./Course";
// // import {
// //   useLoadUserQuery,
// //   useUpdateUserMutation,
// // } from "@/features/api/authApi";
// // import { toast } from "sonner";
// // import { Link } from "react-router-dom";
// // import LoginedOrNot from "@/LoginedOrNot";
// // import { useGetCourseByIdQuery } from "@/features/api/courseApi";

// // const Profile = () => {
// //   const [name, setName] = useState("");
// //   const [totalpayment,setpayment] = useState(0);

// //   const [profilePhoto, setProfilePhoto] = useState("");

// //   const { data, isLoading, refetch } = useLoadUserQuery();
// //   const [
// //     updateUser,
// //     {
// //       data: updateUserData,
// //       isLoading: updateUserIsLoading,
// //       isError,
// //       error,
// //       isSuccess,
// //     },
// //   ] = useUpdateUserMutation();

// //   const onChangeHandler = (e) => {
// //     const file = e.target.files?.[0];
// //     if (file) setProfilePhoto(file);
// //   };

// //   useEffect(() => {
// //     console.log("rendering profile");
   
// //     refetch();
// //   }, []);
  
 
  

// //   useEffect(() => {
// //     if (isSuccess) {
// //       refetch();
// //       toast.success(data.message || "Profile updated.");
// //     }
// //     if (isError) {
// //       toast.error(error.message || "Failed to update profile");
// //     }
// //   }, [error, updateUserData, isSuccess, isError]);

// //   if (isLoading) return <h1>Profile Loading...</h1>;

// //   // when the user is not login and access the profile details
// //   const user = data?.user;

// //   const updateUserHandler = async () => {
// //     const finalName = name.trim() === "" ? user.name : name;

// //     const formData = new FormData();
// //     formData.append("name", finalName);
// //     formData.append("profilePhoto", profilePhoto);

// //     await updateUser(formData);
// //   };



// //   if (!user) {
// //     return <LoginedOrNot />;
// //   }
// //   console.log("total payment => ", totalpayment);
// //   return (
// //     <div className="max-w-4xl mx-auto px-4 my-24">
// //       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
// //       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
// //         <div className="flex flex-col items-center">
// //           <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
// //             <AvatarImage
// //               src={user?.photoUrl || "https://github.com/shadcn.png"}
// //               alt="@shadcn"
// //             />
// //             <AvatarFallback>CN</AvatarFallback>
// //           </Avatar>
// //         </div>
// //         <div>
// //           <div className="mb-2">
// //             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
// //               Name:
// //               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
// //                 {user.name}
// //               </span>
// //             </h1>
// //           </div>
// //           <div className="mb-2">
// //             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
// //               Email:
// //               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
// //                 {user.email}
// //               </span>
// //             </h1>
// //           </div>
// //           <div className="mb-2">
// //             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
// //               Role:
// //               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
// //                 {user.role.toUpperCase()}
// //               </span>
// //             </h1>
// //           </div>
// //           <div className="mb-2">
// //             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
// //               Total payment:
// //               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
// //                 ₹{totalpayment}{" "}
// //               </span>
// //               {
// //                 user.enrolledCourses.length > 0 ? (
                
// //                  user?.enrolledCourses.map((element) => (
// //                      <TotalPayment key={element._id} setpayment={setpayment} course={element} />
// //                   ))
                    
// //                 ) : (
// //                   <span className="text-red-500">No payment made yet</span>
// //                 )
// //               }
              
// //             </h1>
// //           </div>
// //           <Dialog>
// //             <DialogTrigger asChild>
// //               <Button size="sm" className="mt-2">
// //                 Edit Profile
// //               </Button>
// //             </DialogTrigger>
// //             <DialogContent>
// //               <DialogHeader>
// //                 <DialogTitle>Edit Profile</DialogTitle>
// //                 <DialogDescription>
// //                   Make changes to your profile here. Click save when you're
// //                   done.
// //                 </DialogDescription>
// //               </DialogHeader>
// //               <div className="grid gap-4 py-4">
// //                 <div className="grid grid-cols-4 items-center gap-4">
// //                   <Label>Name</Label>
// //                   <Input
// //                     type="text"
// //                     value={name}
// //                     onChange={(e) => setName(e.target.value)}
// //                     placeholder="Name"
// //                     required={true}
// //                     className="col-span-3"
// //                   />
// //                 </div>
// //                 <div className="grid grid-cols-4 items-center gap-4">
// //                   <Label>Profile Photo</Label>
// //                   <Input
// //                     onChange={onChangeHandler}
// //                     type="file"
// //                     accept="image/*"
// //                     className="col-span-3"
// //                   />
// //                 </div>
// //               </div>
// //               <DialogFooter>
// //                 <Button
// //                   disabled={updateUserIsLoading}
// //                   onClick={updateUserHandler}
// //                 >
// //                   {updateUserIsLoading ? (
// //                     <>
// //                       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
// //                       wait
// //                     </>
// //                   ) : (
// //                     "Save Changes"
// //                   )}
// //                 </Button>
// //               </DialogFooter>
// //             </DialogContent>
// //           </Dialog>
// //         </div>
// //       </div>
// //       <div>
// //         <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
// //           {user.enrolledCourses.length === 0 ? (
// //             <h1>You haven't enrolled yet</h1>
// //           ) : (
             
             
// //             user.enrolledCourses.map((course) => (
// //               <Course course={course.courseId} key={course._id} />
// //             ))
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;



// // export const TotalPayment = ({setpayment,course}) => {
// //     const {data} = useGetCourseByIdQuery(course.courseId);
// // console.log("data in total payment => ", data); 
// //   useEffect(() => {
// //      // reset total on page load

// //     if (data?.course.coursePrice) {
// //       setpayment((prev) => prev + data?.course.coursePrice);
// //     }
// //   }, [data?.course.coursePrice, setpayment]);  
// // }

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2, Mail, MessageCircle, MessageCircleCode, MessageCircleDashed } from "lucide-react";
// import React, { useEffect, useRef, useState } from "react";
// import Course from "./Course";
// import {
//   useLoadUserQuery,
//   useUpdateUserMutation,
// } from "@/features/api/authApi";
// import { toast } from "sonner";
// import { Link } from "react-router-dom";
// import LoginedOrNot from "@/LoginedOrNot";
// import { useGetCourseByIdQuery } from "@/features/api/courseApi";
// const Profile = () => {
//   const [name, setName] = useState("");
//   const [totalpayment, setpayment] = useState(0);
//   const userIdRef = useRef(null);
//   const hasReset = useRef(false);

//   const [profilePhoto, setProfilePhoto] = useState("");

//   const { data, isLoading, refetch } = useLoadUserQuery();
//   const [
//     updateUser,
//     {
//       data: updateUserData,
//       isLoading: updateUserIsLoading,
//       isError,
//       error,
//       isSuccess,
//     },
//   ] = useUpdateUserMutation();

//   const onChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setProfilePhoto(file);
//   };

//   useEffect(() => {
//     refetch();
//   }, []);

//   useEffect(() => {
//     if (isSuccess) {
//       refetch();
//       toast.success(data.message || "Profile updated.");
//     }
//     if (isError) {
//       toast.error(error.message || "Failed to update profile");
//     }
//   }, [error, updateUserData, isSuccess, isError]);

//   if (isLoading) return <h1>Profile Loading...</h1>;

//   const user = data?.user;

//   const updateUserHandler = async () => {
//     const finalName = name.trim() === "" ? user.name : name;

//     const formData = new FormData();
//     formData.append("name", finalName);
//     formData.append("profilePhoto", profilePhoto);

//     await updateUser(formData);
//   };

//   // Reset totalpayment when new user logs in
//   useEffect(() => {
//     if (user && user._id !== userIdRef.current) {
//       setpayment(0);
//       userIdRef.current = user._id;
//       hasReset.current = false;
//     }
//   }, [user]);

//   if (!user) {
//     return <LoginedOrNot />;
//   }
// console.log("user", user);
//   return (
//     <div className="max-w-4xl mx-auto px-4 my-24">
//       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
//             <AvatarImage
//               src={user?.photoUrl || "https://github.com/shadcn.png"}
//               alt="@shadcn"
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//         <div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Name:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.name}
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Email:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.email}
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Role:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.role!=="student" ?"Admin" : "Student"}
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Total payment:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 ₹{totalpayment}
//               </span>
//               {user.enrolledCourses.length > 0 &&
//                 user.enrolledCourses.map((element) => (
//                   <TotalPayment
//                     key={element._id}
//                     setpayment={setpayment}
//                     course={element}
//                   />
//                 ))}
//             </h1>
//           </div>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-2">
//                 Edit Profile
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your profile here. Click save when you're
//                   done.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                     required={true}
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Profile Photo</Label>
//                   <Input
//                     onChange={onChangeHandler}
//                     type="file"
//                     accept="image/*"
//                     className="col-span-3"
//                   />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button
//                   disabled={updateUserIsLoading}
//                   onClick={updateUserHandler}
//                 >
//                   {updateUserIsLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
//                       wait
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div> 
//         <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg p-4">
//           <div>
//             <span className="flex gap-2"><MessageCircle size={20}/>Community Messages   </span>
//             <div className="mt-2 flex flex-col">
//            {user?.message.length>0?(
            
//             user?.message.map((message,index)=><>
//             <Link
//                 to="/message"
//                 className="text-blue-600 hover:underline"
//               >
//                 {(index+1)+". "+message.recipient
// }
//               </Link>
//             </>)
            
//            ):("")}
//           </div>
//           </div>
//           <div className="ml-4 border-l border-gray-300 dark:border-gray-700 pl-4">
//             <span className="flex gap-2"><Mail size={20}/>Invitation Emails </span>
//             <div className="mt-2">
//               <Link
//                 to="/message"
//                 className="text-blue-600 hover:underline"
//               >
//                 Click here to send message
//               </Link>
//           </div>
//           </div>
          
//         </div>
//       </div>
     
//       <div>
//         <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
//           {user.enrolledCourses.length === 0 ? (
//             <h1>You haven't enrolled yet</h1>
//           ) : (
//             user.enrolledCourses.map((course) => (
//               <Course course={course.courseId} key={course._id} />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Profile;
// export const TotalPayment = ({ setpayment, course }) => {
//   const { data } = useGetCourseByIdQuery(course.courseId);

//   useEffect(() => {
//     if (data?.course?.coursePrice) {
//       setpayment((prev) => prev + data.course.coursePrice);
//     }
//   }, [data?.course?.coursePrice, setpayment]);

//   return null;
// };


// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2, Mail, MessageCircle } from "lucide-react";
// import React, { useEffect, useRef, useState } from "react";
// import Course from "./Course";
// import {
//   useLoadUserQuery,
//   useUpdateUserMutation,
// } from "@/features/api/authApi";
// import { toast } from "sonner";
// import LoginedOrNot from "@/LoginedOrNot";
// import { useGetCourseByIdQuery } from "@/features/api/courseApi";

// const Profile = () => {
//   const [name, setName] = useState("");
//   const [totalpayment, setpayment] = useState(0);
//   const userIdRef = useRef(null);
//   const [profilePhoto, setProfilePhoto] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState(null);

//   const { data, isLoading, refetch } = useLoadUserQuery();
//   const [
//     updateUser,
//     {
//       data: updateUserData,
//       isLoading: updateUserIsLoading,
//       isError,
//       error,
//       isSuccess,
//     },
//   ] = useUpdateUserMutation();

//   const onChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setProfilePhoto(file);
//   };

//   useEffect(() => {
//     refetch();
//   }, []);

//   useEffect(() => {
//     if (isSuccess) {
//       refetch();
//       toast.success(data.message || "Profile updated.");
//     }
//     if (isError) {
//       toast.error(error.message || "Failed to update profile");
//     }
//   }, [error, updateUserData, isSuccess, isError]);

//   if (isLoading) return <h1>Profile Loading...</h1>;

//   const user = data?.user;

//   const updateUserHandler = async () => {
//     const finalName = name.trim() === "" ? user.name : name;

//     const formData = new FormData();
//     formData.append("name", finalName);
//     formData.append("profilePhoto", profilePhoto);

//     await updateUser(formData);
//   };

//   useEffect(() => {
//     if (user && user._id !== userIdRef.current) {
//       setpayment(0);
//       userIdRef.current = user._id;
//     }
//   }, [user]);

//   if (!user) {
//     return <LoginedOrNot />;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 my-24">
//       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className="h-32 w-32 md:h-32 md:w-32 mb-4">
//             <AvatarImage
//               src={user?.photoUrl || "https://github.com/shadcn.png"}
//               alt="@shadcn"
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//         <div className="flex-1 w-full space-y-2">
//           <h1 className="font-semibold text-gray-900 dark:text-gray-100">
//             Name:{" "}
//             <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//               {user.name}
//             </span>
//           </h1>
//           <h1 className="font-semibold text-gray-900 dark:text-gray-100">
//             Email:{" "}
//             <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//               {user.email}
//             </span>
//           </h1>
//           <h1 className="font-semibold text-gray-900 dark:text-gray-100">
//             Role:{" "}
//             <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//               {user.role !== "student" ? "Admin" : "Student"}
//             </span>
//           </h1>
//           <h1 className="font-semibold text-gray-900 dark:text-gray-100">
//             Total payment:{" "}
//             <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//               ₹{totalpayment}
//             </span>
//             {user.enrolledCourses.length > 0 &&
//               user.enrolledCourses.map((element) => (
//                 <TotalPayment
//                   key={element._id}
//                   setpayment={setpayment}
//                   course={element}
//                 />
//               ))}
//           </h1>

//           <Dialog>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-2">
//                 Edit Profile
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your profile here. Click save when you're
//                   done.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                     required={true}
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Profile Photo</Label>
//                   <Input
//                     onChange={onChangeHandler}
//                     type="file"
//                     accept="image/*"
//                     className="col-span-3"
//                   />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button
//                   disabled={updateUserIsLoading}
//                   onClick={updateUserHandler}
//                 >
//                   {updateUserIsLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Please wait
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       {/* Messages and Emails Section */}
//       <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg p-4 my-4 flex-col md:flex-row gap-4">
//         <div className="flex-1">
//           <span className="flex gap-2 items-center font-semibold">
//             <MessageCircle size={20} />
//             Community Messages
//           </span>
//           <div className="mt-2 flex flex-col">
//             {user?.message?.length > 0 ? (
//               user.message.map((message, index) => (
//                 <button
//                   key={index}
//                   onClick={() => {
//                     setSelectedMessage(message);
//                     setOpenDialog(true);
//                   }}
//                   className="text-blue-600 hover:underline text-left"
//                 >
//                   {index + 1}. {message.recipient}
//                 </button>
//               ))
//             ) : (
//               <span className="text-sm text-red-500 mt-1">No messages found</span>
//             )}
//           </div>
//         </div>
//         <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-300 dark:border-gray-700 pl-0 md:pl-4 pt-4 md:pt-0">
//           <span className="flex gap-2 items-center font-semibold">
//             <Mail size={20} />
//             Invitation Emails
//           </span>
//           <div className="mt-2 flex flex-col">
//             {user?.emailMessages?.length > 0 ? (
//               user.emailMessages.map((email, index) => (
//                 <button
//                   key={index}
//                   onClick={() => {
//                     setSelectedMessage(email);
//                     setOpenDialog(true);
//                   }}
//                   className="text-blue-600 hover:underline text-left"
//                 >
//                   {index + 1}. {email.recipient}
//                 </button>
//               ))
//             ) : (
//               <span className="text-sm text-red-500 mt-1">No emails found</span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Course Section */}
//       <div>
//         <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
//           {user.enrolledCourses.length === 0 ? (
//             <h1>You haven't enrolled yet</h1>
//           ) : (
//             user.enrolledCourses.map((course) => (
//               <Course course={course.courseId} key={course._id} />
//             ))
//           )}
//         </div>
//       </div>

//       {/* ✅ Message/Email Dialog */}
//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogContent className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
//           <DialogHeader>
//             <DialogTitle>Message Details</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-2">
//             <p>
//               <strong>Subject:</strong> {selectedMessage?.subject}
//             </p>
//             <p>
//               <strong>To:</strong> {selectedMessage?.recipient}
//             </p>
//             <p>
//               <strong>Message:</strong> {selectedMessage?.body || "N/A"}
//             </p>
//           </div>
//           <div className="text-right">{selectedMessage?.createdAt.split("T")[0]}</div>
//           <DialogFooter>
//             <Button onClick={() => setOpenDialog(false)}>Close</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Profile;

// export const TotalPayment = ({ setpayment, course }) => {
//   const { data } = useGetCourseByIdQuery(course.courseId);

//   useEffect(() => {
//     if (data?.course?.coursePrice) {
//       setpayment((prev) => prev + data.course.coursePrice);
//     }
//   }, [data?.course?.coursePrice, setpayment]);

//   return null;
// };

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, MessageCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import LoginedOrNot from "@/LoginedOrNot";
import { useGetCourseByIdQuery } from "@/features/api/courseApi";

const Profile = () => {
  const [name, setName] = useState("");
  const [totalpayment, setpayment] = useState(0);
  const userIdRef = useRef(null);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile");
    }
  }, [error, updateUserData, isSuccess, isError]);

  if (isLoading) return <h1 className="text-center mt-20">Loading Profile...</h1>;

  const user = data?.user;

  const updateUserHandler = async () => {
    const finalName = name.trim() === "" ? user.name : name;
    const formData = new FormData();
    formData.append("name", finalName);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    if (user && user._id !== userIdRef.current) {
      setpayment(0);
      userIdRef.current = user._id;
    }
  }, [user]);

  if (!user) return <LoginedOrNot />;

  return (
    <div className="max-w-6xl mx-auto px-6 my-24">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <aside className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl flex flex-col items-center">
          <Avatar className="h-28 w-28 mb-4 ring ring-blue-500">
            <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          <p className="text-sm text-blue-600 mt-1 font-medium">{user.role !== "student" ? "Admin" : "Student"}</p>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 w-full">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Update your name and photo</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Photo</Label>
                  <Input onChange={onChangeHandler} type="file" accept="image/*" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
                  {updateUserIsLoading ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Please wait</>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </aside>

        {/* Profile Main Content */}
        <main className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">Payment Summary</h2>
            <p className="text-xl text-green-600 font-bold">₹{totalpayment}</p>
            {user.enrolledCourses.map((element) => (
              <TotalPayment key={element._id} setpayment={setpayment} course={element} />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Messages */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
              <h3 className="flex items-center gap-2 text-md font-semibold"><MessageCircle size={18} /> Community Messages</h3>
              <div className="mt-2 space-y-2">
                {user.message?.length > 0 ? (
                  user.message.map((message, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedMessage(message);
                        setOpenDialog(true);
                      }}
                      className="text-blue-500 hover:underline block text-left"
                    >
                      {index + 1}. {message.recipient}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No messages found</p>
                )}
              </div>
            </div>

            {/* Emails */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
              <h3 className="flex items-center gap-2 text-md font-semibold"><Mail size={18} /> Invitation Emails</h3>
              <div className="mt-2 space-y-2">
                {user.emailMessages?.length > 0 ? (
                  user.emailMessages.map((email, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedMessage(email);
                        setOpenDialog(true);
                      }}
                      className="text-blue-500 hover:underline block text-left"
                    >
                      {index + 1}. {email.recipient}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No emails found</p>
                )}
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="bg-white dark:bg-gray-900  border-neutral-600 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Your Enrolled Courses</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.enrolledCourses.length === 0 ? (
                <p>You haven't enrolled in any course yet.</p>
              ) : (
                user.enrolledCourses.map((course) => (
                  <Course course={course.courseId} key={course._id} />
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Message/Email Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="backdrop-blur-md bg-white/90 dark:bg-gray-800/90">
          <DialogHeader>
            <DialogTitle>Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p><strong>Subject:</strong> {selectedMessage?.subject}</p>
            <p><strong>To:</strong> {selectedMessage?.recipient}</p>
            <p><strong>Message:</strong> {selectedMessage?.body || "N/A"}</p>
          </div>
          <div className="text-right text-sm text-gray-500 mt-2">
            {selectedMessage?.createdAt?.split("T")[0]}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;

export const TotalPayment = ({ setpayment, course }) => {
  const { data } = useGetCourseByIdQuery(course.courseId);
  useEffect(() => {
    if (data?.course?.coursePrice) {
      setpayment((prev) => prev + data.course.coursePrice);
    }
  }, [data?.course?.coursePrice, setpayment]);
  return null;
};
