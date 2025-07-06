import {
  useGetUserInfoQuery,
  useLazyMakeAdminQuery,
  useLazyRemoveAdminQuery,

} from "@/features/api/courseApi";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Course from "../student/Course";

import {
  ArrowLeft,
  Loader2,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useLoadUserQuery, useLoginUserMutation } from "@/features/api/authApi";
import LoginedOrNot from "@/LoginedOrNot";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Loading } from "./Dashboard";

export const UserInfo = () => {
  // const {data:islogin} = useLoadUserQuery()
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [actionbtn, setactionbtn] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
  const params = useParams();

  const { userId } = params;

  const { data: user, isLoading, refetch } = useGetUserInfoQuery(userId);
  const { data: usersinfo } = useLoadUserQuery();
 
  // const { data: userAdmin, isLoading: userAdminLoading, refetch } = useMakeAdminQuery(userId);
  const [makeAdmin, { data: userAdmin, isLoading: userAdminLoading }] =
    useLazyMakeAdminQuery();
  const [
    removeAdmin,
    { data: userRemoveAdmin, isLoading: userRemoveAdminLoadnig },
  ] = useLazyRemoveAdminQuery();

  const [loginInput, setloginInput] = useState({ email: "", password: "" });

  useEffect(() => {
    refetch();
  }, [user]);
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setloginInput({ ...loginInput, [name]: value });
  };

  const varifyUser = async (type) => {
    if (loginInput.email === "" || loginInput.password === "") {
      toast.error("Please provide email and password");
      return;
    }

    if (
      loginInput.email === "ashish@gmail.com" &&
      loginInput.password === "ashish123"
    ) {
      setactionbtn(type);
      const inputData = loginInput;
      // console.log(inputData);
      const action = loginUser;
      // console.log("action", action);
      await action(inputData);
      return;
    } else {
      toast.error("Your Email and Password are invalid");
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (loginIsSuccess && loginData) {
      if (actionbtn === "makeAdmin") {
        toast.success("Admin created successfully");
        setloginInput({ email: "", password: "" });
        setPassword("");
        setShowPassword(false);
        makeAdmin(userId);

        navigate("/admin/users");
      }
      if (actionbtn === "removeAdmin") {
        toast.success("Admin removed successfully");
        setloginInput({ email: "", password: "" });
        setPassword("");
        setShowPassword(false);

        removeAdmin(userId);

        navigate("/admin/users");
      }
    }

    if (loginError) {
      toast.error(loginError.message || "Email and password is not correct");
    }
  }, [loginIsLoading, loginData, loginError]);
  // console.log("user", user);

 if (isLoading)
   return (
    <Loading/>
   );
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center gap-2 ml-5">
        <Link to={`/admin/users`}>
          <Button size="icon" variant="outline" className="rounded-full">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <h1 className="font-bold text-2xl text-center md:text-left ">
          User Information
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-36 w-36">
            <AvatarImage
              className="h-full w-full rounded-full object-cover"
              src={user?.user.photoUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.user.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.user.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.user.role!=="student"? "Admin":"Student"}
              </span>
            </h1>
          </div>
          
          {usersinfo?.user._id === "67ed019a468978ae5892cab0" ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="mt-2">
                  Make new admin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Provide the authentication to user</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to make this user to new admin
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Current Admin Email</Label>
                    <div className="col-span-3 relative">
                      <Input
                        type="text"
                        onChange={(e) => changeInputHandler(e)}
                        value={loginInput.email}
                        placeholder="Eg. ashish@gamil.com"
                        required
                        name="email"
                        className="pr-10" // Give padding for button
                      />
                    </div>
                    <Label>Current Admin password</Label>
                    <div className="col-span-3 relative">
                      <Input
                        type={showPassword ? "text" : "password"} // Toggle type
                        onChange={(e) => changeInputHandler(e)}
                        value={loginInput.password}
                        placeholder="Eg. xyz"
                        required
                        name="password"
                        className="pr-10" // Give padding for button
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <Eye size={20} />
                        ) : (
                          <EyeOff size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  {user?.user.role === "instructor" ? (
                    <Button
                      onClick={() => varifyUser("removeAdmin")}
                      disabled={loginIsLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Please wait
                        </>
                      ) : (
                        "Remove Admin"
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => varifyUser("makeAdmin")}
                      disabled={loginIsLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Please wait
                        </>
                      ) : (
                        "Make admin"
                      )}
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            ""
          )}
        </div>
   {/* <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow w-full">
            <h2 className="text-lg font-semibold mb-4">Messages</h2>
            {user?.user.message.length === 0 ? (
              <p className="text-sm text-gray-500">No messages available.</p>
            ) : (
              <div className="space-y-4">
                {user?.user.message.map((msg) => (
                  <div key={msg._id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <h3 className="font-medium text-gray-900 dark:text-white">{msg.subject}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{msg.body}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      From: {msg.sender.name} → To: {msg.recipient}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div> */}


 <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg p-4 my-4 flex-col md:flex-row gap-4">
        <div className="flex-1">
          <span className="flex gap-2 items-center font-semibold">
            <MessageCircle size={20} />
            Community Messages
          </span>
          <div className="mt-2 flex flex-col">
            {user?.user.message?.length > 0 ? (
              user.user.message.map((message, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedMessage(message);
                    setOpenDialog(true);
                  }}
                  className="text-blue-600 hover:underline text-left"
                >
                  {index + 1}. {message.recipient}
                </button>
              ))
            ) : (
              <span className="text-sm text-red-500 mt-1">No messages found</span>
            )}
          </div>
        </div>
        <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-300 dark:border-gray-700 pl-0 md:pl-4 pt-4 md:pt-0">
          <span className="flex gap-2 items-center font-semibold">
            <Mail size={20} />
            Invitation Emails
          </span>
          <div className="mt-2 flex flex-col">
            {user?.user.emailMessages?.length > 0 ? (
              user.user.emailMessages.map((email, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedMessage(email);
                    setOpenDialog(true);
                  }}
                  className="text-blue-600 hover:underline text-left"
                >
                  {index + 1}. {email.recipient}
                </button>
              ))
            ) : (
              <span className="text-sm text-red-500 mt-1">No emails found</span>
            )}
          </div>
        </div>
      </div>



<Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p>
              <strong>Subject:</strong> {selectedMessage?.subject}
            </p>
            <p>
              <strong>To:</strong> {selectedMessage?.recipient}
            </p>
            <p>
              <strong>Message:</strong> {selectedMessage?.body || "N/A"}
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>




      </div>
      
      <div>
        <h1 className="font-medium text-lg">
          User's enrolled courses Information
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user?.user.enrolledCourses.length === 0 ? (
            <h1>User don't enrolled any courses</h1>
          ) : (
            user?.user.enrolledCourses.map((course) => (
              <Course course={course.courseId} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
