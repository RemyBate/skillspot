import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // ✅ Use authOptions from lib/auth.ts
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome, {session.user.email}
      </h1>
      <p className="text-gray-600 mb-6">Role: {session.user.role}</p>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Dashboard</h2>
        <p>
          This is your personal dashboard. You can manage your account and
          services from the menu on the left.
        </p>
      </div>
    </>
  );
}
