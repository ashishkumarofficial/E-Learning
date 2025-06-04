import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="auth-layout">
      {/* You can add auth page styles or wrapper here */}
      <Outlet />
    </div>
  )
}

export default AuthLayout