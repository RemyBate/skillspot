'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { FaUserCircle } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const categories = [
  'Pet Sitter', 'Electrician', 'Plumber', 'Carpenter', 'Painter', 'Babysitter'
]

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const router = useRouter()

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    // Handle Signup
    if (isSignup) {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phone: formData.phone,
        }),
      })

      const result = await res.json()
      if (res.ok) {
        alert(result.message || 'Signup successful! Please log in.')
        setIsSignup(false) // Switch to login form
      } else {
        alert(result.error || 'Something went wrong during sign up.')
      }
      return
    }

    // Handle Login
    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    })

    if (res?.ok) {
      setIsDialogOpen(false)
      router.push('/dashboard')
    } else {
      alert(res?.error || 'Invalid credentials.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6">
      {/* Search Bar & User Icon */}
      <div className="flex items-center bg-white rounded-full shadow px-4 py-2 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="What service are you looking for?"
          className="flex-grow px-4 py-2 outline-none text-gray-700"
        />
        <button onClick={() => setIsDialogOpen(true)}>
          <FaUserCircle className="text-3xl text-gray-600" />
        </button>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {categories.map((cat, index) => (
          <button
            key={index}
            className="bg-white rounded-full px-4 py-2 text-sm shadow hover:bg-blue-100"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Login/Signup Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <Dialog.Title className="text-lg font-bold mb-4">
              {isSignup ? 'Sign Up' : 'Login'}
            </Dialog.Title>

            {isSignup ? (
              <>
                <input name="firstName" onChange={handleChange} value={formData.firstName} type="text" placeholder="First Name" className="w-full border rounded px-3 py-2 mb-3" />
                <input name="lastName" onChange={handleChange} value={formData.lastName} type="text" placeholder="Last Name" className="w-full border rounded px-3 py-2 mb-3" />
                <input name="email" onChange={handleChange} value={formData.email} type="email" placeholder="Email" className="w-full border rounded px-3 py-2 mb-3" />
                <input name="password" onChange={handleChange} value={formData.password} type="password" placeholder="Password" className="w-full border rounded px-3 py-2 mb-3" />
                <input name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} type="password" placeholder="Confirm Password" className="w-full border rounded px-3 py-2 mb-3" />
                <input name="phone" onChange={handleChange} value={formData.phone} type="tel" placeholder="Phone Number (optional)" className="w-full border rounded px-3 py-2 mb-4" />
              </>
            ) : (
              <>
                <input name="email" onChange={handleChange} value={formData.email} type="email" placeholder="Email" className="w-full border rounded px-3 py-2 mb-3" />
                <input name="password" onChange={handleChange} value={formData.password} type="password" placeholder="Password" className="w-full border rounded px-3 py-2 mb-4" />
              </>
            )}

            <div className="flex justify-between items-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleSubmit}
              >
                {isSignup ? 'Sign Up' : 'Login'}
              </button>
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  )
}
