import Footer from '@/components/footer'
import Navbar from '@/components/Navbar'
import Courses from '@/pages/student/Courses'
import { OutdentIcon } from 'lucide-react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from 'sonner'

function MainLayout() {
  return (
      <div>
      <Navbar/>
      <div>
      
        <Outlet/>
      </div>
     <Footer/>
    </div>

)
}

export default MainLayout
