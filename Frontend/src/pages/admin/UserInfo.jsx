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

export const UserInfo = () => {
  // const {data:islogin} = useLoadUserQuery()
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [actionbtn, setactionbtn] = useState("");
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

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="max-w-4xl mx-auto px-4 ">
      <div className="flex items-center gap-2">
        <Link to={`/admin/users`}>
          <Button size="icon" variant="outline" className="rounded-full">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <h1 className="font-bold text-2xl text-center md:text-left">
          User Information
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="">
            <AvatarImage
              className="h-36 w-36  rounded-full"
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
                {user?.user.role.toUpperCase()}
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
