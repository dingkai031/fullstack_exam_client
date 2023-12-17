import { useLoaderData, Link } from 'react-router-dom'

export default () => {
  const { message, status } = useLoaderData()
  return (
    <div className="flex min-h-screen items-center bg-slate-200">
      <div className="container mx-auto p-4">
        <div className="mx-auto max-w-2xl rounded-md bg-white p-4 shadow-md">
          <h1 className="mb-4 text-center text-xl capitalize">{message}</h1>
          {status === 'success' && (
            <h1 className="mb-3 text-center text-lg">
              You will be automatically logged in
            </h1>
          )}
          {status === 'success' ? (
            <Link
              className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-white transition-colors duration-300 hover:bg-blue-900 disabled:pointer-events-none disabled:bg-slate-100 disabled:text-gray-500"
              to="/"
            >
              Back to dashboard
            </Link>
          ) : (
            <Link
              className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-white transition-colors duration-300 hover:bg-blue-900 disabled:pointer-events-none disabled:bg-slate-100 disabled:text-gray-500"
              to="/login"
            >
              Back to login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
