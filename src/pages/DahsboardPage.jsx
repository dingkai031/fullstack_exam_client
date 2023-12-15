import customFetch from '@/utils/customFetch'
import { useLoaderData } from 'react-router-dom'

export default () => {
  const { allUserData } = useLoaderData()
  return (
    <>
      <p className="mb-3 text-2xl font-medium">User Statistic</p>
      <div className="mb-4 flex gap-2 md:gap-6">
        <div className="w-2/6 rounded-md bg-white p-4 text-center shadow-lg">
          <span className="mb-2 block text-2xl font-bold md:text-3xl">
            {allUserData.length}
          </span>
          <p className="max-md:text-sm">Total User Sign Up</p>
        </div>
        <div className="w-2/6 rounded-md bg-white p-4 text-center shadow-lg">
          <span className="mb-2 block text-2xl font-bold md:text-3xl">
            {
              [
                ...allUserData.filter(
                  (userData) =>
                    new Date(userData.last_login_date).toLocaleDateString() ===
                    new Date().toLocaleDateString(),
                ),
              ].length
            }
          </span>
          <p className="max-md:text-sm">Total Active Today</p>
        </div>
        <div className="w-2/6 rounded-md bg-white p-4 text-center shadow-lg">
          <span className="mb-2 block text-2xl font-bold md:text-3xl">
            {
              [
                ...allUserData.filter((userData) => {
                  const { last_login_date } = userData
                  const dataDate = new Date(last_login_date)
                  const currentDate = new Date()
                  const sevenDaysAgo = new Date(currentDate)
                  sevenDaysAgo.setDate(currentDate.getDate() - 7)

                  return dataDate >= sevenDaysAgo && dataDate <= currentDate
                }),
              ].length
            }
          </span>
          <p className="max-md:text-sm">Total Active in last 7 days</p>
        </div>
      </div>
      <p className="mb-3 text-2xl font-medium">User Database</p>
      <div className="relative overflow-x-auto rounded-md shadow-lg">
        <table className="w-full whitespace-nowrap text-left text-sm text-gray-500 rtl:text-right">
          <thead className=" bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Fullname
              </th>
              <th scope="col" className="px-6 py-3">
                Sign Up Date
              </th>
              <th scope="col" className="px-6 py-3">
                Total login
              </th>
              <th scope="col" className="px-6 py-3">
                Logout Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allUserData.length > 0 ? (
              allUserData.map((userData, index) => (
                <tr className="border-b bg-white" key={index}>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                  >
                    {userData.full_name}
                  </th>
                  <td className="px-6 py-4">
                    {new Date(userData.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{userData.total_login}</td>
                  <td className="px-6 py-4">
                    {typeof userData.last_logout_date !== 'null'
                      ? new Date(userData.last_logout_date).toLocaleString()
                      : "Haven't logout"}
                  </td>
                  <td className="px-6 py-4">Reset Password</td>
                </tr>
              ))
            ) : (
              <tr className="border-b bg-white">
                <th
                  scope="row"
                  colSpan="5"
                  className="whitespace-nowrap px-6 py-4 text-center font-medium text-gray-900"
                >
                  No Data
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
