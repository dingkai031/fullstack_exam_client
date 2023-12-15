import InputText from './InputText'
import customFetch from '../utils/customFetch'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'

export default function () {
  async function handleSignup(e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    const full_name = formData.get('full_name')
    const email = formData.get('email')
    const password = formData.get('password')

    console.log(full_name)
    console.log(email)
    console.log(password)
  }
  return (
    <form onSubmit={handleSignup} className="mb-4" noValidate>
      <div className="mb-3 flex flex-col gap-y-2">
        <label htmlFor="full_name">Full name</label>
        <InputText name="full_name" id="full_name" type="text" />
      </div>
      <div className="mb-3 flex flex-col gap-y-2">
        <label htmlFor="email">Email</label>
        <InputText name="email" id="email" type="email" />
      </div>
      <div className="mb-3 flex flex-col gap-y-2">
        <label htmlFor="password">Password</label>
        <InputText name="password" id="password" type="password" />
      </div>
      <div className="mb-3 flex flex-col gap-y-2">
        <label htmlFor="re-password">Retype password</label>
        <InputText name="re-password" id="re-password" type="password" />
      </div>
      <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-900">
        Submit
      </button>
    </form>
  )
}
