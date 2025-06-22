import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // ✅ Use authOptions from lib/auth.ts
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Debug logging (remove in production)
  console.log('Dashboard session check:', session ? 'Session found' : 'No session');

  if (!session) {
    console.log('Redirecting to login - no session found');
    redirect('/login');
  }

  if (!session.user) {
    console.log('Redirecting to login - no user in session');
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li><a href="/dashboard/account" className="text-blue-600">My Account</a></li>
          <li><a href="/dashboard/provider" className="text-blue-600">Service Provider</a></li>
          <li><a href="/dashboard/countries" className="text-blue-600">Countries</a></li>
          <li><a href="/providers/list" className="text-blue-600">Public Listings</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Welcome, {session.user.email}</h1>
        <p>Role: {session.user.role}</p>

        <form method="post" action="/api/auth/signout" className="mt-4">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Sign Out
          </button>
        </form>
      </main>
    </div>
  );
}
