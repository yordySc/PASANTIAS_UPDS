import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award, ChevronLeft, Sparkles } from 'lucide-react'
import type { SuccessStory } from '../../types'

interface SuccessStoriesProps {
  stories: SuccessStory[]
}

function SuccessStories({ stories }: SuccessStoriesProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-16">
      <section className="relative overflow-hidden rounded-[32px] bg-slate-900 p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10"><Award size={200} /></div>
        <div className="relative z-10 max-w-3xl">
          <Link to="/student" className="inline-flex items-center text-blue-400 hover:text-white mb-6 transition">
            <ChevronLeft size={20} /> Volver al Directorio
          </Link>
          <h2 className="text-5xl font-extrabold tracking-tighter mb-6">Historias de éxito</h2>
          <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
            Estas experiencias muestran cómo una pasantía puede abrir puertas reales hacia el mundo profesional.
          </p>
        </div>
      </section>

      {stories.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {stories.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-[#223b87]">
                {story.highlight}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{story.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{story.description}</p>
              <p className="mt-5 text-sm font-semibold text-slate-700">{story.institution}</p>
            </motion.article>
          ))}
        </div>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm"
        >
          <div className="flex items-center gap-3 text-blue-600">
            <Sparkles size={24} />
            <h3 className="text-2xl font-semibold text-slate-900">Próximamente</h3>
          </div>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            El administrador podrá cargar testimonios y ellos aparecerán aquí para inspirar a nuevos estudiantes.
          </p>
        </motion.section>
      )}
    </div>
  )
}

export default SuccessStories