import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

type AuthState = {
  session: Session | null
  isAdmin: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthState | undefined>(undefined)
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase()
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD?.trim()

function createLocalSession(email: string): Session {
  return {
    access_token: 'local-admin-token',
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    refresh_token: 'local-admin-refresh',
    user: {
      id: 'local-admin-user',
      email,
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      role: 'authenticated',
    },
  } as unknown as Session
}

async function hasAdminRole(userId: string) {
  if (!isSupabaseConfigured) return false
  const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).maybeSingle()
  if (error) {
    if (error.code === 'PGRST116') return false
    throw error
  }
  return data?.role === 'admin'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    let active = true
    const update = async (nextSession: Session | null) => {
      setSession(nextSession)
      try {
        setIsAdmin(nextSession ? await hasAdminRole(nextSession.user.id) : false)
      } catch {
        setIsAdmin(false)
      }
      if (active) setLoading(false)
    }

    void supabase.auth.getSession().then(({ data }) => update(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void update(nextSession)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setSession(null)
        setIsAdmin(false)
        return false
      }

      const admin = await hasAdminRole(data.user.id)
      setSession(data.session)
      setIsAdmin(admin)
      return admin
    }

    if (adminEmail && adminPassword && normalizedEmail === adminEmail && password === adminPassword) {
      setSession(createLocalSession(email))
      setIsAdmin(true)
      setLoading(false)
      return true
    }

    setSession(null)
    setIsAdmin(false)
    return false
  }

  const signOut = async () => {
    try {
      if (isSupabaseConfigured) await supabase.auth.signOut()
    } catch {}
    setSession(null)
    setIsAdmin(false)
  }

  return <AuthContext.Provider value={{ session, isAdmin, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth debe usarse dentro de AuthProvider.')
  return value
}
