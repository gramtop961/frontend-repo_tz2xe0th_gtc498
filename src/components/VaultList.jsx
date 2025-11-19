import { useMemo } from 'react'
import { Globe, User, Copy, Eye, EyeOff, Pencil, Trash2, Lock } from 'lucide-react'

export default function VaultList({ items, query, onEdit, onDelete, onCopy, revealId, onToggleReveal }) {
  const filtered = useMemo(() => {
    const q = (query || '').toLowerCase().trim()
    if (!q) return items
    return items.filter(i =>
      i.site.toLowerCase().includes(q) ||
      i.username.toLowerCase().includes(q)
    )
  }, [items, query])

  if (!items.length) {
    return (
      <div className="text-center py-24 text-blue-200/70">
        <Lock className="w-10 h-10 mx-auto mb-3 text-blue-300/60"/>
        <p className="font-medium">Your vault is empty</p>
        <p className="text-sm opacity-70">Use the Add button to store your first password</p>
      </div>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map(item => (
        <div key={item.id} className="group rounded-xl bg-slate-800/60 border border-white/10 p-4 hover:border-blue-500/30 transition-colors">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-400/10 border border-blue-400/20 grid place-content-center text-blue-300">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white truncate" title={item.site}>{item.site}</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-400/20">{item.category || 'login'}</span>
              </div>
              <div className="mt-0.5 text-sm text-blue-200/80 flex items-center gap-1 truncate" title={item.username}>
                <User className="w-3.5 h-3.5 opacity-70"/> {item.username}
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => onCopy(item.password)} className="p-1.5 rounded-md hover:bg-white/5 text-blue-200" title="Copy password">
                <Copy className="w-4 h-4"/>
              </button>
              <button onClick={() => onToggleReveal(item.id)} className="p-1.5 rounded-md hover:bg-white/5 text-blue-200" title="Reveal">
                {revealId === item.id ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
              </button>
              <button onClick={() => onEdit(item)} className="p-1.5 rounded-md hover:bg-white/5 text-blue-200" title="Edit">
                <Pencil className="w-4 h-4"/>
              </button>
              <button onClick={() => onDelete(item.id)} className="p-1.5 rounded-md hover:bg-white/5 text-rose-300" title="Delete">
                <Trash2 className="w-4 h-4"/>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm font-mono bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-blue-100 flex items-center justify-between">
              <span className="truncate select-none">
                {revealId === item.id ? item.password : '•'.repeat(Math.min(item.password.length, 12))}
              </span>
              <button onClick={() => onCopy(item.password)} className="text-xs text-blue-300/80 hover:text-blue-200">Copy</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
