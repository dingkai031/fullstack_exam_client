import customFetch from '@/utils/customFetch'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'

export async function userProfileLoader() {
  const apiUrl = import.meta.env.VITE_API_URL
  try {
    const cookies = new Cookies()
    const token = cookies.get('access_token')
    const { email: emailFromToken } = jwtDecode(token)
    const result = await customFetch(`${apiUrl}/user/${emailFromToken}`)
    const { full_name, email } = result.body
    return { full_name, email }
  } catch (e) {
    // throw new Error(e.message)
    return { message: e.message, status: e.status }
  }
}
