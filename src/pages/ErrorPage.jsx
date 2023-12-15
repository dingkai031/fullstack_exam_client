import ErrorSvg from '@/assets/illusration/error-page.svg'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className=" flex min-h-screen items-center justify-start">
      <div className="container mx-auto flex flex-col items-center gap-y-4">
        <img src={ErrorSvg} alt="" className=" max-w-xs" />
        <p className="text-4xl">
          You seems lost?{' '}
          <Link to="/" className="text-blue-600 underline">
            Back to home
          </Link>
          <p>{import.meta.env.VITE_TOP_LEVEL_DOMAIN}</p>
        </p>
      </div>
    </div>
  )
}
