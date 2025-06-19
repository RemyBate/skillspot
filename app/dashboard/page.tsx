// app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login'); // 🔐 redirect to login if no session
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome, {session.user.email}</h1>
        <p className="mb-4">Role: <span className="font-medium">{session.user.role}</span></p>

        <form method="post" action="/api/auth/signout">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Sign Out
          </button>
        </form>
      </div>
    </main>
  );
}
