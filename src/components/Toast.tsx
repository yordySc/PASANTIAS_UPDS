import React from 'react'

export default function Toast({ message, kind = 'info' }: { message: string; kind?: 'info' | 'success' | 'error' }) {
  if (!message) return null
  const bg = kind === 'success' ? 'bg-emerald-600' : kind === 'error' ? 'bg-red-600' : 'bg-sky-600'
  return (
    <div className={`fixed right-6 top-6 z-50 rounded-lg px-4 py-2 text-sm font-medium text-white ${bg} shadow-lg`} role="status">
      {message}
    </div>
  )
}
