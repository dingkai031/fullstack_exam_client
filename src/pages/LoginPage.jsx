import Login from '@/components/LoginComponent'
import customFetch from '@/utils/customFetch'
import { Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

import Cookies from 'universal-cookie'

import { FaSquareFacebook } from 'react-icons/fa6'

export default function () {
  async function handleGoogleLogin(credentialResponse) {
    const jwtResult = jwtDecode(credentialResponse.credential)
    console.log(credentialResponse)
    const { email, name } = jwtResult
    let result = null
    try {
      result = await customFetch(
        `${import.meta.env.VITE_API_URL}/login-oauth`,
        {
          email,
          full_name: name,
          clientId: credentialResponse.clientId,
          credential: credentialResponse.credential,
        },
        'POST',
      )
      const { exp } = jwtDecode(result.token)
      const cookies = new Cookies()
      cookies.set('access_token', result.token, {
        expires: new Date(exp * 1000),
        domain: import.meta.env.VITE_TOP_LEVEL_DOMAIN,
      })

      navigate('/')
    } catch (e) {
      return Swal.fire({
        title: 'Google sign in failed',
        text: e.message,
        icon: 'error',
        confirmButtonText: 'Try again',
      })
    }
  }
  const navigate = useNavigate()

  FB.getLoginStatus(function (response) {
    console.log(response)
  })
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
          <div className="mb-8 flex gap-4 max-lg:flex-col">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={(e) => {
                console.log(e)
                console.log('Login Failed')
              }}
            />
            <button className="flex w-full items-center justify-center gap-x-2 rounded-md px-4  py-2 text-xl shadow-md  transition-colors duration-300 hover:bg-slate-200">
              <FaSquareFacebook />
              Login with Facebook
            </button>
          </div>
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
