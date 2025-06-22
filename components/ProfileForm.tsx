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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0073e6] focus:border-[#0073e6] sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0073e6] focus:border-[#0073e6] sm:text-sm"
                    />
                </div>
            </div>

            {/* Read-only fields */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-500">{user.email}</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-sm text-gray-500 capitalize">{user.role}</p>
            </div>


            <div className="flex items-center justify-end space-x-4">
                {message && <p className="text-sm text-green-600">{message}</p>}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0073e6] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0073e6] disabled:opacity-50"
                >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    )
} 