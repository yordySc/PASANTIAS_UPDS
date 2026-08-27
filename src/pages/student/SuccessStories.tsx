import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { SuccessStory } from '../../types'
import logoUPDS from '../../assets/logo-upds.png'

interface SuccessStoriesProps {
  stories: SuccessStory[]
}

function SuccessStories({ stories }: SuccessStoriesProps) {
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({})
  function VideoPlayer({ story }: { story: SuccessStory }) {
    const [src, setSrc] = useState<string | null>(null)
    useEffect(() => {
      let mounted = true
      const init = async () => {
        if (!story.videoUrl) return
        if (mounted) setSrc(story.videoUrl)
      }
      void init()
      return () => { mounted = false }
    }, [story.videoUrl])

    if (!src) return <div className="h-[180px] w-full animate-pulse rounded-2xl bg-slate-800" />
    return (
      <video controls preload="metadata" crossOrigin="anonymous" className="block aspect-video w-full" src={src} onError={() => setFailedVideos((s) => ({ ...s, [story.id]: true }))}>
        Tu navegador no admite la reproducción de video.
      </video>
    )
  }
  return (
    <>
      <main className="mx-auto max-w-7xl px-5 py-6 sm:px-6 sm:py-12">
        <Link to="/student" className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#2967CD]/25 bg-white/90 px-4 text-sm font-bold text-[#003366] shadow-sm transition hover:border-[#22d3ee] hover:bg-white hover:text-[#2967CD] active:scale-95">
          <ChevronLeft size={18} /> Volver al Directorio
        </Link>

        <section className="relative overflow-hidden border border-[#2967CD]/35 bg-[#003366] px-6 py-10 text-white shadow-[0_24px_70px_-28px_rgba(6,51,74,0.8)] sm:px-10 sm:py-14">
          <img src={logoUPDS} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-3 right-4 h-36 w-auto max-w-[9rem] object-contain opacity-30 sm:right-8 sm:h-44 sm:max-w-[11rem] lg:h-56 lg:max-w-[14rem]" />
          <div className="relative z-10 max-w-3xl">
            <p className="mb-5 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-200">Prácticas Profesionales UPDS · Experiencias reales</p>
            <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">Testimonios</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-blue-50/80 sm:text-lg sm:leading-8">
              Estas experiencias muestran cómo las Prácticas Profesionales pueden abrir puertas reales hacia el mundo profesional.
            </p>
          </div>
        </section>

        {stories.length ? (
          <section className="relative mt-14 sm:mt-20" aria-label="Testimonios">
            <div className="absolute bottom-5 left-6 top-5 w-px bg-[#2967CD]/20 sm:left-14" />
            <div className="absolute left-6 top-0 h-24 w-px bg-gradient-to-b from-[#2967CD] to-transparent sm:left-14" />
            <div className="relative grid gap-5 md:grid-cols-2">
            {stories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.45 }}
                whileHover={{ y: -7 }}
                whileTap={{ scale: 0.99 }}
                className="group relative isolate overflow-hidden border border-[#cfe8ff] bg-[#f3f8ff] p-6 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.5)] transition-all duration-300 hover:border-[#2967CD]/45 hover:shadow-[0_24px_48px_-28px_rgba(0,142,196,0.32)] sm:p-8"
                >
                {story.backgroundUrl && (
                  <div className="relative -mx-6 -mt-6 mb-6 flex h-52 items-center justify-center overflow-hidden border-b border-[#2967CD]/20 bg-gradient-to-br from-[#e9f4ff] via-white to-[#dbeeff] p-3 sm:-mx-8 sm:-mt-8 sm:h-64 sm:p-5">
                    <img src={story.backgroundUrl} alt="Imagen del testimonio" className="h-full w-full object-contain object-center transition duration-700 group-hover:scale-[1.02]" />
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 border border-white/50" />
                  </div>
                )}
                <div className="relative z-10 mb-8 flex items-center justify-between">
                  <span className="flex h-11 min-w-11 items-center justify-center bg-[#003366] px-3 text-xs font-black tracking-[0.14em] text-white [clip-path:polygon(0_0,100%_0,82%_100%,0_100%)]">UPDS</span>
                  <span className="border-b border-[#2967CD]/35 pb-1 text-[10px] font-black tracking-[0.22em] text-[#2967CD]">0{index + 1}</span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2967CD]">Testimonio</p>
                    <span className="h-px w-8 bg-[#2967CD]/35" />
                  </div>
                  <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-[#003366] transition-colors duration-300 group-hover:text-[#2967CD] sm:text-4xl">{story.title}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{story.description}</p>
                  {story.videoUrl && (
                    <div className="mt-6 overflow-hidden rounded-2xl border border-[#2967CD]/20 bg-slate-950">
                      {!failedVideos[story.id] ? (
                        <VideoPlayer story={story} />
                      ) : (
                        <div className="p-4 text-sm text-slate-200">
                          No se pudo cargar el video públicamente. <a className="font-semibold text-[#2967CD]" href={story.videoUrl} target="_blank" rel="noreferrer">Abrir en nueva pestaña</a>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="mt-7 grid grid-cols-2 border-t border-[#2967CD]/15 pt-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Empresa / institución</p>
                      <p className="mt-1 text-sm font-bold text-slate-800">{story.institution}</p>
                    </div>
                    <div className="border-l border-[#2967CD]/15 pl-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Resultado</p>
                      <p className="mt-1 text-sm font-bold text-[#2967CD]">{story.highlight}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
            </div>
          </section>
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-14 border-l-2 border-[#2967CD] py-3 pl-6 sm:mt-20"
          >
            <div className="flex items-center gap-3 text-[#2967CD]">
              <span className="h-3 w-12 bg-[#2967CD] [clip-path:polygon(0_0,100%_0,82%_100%,0_100%)]" />
              <h2 className="text-2xl font-semibold text-[#003366]">Próximamente</h2>
            </div>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              El administrador podrá cargar testimonios y ellos aparecerán aquí para inspirar a nuevos estudiantes.
            </p>
          </motion.section>
        )}
      </main>
    </>
  )
}

export default SuccessStories
