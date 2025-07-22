import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const About = () => {
  const handleClose = () => {
    window.history.back(); // Goes back to previous route
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg w-full max-w-2xl mx-4 md:mx-auto overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          About This Platform
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-3">
          Welcome to our EduLearn platform! This is a full-stack project built with modern technologies to provide interactive, personalized, and scalable learning experiences.
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-3">
          The platform includes features like authentication, role-based access, video streaming, course purchases, admin dashboard, and real-time updates — all integrated via a MERN stack architecture.
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          This project demonstrates my hands-on skills with React, Node.js, Express, MongoDB, Redux Toolkit, RTK Query, Tailwind CSS, and Razorpay integration.
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
          <motion.img
            src="/ashish_nbg.jpg"
            alt="Ashish Kumar"
            className="w-32 h-32 rounded-full object-cover shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <p className="text-gray-700 dark:text-gray-300">
            Hi, I’m <span className="font-semibold">Ashish Kumar</span>, a passionate Full Stack Developer who built this platform as a practical demonstration of real-world skills and modern application architecture. The goal is to empower learners and also showcase my development capabilities.
          </p>
        </div>

        <div className="text-right">
          <Button
            variant=""
            onClick={handleClose}
            className=""
          >
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
