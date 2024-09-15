import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'

const Settings: React.FC = () => {
  const [darkMode, setDarkmode] = useState<boolean>(
    document.documentElement.classList.contains('dark')
  )
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="w-full h-screen bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
      <div className="relative p-8 flex-col bg-zinc-400 dark:bg-zinc-900 rounded-md">
        <Link
          to="/"
          className="absolute left-4 top-4 text-zinc-700 dark:text-zinc-500 hover:text-zinc-100 dark:hover:text-zinc-100 transition"
        >
          <ArrowLeft />
        </Link>
        <div className="py-4 flex-col flex gap-2">
          <div className="flex items-center gap-2 font-bold dark:text-zinc-200 text-zinc-800">
            <span className="">Tema Escuro: </span>
            <Switch
              checked={darkMode}
              onChange={setDarkmode}
              className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-zinc-600 dark:bg-white/10 p-1 transition-colors duration-200 ease-in-out data-[checked]:bg-white/10"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-zinc-100 dark:bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
