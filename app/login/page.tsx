'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard')
    }
  }, [status, session, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Attempting to sign in with email:', email)
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password
      })

      console.log('signIn response:', res)

      if (res?.ok) {
        console.log('Login successful, redirecting to dashboard...')
        router.push('/dashboard')
      } else {
        console.error('Login failed:', res?.error)
        setError(res?.error || 'Invalid email or password.')
      }
    } catch (error) {
      console.error('An unexpected error occurred during login:', error)
      setError('An unexpected error occurred.')
    }
  }

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Don't show login form if already authenticated
  if (status === 'authenticated') {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 p-6">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4 text-center">Login to Your Account</h1>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}
