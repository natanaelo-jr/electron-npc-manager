import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Home, Plus, Settings } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex transition">
      <div className="left-0 h-full w-fit px-2 flex-col gap-4 items-center justify-center dark:border-zinc-800 dark:bg-zinc-900 bg-zinc-300 border-zinc-400 border-r-[.5px] flex">
        <Link to="/">
          <div className="hover:text-violet-100 p-2 flex items-center justify-center rounded-md hover:bg-violet-500 duration-500 transition bg-zinc-700 text-zinc-300">
            <Home size={28} />
          </div>
        </Link>
        <Link to="/register">
          <div className="hover:text-violet-100 p-2 flex items-center justify-center rounded-md bg-zinc-700 text-zinc-300 hover:bg-violet-500 duration-500 transition">
            <Plus size={28} />
          </div>
        </Link>
        <Link to="/settings">
          <div className="hover:text-violet-100 p-2 flex items-center justify-center rounded-md bg-zinc-700 text-zinc-300 hover:bg-violet-500 duration-500 transition">
            <Settings size={28} />
          </div>
        </Link>
      </div>
      <div className="w-full bg-violet-100  dark:bg-zinc-950 h-full overflow-auto">{children}</div>
    </div>
  )
}

export default Layout
