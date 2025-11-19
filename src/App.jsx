import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import VaultList from './components/VaultList'
import PasswordForm from './components/PasswordForm'
import Generator from './components/Generator'

const demoData = [
  { id: '1', site: 'twitter.com', username: 'alex@example.com', password: 'Super$ecret!2024', category: 'social' },
  { id: '2', site: 'gmail.com', username: 'me@gmail.com', password: 'MailBox#9988', category: 'work' },
  { id: '3', site: 'bank.example', username: 'alex', password: 'B@nking-Strong-123', category: 'banking' },
]

export default function App() {
  const [items, setItems] = useState(demoData)
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [revealId, setRevealId] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('vault-items')
    if (saved) {
      try { setItems(JSON.parse(saved)) } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('vault-items', JSON.stringify(items))
  }, [items])

  const onAdd = () => { setEditItem(null); setShowForm(true) }
  const onSearch = (q) => setQuery(q)

  const onSave = (data) => {
    if (data.id) {
      setItems(prev => prev.map(i => i.id === data.id ? data : i))
    } else {
      setItems(prev => [{ ...data, id: String(Date.now()) }, ...prev])
    }
    setShowForm(false)
  }

  const onDelete = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const onEdit = (item) => { setEditItem(item); setShowForm(true) }

  const onCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setToast('Copied to clipboard')
      setTimeout(() => setToast(null), 1200)
    } catch {}
  }

  const onToggleReveal = (id) => setRevealId(prev => prev === id ? null : id)

  const useGenerated = (pwd) => {
    setEditItem(prev => ({ ...(prev || {}), password: pwd }))
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-50">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.10),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(56,189,248,0.08),transparent_45%)]" />

      <Header onAdd={onAdd} onSearch={onSearch} />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Your vault</h2>
            <div className="text-sm text-blue-200/70">{items.length} items</div>
          </div>
          <VaultList
            items={items}
            query={query}
            onEdit={onEdit}
            onDelete={onDelete}
            onCopy={onCopy}
            revealId={revealId}
            onToggleReveal={onToggleReveal}
          />
        </section>

        <aside className="space-y-6">
          <Generator onUse={useGenerated} />

          <div className="rounded-xl bg-slate-800/60 border border-white/10 p-4">
            <div className="text-blue-200 font-medium mb-2">Tips</div>
            <ul className="text-sm text-blue-200/80 list-disc pl-5 space-y-1">
              <li>Use at least 12 characters</li>
              <li>Mix uppercase, lowercase, numbers</li>
              <li>Avoid using the same password across sites</li>
            </ul>
          </div>
        </aside>
      </main>

      {showForm && (
        <PasswordForm
          open={showForm}
          initial={editItem}
          onClose={() => setShowForm(false)}
          onSave={onSave}
        />
      )}

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="px-3 py-2 rounded-lg bg-slate-900/90 border border-white/10 text-blue-50 shadow">{toast}</div>
        </div>
      )}
    </div>
  )
}
