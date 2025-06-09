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
  School,
  CreditCard,
  LogOut,
  Mail,
  MessageSquare,
  Settings,
  User,
  UserPlus,
  LayoutDashboard,
  Menu,
  Monitor,
  Moon,
  Sun,
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
import { useSelector } from "react-redux";
// import Dashboard from "@/pages/admin/Dashboard";

function Navbar() {
  const { user } = useSelector((store) => store.auth);

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
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
          <GraduationCap size={30} className="text-blue-500" />
          <Link to="/">
            <h1
              className="hidden md:block font-extrabold text-2xl "
              style={{ fontFamily: "book Antiqua" }}
            >
              E-Learning
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
              <DropdownMenuContent className="w-56">
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
                        <DropdownMenuSubContent className="">
                          <DropdownMenuItem className="w-full">
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
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Mail />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare />
                          <span>Message</span>
                          <Input
                            placeholder="Search..."
                            className="w-[200px]"
                          />
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
            E-Learning{" "}
          </Link>
        </h1>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
}

export default Navbar;

const MobileNavbar = ({ user }) => {
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  // console.log("mobile", user);
  // ?user logout handler
  const logoutHandler = async () => {
    await logoutUser();
  };
    useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-10 hover:bg-gray-200 dark:hover:bg-gray-500 "
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>E-Learning System</SheetTitle>
          <DarkMode check={"mobile"} />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4 ">
         

        
            {user ? (<>
               <Link to="/profile">
            <span className="flex items-center hover:bg-gray-100 dark:hover:bg-slate-500">
              <User className="w-5 h-5 mr-2" />
              Edit Profile
            </span>
          </Link>

          <Link to="/my-learning">
            <span className="flex items-center  hover:bg-gray-100 dark:hover:bg-slate-500">
              <CreditCard className="w-5 h-5 mr-2" />
              My Learning
            </span>
          </Link>
                <Link to="/login">
              <span className="flex items-center hover:bg-gray-100 dark:hover:bg-slate-500" onClick={logoutHandler}>
                <LogOut className="w-5 h-5 mr-2" />
                Log out
              </span>
              </Link>
              </>

            ) : 
            
            (  <Link to="/login">
              <span className="flex items-center  hover:bg-gray-100 dark:hover:bg-slate-500" onClick={logoutHandler}>
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </span>
              </Link>
            )}
          
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter className={"flex w-full"}>
            <SheetClose asChild>
              <Link to="admin">
                <Button type="submit" className={"flex w-full"}>
                  Dashboard
                </Button>
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
