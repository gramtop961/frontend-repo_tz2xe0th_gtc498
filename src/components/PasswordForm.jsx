import { useEffect, useState } from 'react'
import { X, Globe, User, Lock, Tag } from 'lucide-react'

export default function PasswordForm({ open, initial, onClose, onSave }) {
  const [site, setSite] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [category, setCategory] = useState('login')

  useEffect(() => {
    if (open) {
      setSite(initial?.site || '')
      setUsername(initial?.username || '')
      setPassword(initial?.password || '')
      setCategory(initial?.category || 'login')
    }
  }, [open, initial])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!site || !username || !password) return
    onSave({ id: initial?.id, site, username, password, category })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur" onClick={onClose} />

      <div className="relative w-full sm:max-w-md bg-slate-900 border border-white/10 rounded-t-2xl sm:rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">{initial ? 'Edit entry' : 'Add new entry'}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-blue-200" aria-label="Close">
            <X className="w-5 h-5"/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm text-blue-200/80">Site</span>
            <div className="flex items-center gap-2 bg-slate-800/60 border border-white/10 rounded-lg px-3">
              <Globe className="w-4 h-4 text-blue-300/70"/>
              <input value={site} onChange={(e)=>setSite(e.target.value)} placeholder="e.g. twitter.com" className="flex-1 bg-transparent py-2.5 outline-none text-blue-50 placeholder:text-blue-200/40"/>
            </div>
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-blue-200/80">Username</span>
            <div className="flex items-center gap-2 bg-slate-800/60 border border-white/10 rounded-lg px-3">
              <User className="w-4 h-4 text-blue-300/70"/>
              <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="name@email.com" className="flex-1 bg-transparent py-2.5 outline-none text-blue-50 placeholder:text-blue-200/40"/>
            </div>
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-blue-200/80">Password</span>
            <div className="flex items-center gap-2 bg-slate-800/60 border border-white/10 rounded-lg px-3">
              <Lock className="w-4 h-4 text-blue-300/70"/>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" className="flex-1 bg-transparent py-2.5 outline-none text-blue-50 placeholder:text-blue-200/40"/>
            </div>
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-blue-200/80">Category</span>
            <div className="flex items-center gap-2 bg-slate-800/60 border border-white/10 rounded-lg px-3">
              <Tag className="w-4 h-4 text-blue-300/70"/>
              <select value={category} onChange={(e)=>setCategory(e.target.value)} className="flex-1 bg-transparent py-2.5 outline-none text-blue-50">
                <option className="bg-slate-900" value="login">Login</option>
                <option className="bg-slate-900" value="banking">Banking</option>
                <option className="bg-slate-900" value="social">Social</option>
                <option className="bg-slate-900" value="work">Work</option>
              </select>
            </div>
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded-lg bg-white/5 text-blue-100 hover:bg-white/10">Cancel</button>
            <button type="submit" className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
