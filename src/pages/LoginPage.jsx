import Login from '@/components/LoginComponent'
import { Link } from 'react-router-dom'
import SocialComponent from '@/components/SocialComponent'

export default function () {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-slate-400 max-lg:hidden lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1701676566873-139bc9415bc4?q=80&w=1920&auto=format&fit=crop"
          className="h-full w-full object-cover object-center"
          alt=""
        />
      </div>
      <div className=" flex flex-1 flex-col items-center justify-center border-l-orange-500 p-4 lg:w-1/2">
        <h2 className="text-2xl font-bold">Login</h2>
        <div className="w-full rounded-md p-4 shadow-md sm:w-8/12 lg:w-10/12">
          <Login />
          <p className="mb-4 text-center">or</p>
          <SocialComponent />
          <div className="text-end">
            <Link className="text-sm text-blue-600 underline" to="/signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
