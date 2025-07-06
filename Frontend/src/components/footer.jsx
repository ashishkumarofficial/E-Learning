// import React from "react";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-10 border-t border-gray-300 dark:border-gray-700">
//       <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
//         <p className="text-sm">&copy; {new Date().getFullYear()} E-learning. All rights reserved.</p>

//         <div className="flex space-x-4 text-sm">
//           <Link to="/" className="hover:text-primary transition-colors">About</Link>
//           <Link to="/" className="hover:text-primary transition-colors">Privacy</Link>
//           <Link to="/" className="hover:text-primary transition-colors">Contact</Link>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { Link } from "react-router-dom";

const Footer = ({user}) => {
  // console.log("user for footer component",user._id);
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} E-learning. All rights reserved.</p>

        <div className="flex space-x-4 text-sm">
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <Link to={`/profile/messages/${user._id}`} className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
