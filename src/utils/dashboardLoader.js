import { redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import customFetch from '@/utils/customFetch'

export async function dashboardLoader() {
  const apiUrl = import.meta.env.VITE_API_URL
  const allUserData = await customFetch(`${apiUrl}/user`)
  //   console.log(allUserData)
  return { allUserData }
}
