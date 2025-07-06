// // Y0QKQiKU9GU3MIuv    => atlas password
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter, 
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   useLoginUserMutation,
//   useRegisterUserMutation,
// } from "@/features/api/authApi";
// import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
// import { Eye, EyeOff, Loader2 } from "lucide-react";

// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [showLoginPassword, setShowLoginPassword] = useState(false);
//   const [showSignPassword, setShowSignPassword] = useState(false);

//   const [signupInput, setSignupInput] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loginInput, setloginInput] = useState({ email: "", password: "" });

//   const [
//     registerUser,
//     {
//       data: registerData,
//       error: registerError,
//       isLoading: registerIsLoading,
//       isSuccess: registerIsSuccess,
//     },
//   ] = useRegisterUserMutation();
//   const [
//     loginUser,
//     {
//       data: loginData,
//       error: loginError,
//       isLoading: loginIsLoading,
//       isSuccess: loginIsSuccess,
//     },
//   ] = useLoginUserMutation();

//   const changeInputHandler = (e, type) => {
//     const { name, value } = e.target;
//     if (type === "signup") {
//       setSignupInput({ ...signupInput, [name]: value });
//     } else {
//       setloginInput({ ...loginInput, [name]: value });
//     }
//   };
//   const handleRegistration = async (type) => {
//     // console.log("type", signupInput);
  
//     const inputData = type === "signup" ? signupInput : loginInput;
   
//     // validation for gmail
//     const emailsInput = inputData.email.split("@");
//      if(emailsInput.length < 2 || emailsInput[1] !== "gmail.com") {
//       toast.error("Please use a valid Gmail address.");
//       return;
//      }
    


//     console.log(inputData);
//     const action = type === "signup" ? registerUser : loginUser;
//     // console.log("action", action);
//     await action(inputData);


