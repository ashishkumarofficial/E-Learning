import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCheckPaymentQuery } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { data, isLoading } = useGetCheckPaymentQuery();
  

  

  const purchasedUsers = data?.users || [];
    const totalAdmins = data?.users?.filter(user => user.role === "instructor").length || 0;

  // Flatten all enrolledCourses across users
  const enrolledCourses = purchasedUsers.flatMap(
    (user) => user.enrolledCourses || []
  );

  // Prepare chart data
  const courseData = enrolledCourses.map((courseItem) => ({
    name: courseItem.courseId?.category || "Unknown",
    price: courseItem.courseId?.coursePrice || 0,
  }));

  // Calculate total sales and total revenue
  const totalSales = enrolledCourses.length;
  const totalRevenue = enrolledCourses.reduce(
    (acc, courseItem) => acc + (courseItem.courseId?.coursePrice || 0),
    0
  );
if (isLoading)
  return (
   <Loading/>
  );
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 ">
      {/* Total Sales Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900 dark:border-gray-600">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-blue-600 hover:text-4xl">{totalSales}</p>
        </CardContent>
      </Card>

      {/* Total Revenue Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900 dark:border-gray-600">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-green-600 hover:text-4xl">₹{totalRevenue}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900 dark:border-gray-600">
        <CardHeader>
          <CardTitle>Total Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-blue-600 hover:text-4xl">{totalAdmins}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900 dark:border-gray-600">
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-blue-600 hover:text-4xl">{data?.users.length}</p>
        </CardContent>
      </Card>

      {/* Course Prices Chart */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 dark:bg-gray-900 dark:border-gray-600">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4a90e2"
                strokeWidth={3}
                dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
     
    </div>
  );
};

export default Dashboard;


// You can use any spinner icon

export const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-[60vh] w-full">
      <div className="flex items-center gap-3 text-center animate-pulse">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {message}
        </span>
      </div>
    </div>
  );
};


