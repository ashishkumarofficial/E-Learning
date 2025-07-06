import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Privacy = () => {
  const handleClose = () => {
    window.history.back();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg w-full max-w-2xl mx-4 md:mx-auto overflow-y-auto max-h-[90vh]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl font-bold mb-4 text-red-500 dark:text-red-400"
          variants={fadeInUp}
        >
          Privacy Policy
        </motion.h2>

        <motion.p
          className="text-gray-700 dark:text-gray-300 mb-3"
          variants={fadeInUp}
        >
          We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your private data.
        </motion.p>

        <motion.p
          className="text-gray-700 dark:text-gray-300 mb-3"
          variants={fadeInUp}
        >
          We only collect the necessary information needed to provide our services and never share it with third parties without your consent.
        </motion.p>

        <motion.p
          className="text-gray-700 dark:text-gray-300 mb-6"
          variants={fadeInUp}
        >
          By using our platform, you agree to the collection and use of your information in accordance with this policy.
        </motion.p>

        <motion.div
          className="text-right"
          variants={fadeInUp}
          transition={{ delay: 1 }}
        >
          <Button
            variant=""
            onClick={handleClose}
           
          >
            Close
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Privacy;
