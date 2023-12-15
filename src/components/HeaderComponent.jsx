import { NavLink } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import customFetch from '@/utils/customFetch'
export default function () {
  const cookies = new Cookies()
  const navigate = useNavigate()
  async function handleLogout() {
    const result = await customFetch(`${import.meta.env.VITE_API_URL}/logout`)
    cookies.remove('access_token')
    console.log(result)
    console.log(cookies.getAll())
    navigate('/login')
  }
  return (
    <header className="px-4 py-2 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold tracking-wide">
          User Dashboard
        </NavLink>
        <nav className="flex items-center gap-4">
          <NavLink to="/user-profile" className="hover:underline">
            User Profile
          </NavLink>
          <button
            className="rounded bg-red-500 px-2 py-1 font-medium text-white hover:bg-red-800"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}
