import { useState } from 'react'
import { Shield, Search, Plus, LockKeyhole } from 'lucide-react'

export default function Header({ onAdd, onSearch }) {
  const [q, setQ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(q)
  }

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="flex items-center gap-2 text-blue-400">
          <div className="p-2 rounded-xl bg-blue-500/10 ring-1 ring-inset ring-blue-400/20">
            <Shield className="w-5 h-5" />
          </div>
          <h1 className="font-semibold text-white tracking-tight flex items-center gap-2">
            Vault <span className="text-xs text-blue-300/70 font-normal inline-flex items-center gap-1"><LockKeyhole className="w-3 h-3"/> Password Manager</span>
          </h1>
        </div>

        <div className="ml-auto flex items-center gap-3 w-full sm:w-auto">
          <form onSubmit={handleSubmit} className="relative flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-blue-300/70 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                onSearch(e.target.value)
              }}
              placeholder="Search sites, usernames..."
              className="w-full sm:w-[320px] pl-9 pr-3 py-2 rounded-lg bg-slate-800/80 text-blue-50 placeholder:text-blue-200/40 border border-white/10 focus:outline-none focus:ring-2 ring-blue-500/40"
            />
          </form>

          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow shadow-blue-500/20"
          >
            <Plus className="w-4 h-4"/>
            Add
          </button>
        </div>
      </div>
    </header>
  )
}
