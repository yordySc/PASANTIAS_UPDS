import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award, ChevronLeft, Sparkles } from 'lucide-react'
import type { SuccessStory } from '../../types'

interface SuccessStoriesProps {
  stories: SuccessStory[]
}

function SuccessStories({ stories }: SuccessStoriesProps) {
  return (
    <main className="mx-auto max-w-7xl px-5 py-6 sm:px-6 sm:py-12">
      <Link to="/student" className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-semibold text-[#0075a1] transition-colors hover:text-[#008ec4] active:scale-95">
        <ChevronLeft size={18} /> Volver al Directorio
      </Link>

      <section className="relative overflow-hidden rounded-[32px] border border-[#008ec4]/35 bg-[#06334a] px-6 py-10 text-white shadow-[0_24px_70px_-28px_rgba(6,51,74,0.8)] sm:px-10 sm:py-14">
        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full border border-[#008ec4]/25 sm:h-72 sm:w-72" />
        <div className="absolute bottom-0 right-12 h-36 w-px bg-[#008ec4]/35" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">Historias de éxito</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-blue-50/80 sm:text-lg sm:leading-8">
            Estas experiencias muestran cómo una pasantía puede abrir puertas reales hacia el mundo profesional.
          </p>
        </div>
      </section>

      {stories.length ? (
        <section className="relative mt-14 sm:mt-20" aria-label="Historias de éxito">
          <div className="absolute bottom-5 left-6 top-5 w-px bg-[#008ec4]/20 sm:left-14" />
          <div className="absolute left-6 top-0 h-24 w-px bg-gradient-to-b from-[#008ec4] to-transparent sm:left-14" />
          {stories.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.99 }}
              className="group relative grid grid-cols-[3rem_minmax(0,1fr)] gap-5 py-8 first:pt-0 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-10 sm:py-12"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#008ec4]/35 bg-slate-50 text-[#008ec4] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#008ec4] group-hover:text-white group-active:bg-[#008ec4] group-active:text-white sm:h-28 sm:w-28 sm:bg-white">
                <Award size={20} className="sm:h-10 sm:w-10" />
              </div>
              <div className="border-b border-slate-200 pb-8 sm:pb-12">
                <div className="flex items-center gap-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#008ec4]">Caso de éxito</p>
                  <span className="h-px w-8 bg-[#008ec4]/35" />
                </div>
                <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-[#008ec4] sm:text-4xl">{story.title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{story.description}</p>
                <div className="mt-7 grid max-w-2xl grid-cols-2 border-t border-[#008ec4]/15 pt-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Empresa / institución</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">{story.institution}</p>
                  </div>
                  <div className="border-l border-[#008ec4]/15 pl-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Resultado</p>
                    <p className="mt-1 text-sm font-bold text-[#008ec4]">{story.highlight}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </section>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-14 border-l-2 border-[#008ec4] py-3 pl-6 sm:mt-20"
        >
          <div className="flex items-center gap-3 text-[#008ec4]">
            <Sparkles size={24} />
            <h2 className="text-2xl font-semibold text-slate-900">Próximamente</h2>
          </div>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            El administrador podrá cargar testimonios y ellos aparecerán aquí para inspirar a nuevos estudiantes.
          </p>
        </motion.section>
      )}

      <footer className="mt-16 border-t border-slate-200 py-8 text-center text-xs text-slate-500 sm:mt-20">
        © 2026 Universidad Privada Domingo Savio • Todos los derechos reservados.
      </footer>
    </main>
  )
}

export default SuccessStories
