import { useForm } from 'react-hook-form'
import customFetch from '@/utils/customFetch'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function () {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm()
  async function handleSignup(e) {
    const { full_name, email, password } = e
    let result = null
    try {
      result = await customFetch(
        `${import.meta.env.VITE_API_URL}/user`,
        { full_name, email, password },
        'POST',
      )
      // console.log(result)
      const { isConfirmed, isDismissed } = await Swal.fire({
        text: 'A verification email is sent, you will be redirected back to login page',
        icon: 'success',
        confirmButtonText: 'Back to login',
      })
      if (isDismissed || isConfirmed) return navigate('/login')
    } catch (e) {
      return Swal.fire({
        text: e.message,
        icon: 'error',
        confirmButtonText: 'Try again',
      })
    }
  }
  return (
    <form className="mb-4" onSubmit={handleSubmit(handleSignup)} noValidate>
      <div className="mb-3 flex flex-col gap-y-2">
        <label htmlFor="full_name">Full name</label>
        <input
          {...register('full_name', {
            required: 'Please insert your full name',
            minLength: {
              value: 8,
              message: 'Please insert atleast 8 character',
            },
            maxLength: {
              value: 50,
              message: 'Please insert 50 character max',
            },
          })}
          id="full_name"
          type="text"
          className={errors.full_name && 'bg-red-200 focus-visible:bg-red-300'}
        />
        {errors.full_name?.message && (
          <p className="text-sm text-red-600">{errors.full_name.message}</p>
        )}
      </div>
      <div className="mb-3 flex flex-col gap-y-2">
        <label htmlFor="email">Email</label>
        <input
          {...register('email', {
            required: 'Please insert your email',
            maxLength: {
              value: 50,
              message: 'Please insert 50 character max',
            },
            validate: {
              matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                'Email address must be a valid address',
            },
          })}
          id="email"
          type="email"
          className={errors.email && 'bg-red-200 focus-visible:bg-red-300'}
        />
        {errors.email?.message && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-3 flex flex-col gap-y-2">
        <label htmlFor="password">Password</label>
        <input
          {...register('password', {
            required: 'Please insert your password',
            minLength: {
              value: 8,
              message: 'Please insert atleast 8 character',
            },
            validate: {
              oneLowerChar: (v) =>
                /^(?=.*[a-z])/.test(v) ||
                'Password needs at least one lower character',
              oneUpperChar: (v) =>
                /^(?=.*[A-Z])/.test(v) ||
                'Password needs at least one upper character',
              oneDigitChar: (v) =>
                /^(?=.*[0-9])/.test(v) ||
                'Password needs at least one digit character',
              oneSpecialChar: (v) =>
                /^(?=.*[!@#$%^&*()_+{}|:"<>?])/.test(v) ||
                'Password needs at least one special character',
            },
          })}
          id="password"
          type="password"
          className={errors.password && 'bg-red-200 focus-visible:bg-red-300'}
        />
        {errors.password?.message && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div className="mb-3 flex flex-col gap-y-2">
        <label htmlFor="re-password">Retype password</label>
        <input
          {...register('re-password', {
            required: 'Please retype your password',
            validate: {
              passwordConfirmation: (v) =>
                v === watch('password') || "Password doesn't match",
            },
          })}
          id="re-password"
          type="password"
          className={
            errors['re-password'] && 'bg-red-200 focus-visible:bg-red-300'
          }
        />
        {errors['re-password']?.message && (
          <p className="text-sm text-red-600">
            {errors['re-password']?.message}
          </p>
        )}
      </div>
      <button
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-900 disabled:pointer-events-none disabled:bg-slate-100 disabled:text-gray-500"
      >
        Submit
      </button>
    </form>
  )
}
