import { Link, useLocation } from 'react-router-dom'
import customFetch from '@/utils/customFetch'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default () => {
  const [isSending, setIsSending] = useState(false)
  const { state } = useLocation()
  const { email } = state

  async function handleResendEmail(e) {
    setIsSending(true)
    try {
      const result = await customFetch(
        `${import.meta.env.VITE_API_URL}/user/resend-email`,
        { email },
        'POST',
      )
      Swal.fire({
        text: 'A verification email is send',
        icon: 'success',
        confirmButtonText: 'Continue',
      })
    } catch (error) {
      Swal.fire({
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Continue',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center bg-slate-200">
      <div className="container mx-auto p-4">
        <div className="mx-auto flex max-w-2xl flex-col gap-y-4 rounded-md bg-white p-4 shadow-md">
          <h1 className="text-center text-xl font-semibold capitalize">
            Your email is not verified yet
          </h1>

          <button
            onClick={handleResendEmail}
            disabled={isSending}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-900 disabled:pointer-events-none disabled:bg-slate-100 disabled:text-gray-500"
          >
            Resend email verification
          </button>
          <Link
            to="/login"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-center text-white transition-colors duration-300 hover:bg-blue-900"
          >
            Back to login page
          </Link>
        </div>
      </div>
    </div>
  )
}
