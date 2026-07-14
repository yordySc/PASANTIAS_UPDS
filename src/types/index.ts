export interface CompanyOffer {
  id: string
  companyId?: string
  institution: string
  address: string
  careers: string[]
  vacancies: number
  filled: number
  visible: boolean
  type: string
  description: string
  logo: string
  status: 'vigente' | 'no-vigente'
  immediateAcceptance: boolean
  mapUrl: string
  expiresAt?: string
}

export interface SuccessStory {
  id: string
  title: string
  description: string
  institution: string
  highlight: string
  accent: 'blue' | 'emerald' | 'amber'
}

export interface DocumentItem {
  id: number
  title: string
  description: string
}

export interface Career {
  id: string
  name: string
}
