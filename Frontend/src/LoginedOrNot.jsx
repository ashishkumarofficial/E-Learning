import React from 'react'

import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';

function LoginedOrNot() {
      return (
       <div className="flex items-center justify-center w-full h-screen">
   <div className="bg-white border-l-4 border-red-500 shadow-md p-8 rounded-xl max-w-md text-center">
     <h1 className="text-xl font-bold text-red-600 mb-4">
       ⚠️ Unauthorized Access
     </h1>
     <p className="text-gray-700 mb-6">
       You are not authorized to access this profile. Please log in to continue.
     </p>
     <Link to="/login">
       <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md">
         Back to Login
       </Button>
     </Link>
   </div>
 </div>
 
      );
    }
  


export default LoginedOrNot
