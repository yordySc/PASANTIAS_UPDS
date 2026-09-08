import { useEffect, useState, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { FileText, Link as LinkIcon, UploadCloud, Video, ImagePlus, GraduationCap, Building2, AlignLeft, type LucideIcon } from 'lucide-react'
import type { CompanyOffer, Career, SuccessStory } from '../../types'
import { getCareers, addCareer, deleteCareer, getSuccessStories, saveSuccessStory, deleteSuccessStory, uploadSuccessStoryVideo, uploadSuccessStoryBackground, updateSuccessStory } from '../../services/internships'
import { isSupabaseConfigured } from '../../lib/supabase'

interface DashboardProps {
  offers: CompanyOffer[]
  refreshSuccessStories: () => Promise<void>
}

function Dashboard({ offers, refreshSuccessStories }: DashboardProps) {
  const visibleOffers = offers.filter((offer) => offer.visible)
  const filledOffers = offers.filter((offer) => !offer.visible || offer.filled >= offer.vacancies)
  const openVacancies = offers.reduce((sum, offer) => sum + Math.max(offer.vacancies - offer.filled, 0), 0)
  const companiesCount = Array.from(new Set(offers.map((o) => o.companyId))).length

  const [careers, setCareers] = useState<Career[]>([])
  const [loadingCareers, setLoadingCareers] = useState(false)
  const [newCareer, setNewCareer] = useState('')
  const [message, setMessage] = useState('')

  const [stories, setStories] = useState<SuccessStory[]>([])
  const [storyDraft, setStoryDraft] = useState<Omit<SuccessStory, 'id'>>({ title: '', description: '', institution: '', highlight: '', accent: 'blue', videoUrl: '', backgroundUrl: '' })
  const [showResultField, setShowResultField] = useState(false)
  const [storyVideoFile, setStoryVideoFile] = useState<File | null>(null)
  const [storyBackgroundFile, setStoryBackgroundFile] = useState<File | null>(null)
  const [removeStoryVideo, setRemoveStoryVideo] = useState(false)
  const [removeStoryBackground, setRemoveStoryBackground] = useState(false)
  const [loadingStories, setLoadingStories] = useState(false)
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; kind?: 'info' | 'success' | 'error' } | null>(null)
  const [saving, setSaving] = useState(false)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const uploadTimerRef = useRef<number | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<{ open: boolean; title?: string; body?: string; onConfirm?: () => Promise<void> }>({ open: false })

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingCareers(true)
        setCareers(await getCareers())
      } catch {
        setCareers([])
      } finally {
        setLoadingCareers(false)
      }
      try {
        setLoadingStories(true)
        setStories(await getSuccessStories())
      } catch {
        setStories([])
      } finally {
        setLoadingStories(false)
      }
    }
    void load()
  }, [])

  const handleAddCareer = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addCareer(newCareer)
      setNewCareer('')
      setCareers(await getCareers())
      setToast({ message: 'Carrera agregada correctamente.', kind: 'success' })
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : 'No se pudo agregar la carrera.', kind: 'error' })
    }
  }

  const handleDeleteCareer = (id: string, name?: string) => {
    setConfirm({
      open: true,
      title: 'Eliminar carrera',
      body: `¿Eliminar la carrera "${name ?? ''}"? Esta acción no se puede deshacer.`,
      onConfirm: async () => {
        setConfirm({ open: false })
        try {
          await deleteCareer(id)
          setCareers((all) => all.filter((c) => c.id !== id))
          setToast({ message: 'Carrera eliminada correctamente.', kind: 'success' })
        } catch (err) {
          setToast({ message: err instanceof Error ? err.message : 'No se pudo eliminar la carrera.', kind: 'error' })
        }
      },
    })
  }

  useEffect(() => {
    if (storyVideoFile) {
      const url = URL.createObjectURL(storyVideoFile)
      setVideoPreviewUrl(url)
      return () => { URL.revokeObjectURL(url); setVideoPreviewUrl(null) }
    }
    setVideoPreviewUrl(null)
  }, [storyVideoFile])

  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault()
    // front validation: require title, description and institution
    if (!storyDraft.title.trim() || !storyDraft.description.trim() || !storyDraft.institution.trim()) {
      setToast({ message: 'Completa título, descripción y empresa/institución antes de guardar.', kind: 'error' })
      return
    }
    setSaving(true)
    try {
      let videoUrl = storyDraft.videoUrl
      let backgroundUrl = storyDraft.backgroundUrl
      if (removeStoryVideo) videoUrl = ''
      if (removeStoryBackground) backgroundUrl = ''
      if (storyVideoFile) {
        setIsUploading(true)
        setUploadProgress(3)
        setToast({ message: 'Subiendo video...', kind: 'info' })
        // fake progress animation while upload runs
        uploadTimerRef.current = window.setInterval(() => {
          setUploadProgress((p) => {
            if (p === null) return 3
            const next = Math.min(85, p + Math.floor(Math.random() * 8) + 1)
            return next
          })
        }, 400)
        try {
          const result = await uploadSuccessStoryVideo(storyVideoFile)
          // upload finished
          const publicUrl = result.publicUrl
          const path = result.path
          videoUrl = publicUrl
          setUploadProgress(100)
          setStoryDraft((d) => ({ ...d, videoUrl: publicUrl }))
          // try downloading via Supabase storage API to create a blob URL for preview (avoids CDN/CORS audio issues)
          try {
            const { data: downloaded, error: dlErr } = await supabase.storage.from('success-story-videos').download(path)
            if (!dlErr && downloaded) {
              const blob = await downloaded.arrayBuffer()
              const b = new Blob([blob], { type: storyVideoFile.type })
              const blobUrl = URL.createObjectURL(b)
              setVideoPreviewUrl(blobUrl)
            } else {
              setVideoPreviewUrl(publicUrl)
            }
          } catch (e) {
            setVideoPreviewUrl(publicUrl)
          }
          setToast({ message: 'Video subido correctamente.', kind: 'success' })
        } finally {
          if (uploadTimerRef.current) { clearInterval(uploadTimerRef.current); uploadTimerRef.current = null }
          setTimeout(() => setUploadProgress(null), 700)
          setIsUploading(false)
        }
      }
      if (storyBackgroundFile) {
        backgroundUrl = await uploadSuccessStoryBackground(storyBackgroundFile)
      }
      if (editingStoryId) {
        const updated = await updateSuccessStory(editingStoryId, { ...storyDraft, videoUrl, backgroundUrl })
        setStories((all) => all.map((s) => s.id === updated.id ? updated : s))
        setToast({ message: 'Testimonio actualizado correctamente.', kind: 'success' })
      } else {
        const created = await saveSuccessStory({ ...storyDraft, videoUrl, backgroundUrl })
        setStories((all) => [created, ...all])
        setToast({ message: 'Testimonio agregado correctamente.', kind: 'success' })
      }
      setStoryDraft({ title: '', description: '', institution: '', highlight: '', accent: 'blue', videoUrl: '', backgroundUrl: '' })
      setStoryVideoFile(null)
      setStoryBackgroundFile(null)
      setRemoveStoryVideo(false)
      setRemoveStoryBackground(false)
      setEditingStoryId(null)
      await refreshSuccessStories()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'No se pudo guardar el testimonio.'
      setToast({ message: msg, kind: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteStory = (id: string, title?: string) => {
    setConfirm({
      open: true,
      title: 'Eliminar testimonio',
      body: `¿Eliminar el caso "${title ?? ''}"? Esta acción no se puede deshacer.`,
      onConfirm: async () => {
        setConfirm({ open: false })
        setDeletingId(id)
        try {
          await deleteSuccessStory(id)
          setStories((all) => all.filter((s) => s.id !== id))
          await refreshSuccessStories()
          setToast({ message: 'Testimonio eliminado.', kind: 'success' })
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'No se pudo eliminar el testimonio.'
          console.error('deleteSuccessStory error', err)
          setToast({ message: msg, kind: 'error' })
        } finally {
          setDeletingId(null)
        }
      },
    })
  }

  const handleEditStory = (s: SuccessStory) => {
    setEditingStoryId(s.id)
    setStoryDraft({ title: s.title, description: s.description, institution: s.institution || '', highlight: s.highlight || '', accent: s.accent || 'blue', videoUrl: s.videoUrl || '', backgroundUrl: s.backgroundUrl || '' })
    setRemoveStoryVideo(false)
    setRemoveStoryBackground(false)
    setShowResultField(Boolean(s.highlight))
    // avoid forcing a page scroll when editing; user can see the form at top
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#003366] via-[#1457b8] to-[#0891b2] p-6 text-white shadow-[0_20px_45px_-24px_rgba(0,51,102,0.65)] sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">Resumen general</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Tu panel de prácticas</h2>
          <p className="max-w-2xl text-sm leading-7 text-blue-50">Consulta rápidamente empresas, oportunidades, cupos y carreras. Desde aquí puedes mantener la información lista para los estudiantes.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Empresas registradas</p>
          <p className="mt-3 text-3xl font-semibold text-[#003366]">{companiesCount}</p>
          <p className="mt-2 text-xs text-slate-500">Total de empresas con al menos una oferta registrada</p>
        </div>
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Ofertas activas</p>
          <p className="mt-3 text-3xl font-semibold text-[#003366]">{visibleOffers.length}</p>
          <p className="mt-2 text-xs text-slate-500">Ofertas visibles para estudiantes</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Cupos abiertos</p>
          <p className="mt-3 text-3xl font-semibold text-[#003366]">{openVacancies}</p>
          <p className="mt-2 text-xs text-slate-500">Suma de vacantes disponibles</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Solicitudes cerradas</p>
          <p className="mt-3 text-3xl font-semibold text-[#003366]">{filledOffers.length}</p>
          <p className="mt-2 text-xs text-slate-500">Ofertas ya completadas o no visibles</p>
        </div>
      </div>

      {message && <p className="rounded-[12px] border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">{message}</p>}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-[#003366]">Carreras disponibles</h3>
          <p className="mt-2 text-sm text-slate-600">Gestiona las carreras que aparecen en el filtro del home.</p>
          <form onSubmit={handleAddCareer} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start">
            <AdminField label="Nombre de la carrera" icon={GraduationCap} value={newCareer} onChange={setNewCareer} placeholder="Ej. Ingeniería de Sistemas" required />
            <button type="submit" className="min-h-12 rounded-full bg-[#003366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2967CD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2967CD]">Agregar</button>
          </form>
          <div className="mt-4 space-y-3">
            {loadingCareers ? <p className="text-sm text-slate-500">Cargando carreras…</p> : careers.map((career) => (
              <div key={career.id} className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-2">
                <span className="text-sm font-medium text-slate-700">{career.name}</span>
                <div className="flex gap-2">
                  <button onClick={() => { setNewCareer(career.name); }} title="Editar nombre" className="inline-flex items-center gap-2 rounded-md bg-[#2967CD] px-3 py-1 text-sm font-semibold text-white hover:opacity-95">Editar</button>
                  <button onClick={() => handleDeleteCareer(career.id)} className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:opacity-95">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-[#003366]">Testimonios</h3>
          <p className="mt-2 text-sm text-slate-600">Añade experiencias que se mostrarán en la página pública.</p>
          <form onSubmit={handleSaveStory} className="mt-4 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#003366] text-white"><FileText size={17} /></span><div><p className="text-sm font-semibold text-slate-800">Contenido del caso</p></div></div>
            <AdminField label="Título del testimonio" icon={FileText} value={storyDraft.title} onChange={(value) => setStoryDraft({ ...storyDraft, title: value })} placeholder="Ej. Mi primera experiencia profesional" required />
            <AdminField label="Empresa o institución" icon={Building2} value={storyDraft.institution} onChange={(value) => setStoryDraft({ ...storyDraft, institution: value })} placeholder="Dónde se realizó la pasantía" required />
            <div className="flex items-center gap-3">
              <input id="showResult" type="checkbox" checked={showResultField} onChange={(e) => setShowResultField(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#003366]" />
              <label htmlFor="showResult" className="text-sm text-slate-700">Agregar campo "Resultado" (opcional)</label>
            </div>
            {showResultField && (
              <AdminField label="Resultado (opcional)" icon={FileText} value={storyDraft.highlight} onChange={(value) => setStoryDraft({ ...storyDraft, highlight: value })} placeholder="Ej. Desarrollo profesional o contratación parcial" />
            )}
            <AdminField label="Descripción de la experiencia" icon={AlignLeft} value={storyDraft.description} onChange={(value) => setStoryDraft({ ...storyDraft, description: value })} placeholder="Cuenta brevemente qué aprendió o logró el estudiante." required textarea />
            <label className="flex cursor-pointer items-center gap-3 rounded-[14px] border border-dashed border-[#2967CD]/50 bg-[#f3f8ff] px-4 py-4 text-sm text-slate-700 transition hover:bg-[#e8f4ff]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2967CD] text-white"><UploadCloud size={19} /></span><span><span className="flex items-center gap-2 font-semibold text-slate-800"><Video size={16} /> Cargar video</span><span className="mt-1 block text-xs text-slate-600">MP4 o WebM. {storyVideoFile?.name || (isSupabaseConfigured ? 'Selecciona un archivo desde tu equipo.' : 'Requiere Supabase configurado para subir videos.')}</span></span>
              <input type="file" accept="video/*" onChange={(e) => { setStoryVideoFile(e.target.files?.[0] || null); setRemoveStoryVideo(false) }} className="sr-only" disabled={!isSupabaseConfigured} />
            </label>
            {editingStoryId && storyDraft.videoUrl && !removeStoryVideo && !storyVideoFile && (
              <div className="flex items-center justify-between gap-3 rounded-[14px] border border-sky-100 bg-white px-4 py-3 text-xs text-slate-600">
                <span className="truncate">Video actual guardado</span>
                <button type="button" onClick={() => setRemoveStoryVideo(true)} className="shrink-0 font-semibold text-red-600 hover:underline">Eliminar video</button>
              </div>
            )}
            <label className="flex cursor-pointer items-center gap-3 rounded-[14px] border border-dashed border-[#2967CD]/50 bg-[#f3f8ff] px-4 py-4 text-sm text-slate-700 transition hover:bg-[#e8f4ff]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#003366] text-white"><ImagePlus size={19} /></span><span><span className="flex items-center gap-2 font-semibold text-slate-800"><ImagePlus size={16} /> Cargar fondo</span><span className="mt-1 block text-xs text-slate-600">JPG, PNG o WEBP. {storyBackgroundFile?.name || (isSupabaseConfigured ? 'Imagen opcional para personalizar el testimonio.' : 'Requiere Supabase configurado para subir imágenes.')}</span></span>
              <input type="file" accept="image/*" onChange={(e) => { setStoryBackgroundFile(e.target.files?.[0] || null); setRemoveStoryBackground(false) }} className="sr-only" disabled={!isSupabaseConfigured} />
            </label>
            {editingStoryId && storyDraft.backgroundUrl && !removeStoryBackground && !storyBackgroundFile && (
              <div className="overflow-hidden rounded-[14px] border border-sky-100 bg-white">
                <div className="flex h-28 items-center justify-center bg-gradient-to-br from-[#e9f4ff] via-white to-[#dbeeff] p-2">
                  <img src={storyDraft.backgroundUrl} alt="Fondo actual del testimonio" className="h-full w-full object-contain" />
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-slate-600">
                  <span>Imagen de fondo actual</span>
                  <button type="button" onClick={() => setRemoveStoryBackground(true)} className="font-semibold text-red-600 hover:underline">Eliminar fondo</button>
                </div>
              </div>
            )}
            {videoPreviewUrl && (
              <div className="mt-2 overflow-hidden rounded-md border border-slate-200">
                <video controls preload="metadata" className="block aspect-video w-full" src={videoPreviewUrl}>
                  Tu navegador no soporta video.
                </video>
              </div>
            )}
            {isUploading && (
              <div className="mt-2">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div style={{ width: `${uploadProgress ?? 10}%` }} className="h-full rounded-full bg-[#2967CD] transition-all duration-300" />
                </div>
                <p className="mt-2 text-xs text-slate-600">Subiendo video… espera hasta que finalice antes de publicar.</p>
              </div>
            )}
            <div className="flex gap-3"><button type="submit" disabled={saving || isUploading} className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${saving || isUploading ? 'bg-slate-400' : 'bg-emerald-600'}`}>{editingStoryId ? 'Guardar cambios' : 'Agregar caso'}</button></div>
          </form>

          <div className="mt-4 space-y-3">
            {loadingStories ? <p className="text-sm text-slate-500">Cargando…</p> : stories.map((s) => (
              <div key={s.id} className="rounded-md border border-[#cfe8ff] bg-[#f9fbff] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#003366]">{s.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                    {s.videoUrl && <p className="mt-1 text-xs font-medium text-[#2967CD]">Video adjunto</p>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditStory(s)} className="inline-flex items-center gap-2 rounded-md bg-[#003366] px-3 py-1 text-sm font-semibold text-white hover:opacity-95">Editar</button>
                    <button onClick={() => handleDeleteStory(s.id)} className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:opacity-95">Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast && (
        <div>
          {/* lazy-load toast component to avoid circular deps */}
          <div className="fixed right-6 top-6 z-50">
            <div className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${toast.kind === 'success' ? 'bg-emerald-600' : toast.kind === 'error' ? 'bg-red-600' : 'bg-sky-600'}`}>{toast.message}</div>
          </div>
        </div>
      )}
      {confirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setConfirm({ open: false })} />
          <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-[#003366]">{confirm.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{confirm.body}</p>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setConfirm({ open: false })} className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Cancelar</button>
              <button onClick={async () => { if (confirm.onConfirm) await confirm.onConfirm(); }} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AdminField({ label, icon: Icon, value, onChange, placeholder, required = false, textarea = false }: { label: string; icon: LucideIcon; value: string; onChange: (value: string) => void; placeholder: string; required?: boolean; textarea?: boolean }) {
  const [touched, setTouched] = useState(false)
  const error = required && !value.trim() ? `Completa ${label.toLowerCase()} para continuar.` : ''
  const className = `w-full rounded-xl border bg-[#f3f8ff] py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2967CD] focus:bg-white focus:ring-4 focus:ring-[#2967CD]/15 ${touched && error ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-100' : 'border-[#cfe8ff] hover:border-sky-300'}`
  const update = (nextValue: string) => { setTouched(true); onChange(nextValue) }

  return <label className="block"><span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><Icon size={16} className="text-[#2967CD]" />{label}{required && <span className="text-red-500" aria-label="Obligatorio">*</span>}</span><div className="relative"><Icon aria-hidden="true" size={18} className="pointer-events-none absolute left-4 top-3.5 text-[#2967CD]" />{textarea ? <textarea required={required} rows={3} value={value} onBlur={() => setTouched(true)} onChange={(event) => update(event.target.value)} placeholder={placeholder} aria-invalid={Boolean(touched && error)} className={`${className} min-h-28 pl-11`} /> : <input required={required} value={value} onBlur={() => setTouched(true)} onChange={(event) => update(event.target.value)} placeholder={placeholder} aria-invalid={Boolean(touched && error)} className={`${className} min-h-12`} />}</div>{touched && error && <p className="mt-2 text-xs font-medium text-red-600" role="alert">{error}</p>}</label>
}

export default Dashboard
