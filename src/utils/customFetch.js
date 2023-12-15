export default async function (url, body = {}, method = 'GET') {
  const fetchOption = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  if (Object.keys(body).length > 0) fetchOption.body = JSON.stringify(body)
  const response = await fetch(url, fetchOption)
  const result = await response.json()
  if (!response.ok) throw new Error(result.message)
  return result
}
