import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import CredentialsForm from '@/components/CredentialsForm'

export default async function CredentialsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Manage Credentials</h1>
      <p className="text-gray-600 mb-6">
        Use the form below to change your password.
      </p>
      <CredentialsForm />
    </div>
  )
} 