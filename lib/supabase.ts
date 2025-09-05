import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para Builders
export interface ApplicationFormData {
  fullName: string
  email: string
  technicalExperience: string
  whyWeb3: string
  portfolioGithub?: string
  accessCode?: string
}

// Tipos para Empresas
export interface CompanyInquiry {
  id?: string
  company: string 
  name: string   
  email: string 
  role: string     
  needs: string      
  created_at?: string
  updated_at?: string
}

// Types para Blockchain
export interface BlockchainInquiry {
  id?: string
  protocol: string
  name: string
  email: string
  role: string
  goals: string
  budget?: string
  created_at?: string
  updated_at?: string
}