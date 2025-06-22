// app/dashboard/layout.tsx
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">Menu</h2>
        <ul className="space-y-2">
          <li><a href="/dashboard/account" className="text-blue-500">My Account</a></li>
          <li><a href="/dashboard/provider" className="text-blue-500">Service Provider</a></li>
          <li><a href="/dashboard/countries" className="text-blue-500">Countries</a></li>
          <li><a href="/providers/list" className="text-blue-500">All Providers</a></li>
        </ul>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
