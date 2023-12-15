import { redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

function getAuthToken() {
  const cookies = new Cookies()
  return cookies.get('access_token')
}

function authGuard() {
  const token = getAuthToken()
  if (!token) return redirect('/login')
  return true
}

function unAuthGuard() {
  const token = getAuthToken()
  if (token) return redirect('/')
  return true
}

export { getAuthToken, authGuard, unAuthGuard }
