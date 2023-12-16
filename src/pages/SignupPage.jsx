import Signup from '@/components/SignupComponent'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'

export default function () {
  const cookies = new Cookies()
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-slate-400 max-lg:hidden lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1702397889929-343042fd9fb6?q=80&w=725&auto=format&fit=crop"
          className="h-full w-full object-cover object-center"
          alt=""
        />
      </div>
      <div className=" flex flex-1 flex-col items-center justify-center border-l-orange-500 p-4 lg:w-1/2">
        <h2 className="text-2xl font-bold">Signup</h2>
        <div className="w-full rounded-md p-4 shadow-md sm:w-8/12 lg:w-10/12">
          <Signup />
          <p className="mb-4 text-center">or</p>
          <div className="mb-8 flex gap-x-4">
            <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-900">
              google
            </button>
            <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-900">
              facebook
            </button>
          </div>
          <div className="text-end">
            <Link className="text-sm text-blue-600 underline" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