//   };
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (registerIsSuccess && registerData) {
//       toast.success(registerData.message || "SignUp successful.");
//       // Automatically log in the user after successful registration
//       console.log("loginData", signupInput);
//       loginUser({ 
//         email: signupInput.email,
//         password: signupInput.password,
//       });
//       setSignupInput({ name: "", email: "", password: "" }); // Reset signup input

//     }
//     if (registerError) {
//       toast.error(registerError.message || "SignUp Failed Try Again.");
//     }
//     if (loginIsSuccess && loginData) {
//       toast.success(loginData.message || "login successful.");
//       navigate("/");
//     }
//     if (loginError) {
//       toast.error(loginError.message || "Login Failed.");
//     }
//   }, [
//     registerIsLoading,
//     loginIsLoading,
//     loginData,
//     registerData,
//     loginError,
//     registerError,
//   ]);

//   return (
//     <div className="flex items-center justify-center w-full mt-20">
//       <Tabs defaultValue="login" className="w-[400px]">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="Signup">Sign Up</TabsTrigger>
//           <TabsTrigger value="login">Login</TabsTrigger>
//         </TabsList>
//         {/* switch the tabs ..... according to value */}
//         <TabsContent value="Signup">
//           <Card>
//             <CardHeader>
//               <CardTitle>Sign Up</CardTitle>
//               <CardDescription>Let's create your account</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="space-y-1">
//                 <Label htmlFor="namze">Name</Label>
//                 <Input
//                   type="text"
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   placeholder="Eg. Ashish"
//                   required={true}
//                   name="name"
//                   value={signupInput.name}
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={signupInput.email}
//                   placeholder="Eg. ashish@gamil.com"
//                   required={true}
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="col-span-3 relative">
//                   <Input
//                     type={showSignPassword ? "text" : "password"}
//                     required={true}
//                     placeholder="Eg. xyz"
//                     onChange={(e) => changeInputHandler(e, "signup")}
//                     name="password"
//                     value={signupInput.password}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowSignPassword((prev) => !prev)}
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
//                   >
//                     {showSignPassword ? (
//                       <Eye size={20} />
//                     ) : (
//                       <EyeOff size={20} />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 disabled={registerIsLoading}
//                 onClick={() => handleRegistration("signup")}
//               >
//                 {registerIsLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Please wait
//                   </>
//                 ) : (
//                   "Sign Up"
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         {/* switch the tabs ..... according to value */}

//         <TabsContent value="login">
//           <Card>
//             <CardHeader>
//               <CardTitle>Login</CardTitle>
//               <CardDescription>
//                 Login your password here. After signup, you'll be logged in.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="space-y-1">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   type="email"
//                   placeholder="Eg. ashish@gamil.com"
//                   required={true}
//                   onChange={(e) => changeInputHandler(e, "login")}
//                   name="email"
//                   value={loginInput.email}
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="col-span-3 relative">
//                   <Input
//                     type={showLoginPassword ? "text" : "password"}
//                     placeholder="Eg. xyz"
//                     required={true}
//                     onChange={(e) => changeInputHandler(e, "login")}
//                     name="password"
//                     value={loginInput.password}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowLoginPassword((prev) => !prev)}
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
//                   >
//                     {showLoginPassword ? (
//                       <Eye size={20} />
//                     ) : (
//                       <EyeOff size={20} />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 disabled={loginIsLoading}
//                 onClick={() => handleRegistration("login")}
//               >
//                 {loginIsLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Please wait
//                   </>
//                 ) : (
//                   "Login"
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//         {/* <div className="grid w-full ">
//           <Button className="mt-5">
//             <FcGoogle className="h-4 w-4" />
//             Continue with Google
//           </Button>
//           <Button className="mt-5">
//             <FaGithub />
//             Continue with GitHub
//           </Button>
//         </div> */}
//       </Tabs>
//     </div>
//   );
// };
// export default Login;


// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   useLoginUserMutation,
//   useRegisterUserMutation,
// } from "@/features/api/authApi";
// import { Eye, EyeOff, Loader2 } from "lucide-react";

// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [showLoginPassword, setShowLoginPassword] = useState(false);
//   const [showSignPassword, setShowSignPassword] = useState(false);

//   const [signupInput, setSignupInput] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loginInput, setloginInput] = useState({
//     email: "",
//     password: "",
//   });

//   const [
//     registerUser,
//     {
//       data: registerData,
//       error: registerError,
//       isLoading: registerIsLoading,
//       isSuccess: registerIsSuccess,
//     },
//   ] = useRegisterUserMutation();

//   const [
//     loginUser,
//     {
//       data: loginData,
//       error: loginError,
//       isLoading: loginIsLoading,
//       isSuccess: loginIsSuccess,
//     },
//   ] = useLoginUserMutation();

//   const navigate = useNavigate();

//   const changeInputHandler = (e, type) => {
//     const { name, value } = e.target;
//     if (type === "signup") {
//       setSignupInput({ ...signupInput, [name]: value });
//     } else {
//       setloginInput({ ...loginInput, [name]: value });
//     }
//   };

//   const handleRegistration = async (type) => {
//     const inputData = type === "signup" ? signupInput : loginInput;

//     // Basic Gmail validation
//     const emailsInput = inputData.email.split("@");
//     if (emailsInput.length < 2 || emailsInput[1] !== "gmail.com") {
//       toast.error("Please use a valid Gmail address.");
//       return;
//     }

//     const action = type === "signup" ? registerUser : loginUser;
//     await action(inputData);
//   };
  
//   // useEffect(() => {
//   //   const autoLoginAfterSignup = async () => {
//   //     if (registerIsSuccess && registerData) {
//   //       toast.success(registerData.message || "SignUp successful.");
//   //       try {
//   //         await loginUser({

//   //           email: signupInput.email,
//   //           password: signupInput.password,
//   //         });
//   //         setSignupInput({ name: "", email: "", password: "" });
//   //       } catch (err) {
//   //         toast.error("Auto-login failed. Please try logging in manually.");
//   //       }
//   //     }
//   //     if (registerError) {
//   //       toast.error(registerError.message || "SignUp Failed Try Again.");
//   //     }
//   //     if (loginIsSuccess && loginData) {
//   //       toast.success(loginData.message || "Login successful.");
//   //       navigate("/");
//   //     }
//   //     if (loginError) {
//   //       toast.error(loginError.message || "Login Failed.");
//   //     }
//   //   };
//   // };
//   // autoLoginAfterSignup();
//   // }, [
//   //   registerIsSuccess,
//   //   registerData,
//   //   registerError,
//   //   loginIsSuccess,
//   //   loginError,
//   //   loginData,
//   // ]);


//   useEffect(() => {
//     const autoLoginAfterSignup = async () => {
//       if (registerIsSuccess && registerData) {
//         toast.success(registerData.message || "SignUp successful.");

//         try {
//           await loginUser({
//             email: signupInput.email,
//             password: signupInput.password,
//           });

//           setSignupInput({ name: "", email: "", password: "" });
//         } catch (err) {
//           toast.error("Auto-login failed. Please try logging in manually.");
//         }
//       }

//       if (registerError) {
//         toast.error(registerError.message || "SignUp Failed Try Again.");
//       }

//       if (loginIsSuccess && loginData) {
//         toast.success(loginData.message || "Login successful.");
//         navigate("/");
//       }

//       if (loginError) {
//         toast.error(loginError.message || "Login Failed.");
//       }
//     };

//     autoLoginAfterSignup();
//   }, [
//     registerIsSuccess,
//     registerData,
//     registerError,
//     loginIsSuccess,
//     loginError,
//     loginData,
//   ]);

//   return (
//     <div className="flex items-center justify-center w-full mt-20">
//       <Tabs defaultValue="login" className="w-[400px]">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="Signup">Sign Up</TabsTrigger>
//           <TabsTrigger value="login">Login</TabsTrigger>
//         </TabsList>

//         {/* Sign Up Tab */}
//         <TabsContent value="Signup">
//           <Card>
//             <CardHeader>
//               <CardTitle>Sign Up</CardTitle>
//               <CardDescription>Let's create your account</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="space-y-1">
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   type="text"
//                   name="name"
//                   value={signupInput.name}
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   placeholder="Eg. Ashish"
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={signupInput.email}
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   placeholder="Eg. ashish@gmail.com"
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     type={showSignPassword ? "text" : "password"}
//                     name="password"
//                     value={signupInput.password}
//                     onChange={(e) => changeInputHandler(e, "signup")}
//                     placeholder="Eg. xyz"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowSignPassword((prev) => !prev)}
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
//                   >
//                     {showSignPassword ? <Eye size={20} /> : <EyeOff size={20} />}
//                   </button>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 disabled={registerIsLoading}
//                 onClick={() => handleRegistration("signup")}
//               >
//                 {registerIsLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Please wait
//                   </>
//                 ) : (
//                   "Sign Up"
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         {/* Login Tab */}
//         <TabsContent value="login">
//           <Card>
//             <CardHeader>
//               <CardTitle>Login</CardTitle>
//               <CardDescription>
//                 Login with your credentials
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="space-y-1">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={loginInput.email}
//                   onChange={(e) => changeInputHandler(e, "login")}
//                   placeholder="Eg. ashish@gmail.com"
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     type={showLoginPassword ? "text" : "password"}
//                     name="password"
//                     value={loginInput.password}
//                     onChange={(e) => changeInputHandler(e, "login")}
//                     placeholder="Eg. xyz"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowLoginPassword((prev) => !prev)}
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
//                   >
//                     {showLoginPassword ? <Eye size={20} /> : <EyeOff size={20} />}
//                   </button>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 disabled={loginIsLoading}
//                 onClick={() => handleRegistration("login")}
//               >
//                 {loginIsLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Please wait
//                   </>
//                 ) : (
//                   "Login"
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Login;



import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignPassword, setShowSignPassword] = useState(false);

  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const hasAutoLoggedIn = useRef(false);

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;

    const emailsInput = inputData.email.split("@");
    if (emailsInput.length < 2 || emailsInput[1] !== "gmail.com") {
      toast.error("Please use a valid Gmail address.");
      return;
    }

    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    const autoLoginAfterSignup = async () => {
      if (registerIsSuccess && registerData && !hasAutoLoggedIn.current) {
        hasAutoLoggedIn.current = true;
        toast.success(registerData.message || "SignUp successful.");

        try {
          const result = await loginUser({
            email: signupInput.email,
            password: signupInput.password,
          }).unwrap();

          if (result) {
            toast.success(result.message || "Login successful.");
            setSignupInput({ name: "", email: "", password: "" });
            navigate("/");
          }
        } catch (err) {
          toast.error("Auto-login failed. Please login manually.");
        }
      }

      if (registerError) {
        toast.error(
          registerError.data?.message || "SignUp failed. Please try again."
        );
      }

      if (loginIsSuccess && loginData) {
        toast.success(loginData.message || "Login successful.");
        navigate("/");
      }

      if (loginError) {
        toast.error(loginError.data?.message || "Login failed.");
      }
    };

    autoLoginAfterSignup();
  }, [
    registerIsSuccess,
    registerData,
    registerError,
    loginIsSuccess,
    loginError,
    loginData,
    signupInput,
    loginUser,
    navigate,
  ]);

  return (
    <div className="flex items-center justify-center w-full mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        {/* Sign Up */}
        <TabsContent value="Signup">
          <Card className="dark:border-gray-700">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create your account below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Eg. Ashish"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Eg. ashish@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showSignPassword ? "text" : "password"}
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="Eg. xyz123"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showSignPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Login */}
        <TabsContent value="login">
          <Card className="dark:border-gray-700">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Eg. ashish@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showLoginPassword ? "text" : "password"}
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="Eg. xyz123"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showLoginPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
         {/* <div className="grid w-full ">
           <Button className="mt-5">
             <FcGoogle className="h-4 w-4" />
             Continue with Google
           </Button>
           <Button className="mt-5">
               <FaGithub />
             Continue with GitHub
           </Button>
        </div> */}
      </Tabs>
    </div>
  );
};

export default Login;
