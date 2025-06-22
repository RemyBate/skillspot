// app/dashboard/layout.tsx
import { ReactNode } from 'react';
import Header from '@/components/Header';
import DashboardNav from '@/components/DashboardNav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <aside className="w-64 flex-shrink-0 bg-white p-6 border-r border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Menu</h2>
          <DashboardNav />
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
