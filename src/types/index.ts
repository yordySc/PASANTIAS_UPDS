export interface CompanyOffer {
  id: number
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
}

export interface DocumentItem {
  id: number
  title: string
  description: string
}
