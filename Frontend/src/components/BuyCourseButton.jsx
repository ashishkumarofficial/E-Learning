import React, { useEffect } from "react";
import { Button } from "./ui/button";
// import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { courseApi } from "@/features/api/courseApi";
import { useLoadUserQuery } from "@/features/api/authApi";
import basedUrl from "@/features/api/basedUrl.js";

const BuyCourseButton = ({courseId,price}) => {
  
  
  let BasedUrl = basedUrl();
  // console.log("basedurls",BasedUrl);

  const { data:userInfo,refetch} = useLoadUserQuery()
  useEffect(() => {
    refetch()
  }, [userInfo])

     
    const loadRazorpay = () => {
        if (document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']")) {
          createOrder(); // Razorpay script already loaded
          return;
        }
    
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = createOrder;
        script.onerror = () => {
          console.error("Failed to load Razorpay SDK.");
          alert("Razorpay SDK failed to load. Please check your internet connection.");
        };
        document.body.appendChild(script);
      };
    
      const createOrder = async () => {
        try {
          const response = await fetch(`${BasedUrl}/api/v1/payment/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: price }), // Amount in INR paisa
          });
    
          const order = await response.json();
    
          if (!order.id) {
            throw new Error("Order ID not received");
          }
    
          openRazorpay(order);
        } catch (error) {
          console.error("Create order error:", error);
          alert("Failed to create Razorpay order.");
        }
      };
    
      const openRazorpay = (order) => {
        const options = {
          key: "rzp_test_tzM63IOUjpFvmR", // Your Razorpay key here
          amount: order.amount,
          currency: order.currency,
          name: userInfo.user.name,
          description: "Course Purchase",
          order_id: order.id,
          prefill: {
            name: userInfo.user.name,
            email: userInfo.user.email,
            contact:"9999999999", // Replace with actual contact number
          },
          handler: async (response) => {
            try {
              const verifyResponse = await fetch(`${BasedUrl}/api/v1/payment/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  name: userInfo.user.name,
                  email: userInfo.user.email,
                  contact: "9999999999", // Replace with actual contact number
                  amount: price,
                  courseId: courseId,
                  userId:userInfo.user._id // Replace with actual course ID
                }),
              });
    
              const verifyResult = await verifyResponse.json();
    
              if (verifyResult.success) {
                toast.success("Payment successful!");
                console.log("Payment verified:", verifyResult);
              } else {
                alert("Payment verification failed.");
                console.warn("Verification failed:", verifyResult);
              }
            } catch (error) {
              console.error("Payment verification error:", error);
              alert("An error occurred during payment verification.");
            }
          },
          theme: {
            color: "#3399cc", // Customize color
            logo: "https://yourdomain.com/logo.png", // Add your logo URL here
          },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };
    
      return (
       
          <Button className="w-full" onClick={loadRazorpay}>Purchase Course</Button>
     
      );
};

export default BuyCourseButton;


