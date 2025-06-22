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
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
            <div className="space-y-4">
                 <div>
                    <label htmlFor="currentPassword"
                           className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="newPassword"
                           className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                 <div>
                    <label htmlFor="confirmPassword"
                           className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {message && <p className="text-sm text-green-600">{message}</p>}

            <div className="flex items-center space-x-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                >
                    {isLoading ? 'Updating...' : 'Update Password'}
                </button>
            </div>
        </form>
    )
} 