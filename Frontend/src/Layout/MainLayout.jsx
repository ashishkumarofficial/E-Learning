import Footer from '@/components/footer'
import Navbar from '@/components/Navbar'
import Courses from '@/pages/student/Courses'
import { OutdentIcon } from 'lucide-react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from 'sonner'

function MainLayout() {
  return (
      <div  className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-grow">
        <Outlet/>
      </main>
     <Footer/>
    </div>

)
}

export default MainLayout
