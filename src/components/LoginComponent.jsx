import InputText from '@/components/InputText'
import customFetch from '@/utils/customFetch'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2'

export default function () {
  const navigate = useNavigate()
  async function handleLogin(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')
    let jwtToken = null
    try {
      const result = await customFetch(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
        'POST',
      )
      jwtToken = result.token
    } catch (err) {
      return Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Try again',
      })
    }
    const { exp } = jwtDecode(jwtToken)
    const cookies = new Cookies()
    cookies.set('access_token', jwtToken, {
      expires: new Date(exp * 1000),
      domain: 'codewithyovan.tech',
    })

    navigate('/')
  }
  return (
    <form onSubmit={handleLogin} className="mb-4" noValidate>
      <div className="mb-3 flex flex-col gap-y-2">
        <label htmlFor="email">Email</label>
        <InputText name="email" id="email" type="email" />
      </div>
      <div className="mb-3 flex flex-col gap-y-2">
        <label htmlFor="password">Password</label>
        <InputText name="password" id="password" type="password" />
      </div>
      <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-900">
        Login
      </button>
    </form>
  )
}
