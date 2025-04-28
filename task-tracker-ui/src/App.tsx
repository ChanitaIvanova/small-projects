import './App.css'
import { Login } from './components/ui/login'
import { Navigation } from './components/ui/navigation'
import { Register } from './components/ui/register'
import { Routes, Route } from "react-router-dom"
import { RequireAuth } from './guards/auth-required'
function App() {

  return (
    <>
      <Navigation />
      <div className="bg-white dark:bg-zinc-900 text-black dark:text-white grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] lg:grid-cols-[0_2.5rem_minmax(0,1fr)_2.5rem] xl:grid-cols-[0_2.5rem_minmax(0,1fr)_2.5rem]">
        <div className="col-start-2 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10"></div>
        <div className="p-6 relative row-start-1 grid grid-cols-subgrid lg:col-start-3">
          <Routes>
            {/* <Route path="/" element={ <RequireAuth><Home /></RequireAuth>} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <div className="col-start-4 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10"></div>
      </div>
    </>
  )
}

export default App
