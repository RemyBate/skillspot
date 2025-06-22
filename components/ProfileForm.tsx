'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

type UserProfile = {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: string;
}

interface ProfileFormProps {
    user: UserProfile
}

export default function ProfileForm({ user }: ProfileFormProps) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')

        const res = await fetch('/api/user/profile', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })

        setIsLoading(false)

        if (res.ok) {
            setMessage('Profile updated successfully!')
            router.refresh()
        } else {
            const result = await res.json()
            setMessage(result.error || 'Failed to update profile.')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="firstName" className="text-sm font-semibold text-gray-600">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="text-sm font-semibold text-gray-600">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-600">Email Address (read-only)</label>
                    <p className="text-lg text-gray-700 bg-gray-100 p-2 rounded-md mt-1">{user.email}</p>
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-600">Role (read-only)</label>
                    <p className="text-lg text-gray-700 bg-gray-100 p-2 rounded-md mt-1 capitalize">{user.role}</p>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                {message && <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
            </div>
        </form>
    )
} 