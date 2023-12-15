import { redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import customFetch from '@/utils/customFetch'

export async function dashboardLoader() {
  const apiUrl = import.meta.env.VITE_API_URL
  let allUserData = null
  try {
    allUserData = await customFetch(`${apiUrl}/user`)
  } catch (e) {
    console.log(e.message)
    throw new Error(e.message)
  }
  //   console.log(allUserData)
  return { allUserData }
}
