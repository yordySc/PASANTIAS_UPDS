import { useEffect, useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { session, isAdmin, loading, signIn } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && session && isAdmin) navigate('/admin/dashboard', { replace: true })
  }, [isAdmin, loading, navigate, session])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const success = await signIn(form.email, form.password)
    setSubmitting(false)
    if (!success) setError('Correo o contraseña incorrectos o no tienes permisos de administración.')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-[30px] bg-white p-8 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0085fc]">Acceso administrador</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Ingresar al panel</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">Use únicamente las credenciales asignadas a la administración de pasantías.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Correo</label>
            <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0085fc]" placeholder="encargada@upds.edu" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Contraseña</label>
            <input required type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0085fc]" placeholder="••••••••" />
          </div>
          {(error || location.state?.forbidden) && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error || 'Esta cuenta no tiene permisos de administración.'}</p>}
          <button disabled={submitting} type="submit" className="w-full rounded-full bg-[#223b87] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1a2f6d] disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? 'Verificando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
