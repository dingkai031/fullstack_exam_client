import customFetch from '@/utils/customFetch'
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

import { GoogleLogin } from '@react-oauth/google'
import FacebookLogin from '@greatsumini/react-facebook-login'
import { FaFacebookSquare } from 'react-icons/fa'

import Cookies from 'universal-cookie'

export default () => {
  async function handleGoogleLogin(credentialResponse) {
    const jwtResult = jwtDecode(credentialResponse.credential)
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
          type: 'google',
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
  async function handleFacebookLogin(response) {
    const { name: full_name, email } = response
    let result = null
    try {
      result = await customFetch(
        `${import.meta.env.VITE_API_URL}/login-oauth`,
        {
          email,
          full_name,
          type: 'facebook',
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
        title: 'Facebook sign in failed',
        text: e.message,
        icon: 'error',
        confirmButtonText: 'Try again',
      })
    }
  }
  const navigate = useNavigate()
  return (
    <div className="mb-8 flex flex-col gap-4">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={(e) => {
          console.log(e)
          console.log('Login Failed')
        }}
        theme="filled_blue"
        logo_alignment="center"
        locale="en_US"
        size="large"
      />
      <FacebookLogin
        className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-900"
        appId={import.meta.env.VITE_FACEBOOK_APP_ID}
        onSuccess={(response) => {
          console.log('Login Success!', response)
        }}
        onFail={(error) => {
          console.log('Login Failed!', error)
        }}
        onProfileSuccess={(response) => {
          if (import.meta.env.DEV) {
            handleFacebookLogin(response)
          } else {
            return Swal.fire({
              text: "For now, facebook auth from production mode can't be used for unknown reascon. But it works out in development mode",
              icon: 'error',
              confirmButtonText: 'Continue',
            })
          }
        }}
      >
        <FaFacebookSquare className="mr-2 text-2xl" />
        Login with Facebook
      </FacebookLogin>
    </div>
  )
}
