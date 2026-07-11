import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/admin/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-[30px] bg-white p-8 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0085fc]">Acceso administrador</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Ingresar al panel</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          En esta primera fase el ingreso es una simulación para visualizar el flujo de gestión de prácticas.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Correo</label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-0 focus:border-[#0085fc]"
              placeholder="encargada@upds.edu"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-0 focus:border-[#0085fc]"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full rounded-full bg-[#223b87] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1a2f6d]">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
