import { Outlet } from 'react-router-dom'
import HeaderComponent from '@/components/HeaderComponent'

export default () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <HeaderComponent />
        <main className=" flex-1 bg-slate-200 py-3">
          <div className="container mx-auto px-4">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}
