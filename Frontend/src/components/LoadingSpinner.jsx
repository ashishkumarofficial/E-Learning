import { Loader } from 'lucide-react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
      <div className="flex flex-col items-center p-10 rounded-xl shadow-2xl bg-white/10 backdrop-blur-lg animate-fade-in-down">
        <Loader className="animate-spin text-white w-16 h-16 mb-6 drop-shadow-glow" />

        <h2 className="text-white text-2xl font-bold mb-4 animate-pulse tracking-wide">
          Hang tight, we're getting things ready...
        </h2>

        {/* Bouncing dots */}
        <div className="flex space-x-2 mt-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:.2s]"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:.4s]"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner;
