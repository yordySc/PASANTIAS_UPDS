import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award, Target, Briefcase, ChevronLeft } from 'lucide-react'

const stories = [
  {
    name: 'María, Ing. de Sistemas',
    institution: 'Clínica Santa Lucía',
    quote: 'Mi pasantía fue tan bien valorada que la clínica me ofreció quedarme como desarrolladora junior al terminar.',
    result: 'Desarrolladora Junior',
  },
  {
    name: 'Sofía, Comunicación Social',
    institution: 'Radio Aclo',
    quote: 'Hoy trabajo full-time produciendo contenidos mientras termino mi carrera, gracias a los resultados que entregué.',
    result: 'Productora de Contenidos',
  },
  {
    name: 'Diego, Derecho',
    institution: 'Consejo de la Magistratura',
    quote: 'La experiencia fue decisiva; me ofrecieron continuar como asistente jurídico inmediatamente tras finalizar.',
    result: 'Asistente Jurídico',
  },
]

function SuccessStories() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-16">
      
      {/* HEADER PREMIUM */}
      <section className="relative overflow-hidden rounded-[32px] bg-slate-900 p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10"><Award size={200} /></div>
        <div className="relative z-10 max-w-3xl">
          <Link to="/student" className="inline-flex items-center text-blue-400 hover:text-white mb-6 transition">
            <ChevronLeft size={20} /> Volver al Directorio
          </Link>
          <h2 className="text-5xl font-extrabold tracking-tighter mb-6">De pasantía a <span className="text-blue-400">empleo real</span></h2>
          <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
            Historias reales de estudiantes que demostraron su talento y fueron contratados por las empresas donde realizaron sus prácticas.
          </p>
        </div>
      </section>

      {/* GRID DE HISTORIAS */}
      <section className="grid gap-8 lg:grid-cols-3">
        {stories.map((story, index) => (
          <motion.article 
            key={story.name}
            whileHover={{ y: -8 }}
            className="group rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Briefcase size={24} /></div>
              <span className="text-4xl font-black text-slate-100 group-hover:text-blue-100 transition-colors">0{index + 1}</span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-1">{story.name}</h3>
            <p className="text-sm font-semibold text-blue-600 mb-6">{story.institution}</p>
            
            <p className="text-slate-600 italic leading-relaxed mb-6">“{story.quote}”</p>
            
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mt-auto">
              <p className="text-emerald-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2 mb-1">
                <Target size={14} /> Resultado obtenido
              </p>
              <p className="font-bold text-emerald-900">{story.result}</p>
            </div>
          </motion.article>
        ))}
      </section>

      {/* SECCIÓN DE CONSEJOS */}
      <section className="rounded-[32px] border border-blue-100 bg-white p-10 shadow-sm">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">¿Cómo lograrlo?</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Convertir una pasantía en un empleo no es suerte, es resultado de una actitud proactiva. Las empresas valoran a quienes proponen soluciones y demuestran compromiso genuino.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { t: "Compromiso", d: "Entrega más de lo esperado" },
              { t: "Iniciativa", d: "Propón nuevas soluciones" },
              { t: "Networking", d: "Conecta con tu equipo" },
              { t: "Responsabilidad", d: "Cumple con los plazos" }
            ].map((item, i) => (
              <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="font-bold text-slate-900 text-sm">{item.t}</p>
                <p className="text-xs text-slate-500">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SuccessStories