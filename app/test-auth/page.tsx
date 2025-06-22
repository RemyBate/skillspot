import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function TestAuthPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Test Page</h1>
      
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Session Status:</h2>
        <pre className="bg-white p-2 rounded text-sm overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <div className="mt-4">
        <a href="/dashboard" className="text-blue-600 hover:underline">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
} 