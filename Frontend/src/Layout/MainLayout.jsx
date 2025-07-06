import Footer from '@/components/footer'
import Navbar from '@/components/Navbar'
import Courses from '@/pages/student/Courses'
import { OutdentIcon } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { toast } from 'sonner'

function MainLayout() {
     const { user } = useSelector((store) => store.auth);
  return (
      <div  className="flex flex-col min-h-screen">
      <Navbar user={user}/>
      <main className="flex-grow">
        <Outlet/>
      </main>
     <Footer user={user}/>
    </div>

)
}

export default MainLayout
