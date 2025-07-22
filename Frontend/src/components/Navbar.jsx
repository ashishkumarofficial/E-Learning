// import { CreditCard, School, User } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {

  CreditCard,
  LogOut,
  Mail,
  MessageSquare,
  Settings,
  User,
  UserPlus,
  LayoutDashboard,
  Menu,
 
  GraduationCap,
  LogIn,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import { Input } from "./ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";

// import Dashboard from "@/pages/admin/Dashboard";

function Navbar({user}) {
  // const { user } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };
  // console.log("laptop", user);
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-gray-900 bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
          <GraduationCap size={30} className="text-blue-500" />
          <Link to="/">
            <h1
              className="hidden md:block font-extrabold text-2xl "
              style={{ fontFamily: "book Antiqua" }}
            >
              EduLearn
            </h1>
          </Link>
        </div>
        {/* user icon and dark mode button / icon */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              {/* <DropdownMenuTrigger className="flex items-center gap-2"> */}
              <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none focus:ring-0">
                <Avatar>
                  <AvatarImage
                    className="cursor-pointer"
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 dark:bg-gray-900 dark:border-gray-700">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="profile" className="flex items-center gap-2">
                      <User />
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="my-learning" className="flex items-center gap-2">
                      <CreditCard />
                      My learning
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuGroup>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Settings />
                        <span>Settings</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="w-48 dark:bg-gray-900 dark:border-gray-700">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <DarkMode check={"laptop"} />
                          </DropdownMenuItem>

                          {/*<DropdownMenuItem >
                            <Sun />
                            <span>Light</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem >
                            <Monitor />
                            <span>System</span>
                          </DropdownMenuItem> */}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus />
                      <span>Community</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="dark:bg-gray-900 dark:border-gray-700">
                        <DropdownMenuItem>
                          <Link
                            to={`profile/emails/${user?._id}`}
                            className="flex items-center gap-2"
                          >
                            <Mail size={16} />
                            <span>Invite Users</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link
                            to={`profile/messages/${user?._id}`}
                            className="flex items-center gap-2"
                          >
                            <MessageSquare size={16} />
                            <span>Message With Community</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>

                <DropdownMenuItem onClick={logoutHandler}>
                  <LogOut />
                  <span>Log out</span>
                </DropdownMenuItem>
                {user?.role === "instructor" && (
                  <DropdownMenuItem asChild>
                    <Link to="admin" className="flex items-center gap-2">
                      <LayoutDashboard />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex item-center gap-2">
              <Link to="/login">
                {" "}
                <Button variant="outline">login</Button>
              </Link>
              <Link to="/login">
                {" "}
                <Button>Sign Up</Button>{" "}
              </Link>
            </div>
          )}
          {/* <DarkMode /> */}
        </div>
      </div>
      {/* mobile device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1
          className="font-extrabold text-2xl"
          style={{ fontFamily: "book Antiqua" }}
        >
          <Link to="/" className="hover:text-blue-600">
            {" "}
            EduLearn{" "}
          </Link>
        </h1>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
}

export default Navbar;

export const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-10 hover:bg-gray-200 dark:hover:bg-gray-600"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col z-[9999] pt-4">
        <SheetHeader className="flex flex-col items-center justify-between">
          <SheetTitle className="text-2xl">
            {" "}
            <Link to="/" className="flex gap-4 mt-5">
              {" "}
              <GraduationCap size={30} className="text-blue-500" />
              EduLearn{" "}
            </Link>
          </SheetTitle>
          <DarkMode check="mobile" />
        </SheetHeader>

        <Separator />

        <nav className="flex flex-col space-y-2">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center h-10 gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 rounded"
              >
                <User size={18} />
                Edit Profile
              </Link>

              <Link
                to="/my-learning"
                className="flex items-center h-10 gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 rounded"
              >
                <CreditCard size={18} />
                My Learning
              </Link>

              <Link
                to="/profile/emails"
                className="flex items-center h-10 gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 rounded"
              >
                <Mail size={18} />
                Invite Users
              </Link>

              <Link
                to="/profile/messages"
                className="flex items-center h-10 gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 rounded"
              >
                <MessageSquare size={18} />
                Message with Community
              </Link>

              <button
                onClick={logoutHandler}
                className="flex items-center h-10 gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 rounded"
              >
                <LogOut size={18} />
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center h-10 gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 rounded"
            >
              <LogIn size={18} />
              Login
            </Link>
          )}
        </nav>

        {user?.role === "instructor" && (
          <SheetFooter className="mt-4">
            <SheetClose asChild>
              <Link to="/admin" className="w-full">
                <Button className="w-full">Dashboard</Button>
              </Link>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

// md==>middem device
//md:hidden // laptop ke liye
