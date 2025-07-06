import { useEffect, useState } from "react";

import "./App.css";
import Login from "./pages/login";

// import HeroSection from "./pages/student/heroSection";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import { RouterProvider } from "react-router-dom";

import MyLearning from "./pages/student/MyLearning";

import AuthLayout from "./Layout/AuthLayout";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLechure";
import Allusers from "./pages/admin/Allusers";
import EditLecture from "./pages/admin/lecture/EditLecture";
import UserInfo from "./pages/admin/UserInfo";

import SearchPage from "./pages/student/searchPage";
import Profile from "./pages/student/Profile";
import CourseDetail from "./pages/student/CourseDetail";
import Continue from "./pages/student/Continue";
import HeroSection from "./pages/student/HeroSection";
import Emails from "./pages/student/Emails";
import Message from "./pages/student/Message";
import About from "./pages/admin/About";
import Privacy from "./pages/admin/Privacy";




// const appRouter = createBrowserRouter([
//   {
//     path:"/",
//     element:<MainLayout/>,
//     children:[
//       {
//         path:"/",
//         element:(

//           <>
//           <HeroSection/>
//           <Courses/>
//           </>
//         )
//       },{
//         path:"login",
//         element: <Login/>
//       }
//       ,{
//         path:"my-learning",
//         element: <MyLearning/>
//       }
//       ,{
//         path:"profile",
//         element: <Profile/>
//       }
//     ]
//   }
// ])
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            
          </>
        ),
      },
      {
        path: "Home",
        element: (
          <>
            <HeroSection />
           
          </>
        ),
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "about",
        element: <About/>,
      },
      {
        path: "privacy",
        element: <Privacy/>,
      },
      {
        path: "profile/emails/:userId",
        element: <Emails />,
      },
      {
        path: "profile/messages/:userId",
        element: <Message />,
      },
      {
        path: "course/search",
        element: <SearchPage/>,
      },
      {
        path: "/course-detail/:courseId",
        element: <CourseDetail/>,
      },
      {
        path: "/course-detail/:courseId/continue",
        element: <Continue/>,
      },
      // ? admin routes start from here

      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />, 
          },
          {
            path: "users",
            element: <Allusers/>, 
          },
          {
            path: "users/edit/:userId",
            element: <UserInfo/>, 
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element:<AddCourse/>
          },
          {
            path: "course/:courseId",
            element:<EditCourse/>
          },
          {
            path: "course/:courseId/lecture",
            element:<CreateLecture/>
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element:<EditLecture/>
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />, // 👈 No Navbar
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);
   const [theme, setTheme] = useState(
        localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      );
    
      useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
      }, [theme]);
    
 
  return (
    <>
      <main>
        <RouterProvider router={appRouter} />
      </main>
    </>
  );
}

export default App;


