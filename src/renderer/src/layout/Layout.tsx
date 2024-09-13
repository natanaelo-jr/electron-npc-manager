import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Home, Plus } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex dark:bg-slate-800 bg-slate-100">
      <div className="left-0 h-full w-fit px-2 flex-col gap-4 items-center justify-center dark:bg-slate-900 border-r-[.5px] flex dark:border-slate-500">
        <Link to="/">
          <div className="p-2 flex items-center justify-center rounded-md bg-violet-800 text-zinc-300">
            <Home size={28} />
          </div>
        </Link>
        <Link to="/register">
          <div className="p-2 flex items-center justify-center rounded-md bg-violet-800 text-zinc-300">
            <Plus size={28} />
          </div>
        </Link>
      </div>
      <div className="w-full bg-slate-50 dark:bg-slate-800 h-full overflow-auto">{children}</div>
    </div>
  )
}

export default Layout
