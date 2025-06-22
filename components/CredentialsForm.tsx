'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CredentialsForm() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')
        setError('')

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New passwords do not match.")
            setIsLoading(false)
            return
        }

        const res = await fetch('/api/user/credentials', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })

        setIsLoading(false)
        const result = await res.json()

        if (res.ok) {
            setMessage(result.message || 'Password updated successfully!')
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' }) // Clear form
        } else {
            setError(result.error || 'Failed to update password.')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}

            <div>
                <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700"
                >
                    Current Password
                </label>
                <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0073e6] focus:border-[#0073e6] sm:text-sm"
                />
            </div>
            <div>
                <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                >
                    New Password
                </label>
                <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0073e6] focus:border-[#0073e6] sm:text-sm"
                />
            </div>
            <div>
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                >
                    Confirm New Password
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0073e6] focus:border-[#0073e6] sm:text-sm"
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0073e6] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0073e6] disabled:opacity-50"
                >
                    {isLoading ? 'Updating...' : 'Update Password'}
                </button>
            </div>
        </form>
    )
} 