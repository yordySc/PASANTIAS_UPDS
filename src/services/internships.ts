import type { Career, CompanyOffer, SuccessStory } from '../types'
import { supabase } from '../lib/supabase'

const SUCCESS_STORIES_KEY = 'upds-success-stories'
const fallbackStories: SuccessStory[] = [
  {
    id: 'story-1',
    title: 'De la pasantía a la primera oportunidad profesional',
    description: 'Una estudiante encontró su primer vínculo laboral después de completar una experiencia guiada por la universidad y el equipo de la empresa.',
    institution: 'UPDS',
    highlight: 'Primer empleo',
    accent: 'blue',
  },
  {
    id: 'story-2',
    title: 'Una experiencia que abrió nuevas puertas',
    description: 'La pasantía permitió desarrollar habilidades reales y consolidar un proyecto que luego se convirtió en una oportunidad continua.',
    institution: 'Empresa aliada',
    highlight: 'Desarrollo profesional',
    accent: 'emerald',
  },
]

type OfferRow = { id: string; company_id: string; institution: string; description: string; address: string; map_url: string; logo: string | null; type: string; vacancies: number; filled: number; visible: boolean; immediate_acceptance: boolean; expires_at: string | null; status: 'vigente' | 'no-vigente'; careers: string[] }

const toOffer = (row: OfferRow): CompanyOffer => ({ id: row.id, companyId: row.company_id, institution: row.institution, description: row.description, address: row.address, mapUrl: row.map_url, logo: row.logo || '', type: row.type, vacancies: row.vacancies, filled: row.filled, visible: row.visible, immediateAcceptance: row.immediate_acceptance, expiresAt: row.expires_at || '', status: row.status, careers: row.careers })

export async function getOffers() {
  const { data, error } = await supabase.from('internship_offers_with_details').select('*').order('expires_at')
  if (error) throw error
  return (data as OfferRow[]).map(toOffer)
}

export async function getCareers(): Promise<Career[]> {
  const { data, error } = await supabase.from('careers').select('id, name').order('name')
  if (error) throw error
  return data
}

export async function getSuccessStories(): Promise<SuccessStory[]> {
  if (typeof window === 'undefined') return fallbackStories
  try {
    const stored = window.localStorage.getItem(SUCCESS_STORIES_KEY)
    if (!stored) return fallbackStories
    const parsed = JSON.parse(stored) as SuccessStory[]
    return Array.isArray(parsed) && parsed.length ? parsed : fallbackStories
  } catch {
    return fallbackStories
  }
}

export async function saveSuccessStory(story: Omit<SuccessStory, 'id'>): Promise<SuccessStory> {
  const nextStory: SuccessStory = { ...story, id: crypto.randomUUID() }
  const current = await getSuccessStories()
  const updated = [nextStory, ...current]
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(SUCCESS_STORIES_KEY, JSON.stringify(updated))
  }
  return nextStory
}

export async function deleteSuccessStory(id: string): Promise<void> {
  const current = await getSuccessStories()
  const updated = current.filter((story) => story.id !== id)
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(SUCCESS_STORIES_KEY, JSON.stringify(updated))
  }
}

async function resolveCareerIds(names: string[]) {
  const normalized = [...new Set(names.map((name) => name.trim()).filter(Boolean))]
  if (!normalized.length) return []
  const { data, error } = await supabase.from('careers').upsert(normalized.map((name) => ({ name })), { onConflict: 'name' }).select('id')
  if (error) throw error
  return data.map((career) => career.id as string)
}

export async function saveOffer(offer: Omit<CompanyOffer, 'id' | 'companyId'>, existing?: CompanyOffer) {
  const companyPayload = { name: offer.institution, description: offer.description, address: offer.address, map_url: offer.mapUrl, logo_url: offer.logo || null }
  let companyId = existing?.companyId
  if (companyId) { const { error } = await supabase.from('companies').update(companyPayload).eq('id', companyId); if (error) throw error }
  else { const { data, error } = await supabase.from('companies').insert(companyPayload).select('id').single(); if (error) throw error; companyId = data.id }
  const careerIds = await resolveCareerIds(offer.careers)
  const { error: deleteError } = await supabase.from('company_careers').delete().eq('company_id', companyId)
  if (deleteError) throw deleteError
  if (careerIds.length) { const { error } = await supabase.from('company_careers').insert(careerIds.map((careerId) => ({ company_id: companyId, career_id: careerId }))); if (error) throw error }
  const fallbackExpiresAt = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  const offerPayload = { company_id: companyId, offer_type: offer.type, total_slots: offer.vacancies, occupied_slots: offer.filled, closes_at: offer.expiresAt || fallbackExpiresAt, published: offer.visible, immediate_acceptance: offer.immediateAcceptance }
  if (existing && !existing.id.startsWith('mock-')) { const { error } = await supabase.from('internship_offers').update(offerPayload).eq('id', existing.id); if (error) throw error }
  else { const { error } = await supabase.from('internship_offers').insert(offerPayload); if (error) throw error }
}

export async function deleteOffer(id: string) { const { error } = await supabase.from('internship_offers').delete().eq('id', id); if (error) throw error }
export async function addCareer(name: string) {
  const trimmed = name.trim()
  if (!trimmed) throw new Error('La carrera no puede estar vacía.')
  const { error } = await supabase.from('careers').insert({ name: trimmed })
  if (error) throw error
}

export async function deleteCareer(id: string) {
  const { error } = await supabase.from('careers').delete().eq('id', id)
  if (error) throw error
}

export async function uploadLogo(file: File) {
  const extension = file.name.split('.').pop() || 'png'
  const path = `${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from('company-logos').upload(path, file)
  if (error) throw error
  return supabase.storage.from('company-logos').getPublicUrl(path).data.publicUrl
}
