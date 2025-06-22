import { prisma } from '@/lib/prisma';

export default async function ProvidersListPage() {
  const providers = await prisma.serviceProvider.findMany({
    include: { user: true },
    orderBy: { id: 'desc' }
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Available Service Providers</h1>

      {providers.length === 0 ? (
        <p>No providers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {providers.map((provider) => (
            <div key={provider.id} className="border p-4 rounded shadow bg-white">
              <h2 className="text-xl font-semibold">{provider.name}</h2>
              <p className="text-sm text-gray-500">Category: {provider.category}</p>
              <p className="text-sm">Location: {provider.location}</p>
              <p className="mt-2">{provider.description}</p>
              <p className="mt-2 text-sm text-blue-600">
                Submitted by: {provider.user.firstName} {provider.user.lastName}
              </p>
              <p className="mt-1 text-sm">Rating: {provider.rating}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
