import customFetch from '@/utils/customFetch'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'

export async function verifyEmailLoader({ params }) {
  // `${process.env.BASE_URL}/user/verify-email/${emailVerifId}`,
  const { emailVerifyId } = params
  const apiUrl = import.meta.env.VITE_API_URL
  let verifyStatus = null
  try {
    const cookies = new Cookies()
    verifyStatus = await customFetch(
      `${apiUrl}/user/verify-email/${emailVerifyId}`,
    )
    const { exp } = jwtDecode(verifyStatus.token)
    cookies.set('access_token', verifyStatus.token, {
      expires: new Date(exp * 1000),
      domain: import.meta.env.VITE_TOP_LEVEL_DOMAIN,
      path: '/',
    })
    return { message: verifyStatus.message, status: verifyStatus.status }
    // return { message: 'yeay', status: 'success', token: 'asddsa' }
  } catch (e) {
    // throw new Error(e.message)
    return { message: e.message, status: e.status }
  }
  //   console.log(allUserData)
  //   console.log(verifyStatus)
}
