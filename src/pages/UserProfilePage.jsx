import { useForm } from 'react-hook-form'
import { useLoaderData } from 'react-router-dom'
import customFetch from '@/utils/customFetch'
import { useRef } from 'react'
import Swal from 'sweetalert2'

export default () => {
  const userData = useLoaderData()
  const fetchedFull_name = useRef(userData.full_name)
  const fetchedEmail = useRef(userData.email)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm()
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword, isSubmitting: isSubmittingPassword },
    watch: watchPassword,
    reset: resetPassword,
  } = useForm()
  async function handleChangeFullname(e) {
    const { full_name } = e
    reset()
    const result = await customFetch(
      `${import.meta.env.VITE_API_URL}/user`,
      { full_name },
      'PATCH',
    )
    const { full_name: newFullName } = result.body
    fetchedFull_name.current = newFullName
    Swal.fire({
      text: 'Full name changed',
      icon: 'success',
      confirmButtonText: 'Continue',
    })
  }
  async function handleChangePassword(e) {
    const { 'old-password': oldPassword, password: newPassword } = e
    let result = null
    try {
      resetPassword()
      result = await customFetch(
        `${import.meta.env.VITE_API_URL}/user`,
        { 'old-password': oldPassword, password: newPassword },
        'PATCH',
      )
    } catch (error) {
      return Swal.fire({
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Try again',
      })
    }
    console.log(result)
    return Swal.fire({
      text: 'Password changed',
      icon: 'success',
      confirmButtonText: 'Continue',
    })
  }
  return (
    <div>
      <div className="mx-auto mb-4 max-w-2xl rounded-md bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 rounded-full bg-red-500"></div>
          <div className="text-right">
            <p className="text-xl font-semibold capitalize">
              {fetchedFull_name.current}
            </p>
            <p className="text-sm text-gray-400">{fetchedEmail.current}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-2xl rounded-md bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-right">
            <p className="text-xl font-semibold">Option</p>
          </div>
        </div>
        <hr className="my-4 h-px border-0 bg-gray-200 " />
        <form onSubmit={handleSubmit(handleChangeFullname)} noValidate>
          <div className="flex items-start gap-x-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder={fetchedFull_name.current}
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
                className={
                  errors.full_name
                    ? 'w-full bg-red-200 focus-visible:bg-red-300'
                    : 'w-full'
                }
              />
              {errors.full_name?.message && (
                <p className="text-sm text-red-600">
                  {errors.full_name.message}
                </p>
              )}
            </div>
            <button className="rounded bg-blue-500 px-3 py-2 font-medium text-white hover:bg-blue-800">
              Set Full Name
            </button>
          </div>
        </form>
        <hr className="my-4 h-px border-0 bg-gray-200 " />
        <form onSubmit={handleSubmitPassword(handleChangePassword)}>
          <div className="mb-3">
            <input
              type="password"
              className={
                errorsPassword['old-password']
                  ? 'w-full bg-red-200 focus-visible:bg-red-300'
                  : 'w-full'
              }
              placeholder="Old password"
              {...registerPassword('old-password', {
                required: 'Please insert your old password',
              })}
            />
            {errorsPassword['old-password']?.message && (
              <p className="text-sm text-red-600">
                {errorsPassword['old-password'].message}
              </p>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className={
                errorsPassword.password
                  ? 'w-full bg-red-200 focus-visible:bg-red-300'
                  : 'w-full'
              }
              placeholder="New password"
              {...registerPassword('password', {
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
            />
            {errorsPassword.password?.message && (
              <p className="text-sm text-red-600">
                {errorsPassword.password.message}
              </p>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="re-password"
              className={
                errorsPassword['re-password']
                  ? 'w-full bg-red-200 focus-visible:bg-red-300'
                  : 'w-full'
              }
              placeholder="Retype password"
              {...registerPassword('re-password', {
                required: 'Please retype your password',
                validate: {
                  passwordConfirmation: (v) =>
                    v === watchPassword('password') || "Password doesn't match",
                },
              })}
            />
            {errorsPassword['re-password']?.message && (
              <p className="text-sm text-red-600">
                {errorsPassword['re-password']?.message}
              </p>
            )}
          </div>
          <button className="rounded bg-blue-500 px-3 py-2 font-medium text-white hover:bg-blue-800">
            Set New Passowrd
          </button>
        </form>
      </div>
    </div>
  )
}
