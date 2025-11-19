import { useState, useEffect } from 'react'
import { RefreshCw, Copy, Check, Shuffle, Slider } from 'lucide-react'

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generatePassword({ length, upper, lower, numbers, symbols }) {
  const sets = []
  if (upper) sets.push('ABCDEFGHJKLMNPQRSTUVWXYZ')
  if (lower) sets.push('abcdefghijkmnopqrstuvwxyz')
  if (numbers) sets.push('23456789')
  if (symbols) sets.push('!@#$%^&*_-+=?')
  if (!sets.length) sets.push('abcdefghijkmnopqrstuvwxyz')
  const all = sets.join('')
  let out = ''
  for (let i = 0; i < length; i++) out += all[randomInt(0, all.length - 1)]
  return out
}

export default function Generator({ onUse }) {
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [pwd, setPwd] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setPwd(generatePassword({ length, upper, lower, numbers, symbols }))
  }, [length, upper, lower, numbers, symbols])

  const copy = async () => {
    await navigator.clipboard.writeText(pwd)
    setCopied(true)
    setTimeout(()=>setCopied(false), 1200)
  }

  return (
    <div className="rounded-xl bg-slate-800/60 border border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-blue-200 font-medium">Password generator</div>
        <button onClick={() => setPwd(generatePassword({ length, upper, lower, numbers, symbols }))} className="p-2 rounded-lg hover:bg-white/5 text-blue-200" title="Regenerate">
          <RefreshCw className="w-4 h-4"/>
        </button>
      </div>

      <div className="flex items-center gap-2 bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 mb-3">
        <code className="font-mono text-blue-50 text-sm break-all flex-1">{pwd}</code>
        <button onClick={copy} className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-200 hover:bg-blue-500/20 text-xs flex items-center gap-1">
          {copied ? <Check className="w-3.5 h-3.5"/> : <Copy className="w-3.5 h-3.5"/>}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button onClick={() => onUse?.(pwd)} className="px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs">Use</button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <label className="flex items-center justify-between gap-2">
          <span className="text-blue-200/80">Length</span>
          <input type="range" min="6" max="64" value={length} onChange={(e)=>setLength(Number(e.target.value))} className="w-40"/>
          <span className="w-8 text-right text-blue-100">{length}</span>
        </label>
        <label className="flex items-center justify-between gap-2">
          <span className="text-blue-200/80">Uppercase</span>
          <input type="checkbox" checked={upper} onChange={(e)=>setUpper(e.target.checked)} />
        </label>
        <label className="flex items-center justify-between gap-2">
          <span className="text-blue-200/80">Lowercase</span>
          <input type="checkbox" checked={lower} onChange={(e)=>setLower(e.target.checked)} />
        </label>
        <label className="flex items-center justify-between gap-2">
          <span className="text-blue-200/80">Numbers</span>
          <input type="checkbox" checked={numbers} onChange={(e)=>setNumbers(e.target.checked)} />
        </label>
        <label className="flex items-center justify-between gap-2">
          <span className="text-blue-200/80">Symbols</span>
          <input type="checkbox" checked={symbols} onChange={(e)=>setSymbols(e.target.checked)} />
        </label>
      </div>
    </div>
  )
}
