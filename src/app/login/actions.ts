'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function githubLogin() {
    const supabase = createClient()
    
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: 'http://localhost:3000/api/auth/callback'
        }
    })
    
    if (error) {
        redirect('/error')
    }
    
    if (data.url) {
        redirect(data.url) // use the redirect API for your server framework
    }
}

export async function googleLogin() {
    const supabase = createClient()
    
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: 'http://localhost:3000/api/auth/callback'
        }
    })
    
    if (error) {
        redirect('/error')
    }
    
    if (data.url) {
        redirect(data.url) // use the redirect API for your server framework
    }
}

export async function signOut() {
    const supabase = createClient()
    
    const {error} = await supabase.auth.signOut()
    
    if (error) {
        redirect('/error')
    }
    
    revalidatePath('/', 'layout')
    redirect('/')
}