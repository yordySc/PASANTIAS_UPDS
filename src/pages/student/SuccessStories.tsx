import { Link } from 'react-router-dom'

const stories = [
  {
    name: 'María, estudiante de Ingeniería de Sistemas',
    institution: 'Clínica Santa Lucía',
    quote: 'Mi pasantía fue tan bien valorada que la clínica me ofreció quedarme trabajando como desarrolladora junior al terminar.',
    impact: 'Fue contratada al finalizar la pasantía.',
    result: 'Contratada como Desarrolladora Junior',
  },
  {
    name: 'Sofía, estudiante de Comunicación Social',
    institution: 'Radio Aclo',
    quote: 'Después de ver mis resultados, me propusieron quedarme como productora de contenidos. Hoy trabajo full-time mientras termino la carrera.',
    impact: 'Fue contratada por la misma empresa.',
    result: 'Contratada como Productora de Contenidos',
  },
  {
    name: 'Diego, estudiante de Derecho',
    institution: 'Consejo de la Magistratura',
    quote: 'La pasantía fue tan destacada que me ofrecieron continuar como asistente jurídico. Esta experiencia aceleró mi inserción laboral.',
    impact: 'Fue contratado al finalizar.',
    result: 'Contratado como Asistente Jurídico',
  },
]

function SuccessStories() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#223b87] via-[#10255c] to-[#0085fc] p-8 text-white shadow-[0_30px_90px_-25px_rgba(34,59,135,0.7)] lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.25),_transparent_35%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-100">Casos de Éxito</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              De pasantía a trabajo real
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-sky-100">
              Estas no son solo experiencias. Son historias de estudiantes que fueron contratados por las mismas empresas donde realizaron su pasantía.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/student" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#223b87] transition hover:-translate-y-0.5">
                Volver al inicio
              </Link>
              <span className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur">
                +3 historias de contratación
              </span>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-white/20 p-4">
                <p className="text-sm text-sky-100">Estudiantes contratados</p>
                <p className="mt-2 text-4xl font-semibold">100%</p>
              </div>
              <div className="rounded-2xl bg-white/20 p-4">
                <p className="text-sm text-sky-100">En la misma empresa</p>
                <p className="mt-2 text-4xl font-semibold">3</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {stories.map((story, index) => (
          <article 
            key={story.name} 
            className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_-30px_rgba(34,59,135,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_-25px_rgba(34,59,135,0.45)]"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">Contratado</span>
              <span className="text-3xl font-bold text-[#0085fc]">0{index + 1}</span>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-slate-900">{story.name}</h3>
            <p className="mt-1 text-sm font-medium text-[#223b87]">{story.institution}</p>

            <p className="mt-5 text-sm leading-7 text-slate-600 italic">
              “{story.quote}”
            </p>

            <div className="mt-6 rounded-2xl bg-emerald-50 p-5 border border-emerald-100">
              <p className="text-emerald-700 text-sm font-semibold flex items-center gap-2">
                <span className="text-lg">🎯</span> Resultado
              </p>
              <p className="mt-2 font-semibold text-emerald-800">{story.result}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-8 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Mensaje importante</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">
              Una buena pasantía puede convertirse en tu primer empleo.
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Muchas empresas de nuestra red terminan contratando a los estudiantes que demuestran compromiso, iniciativa y buenos resultados.
            </p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <ul className="space-y-3 text-sm leading-7 text-slate-600">
              <li>• Demuestra compromiso desde el primer día.</li>
              <li>• Propón mejoras y soluciones.</li>
              <li>• Construye una buena relación con tu supervisor.</li>
              <li>• Sé proactivo y responsable.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SuccessStories