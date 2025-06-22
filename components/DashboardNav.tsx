'use client'

import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardNav() {
  const pathname = usePathname()
  const [isAccountOpen, setIsAccountOpen] = useState(
    pathname.startsWith('/dashboard/account')
  )

  const isActive = (path: string) => pathname === path

  return (
    <nav>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            className="w-full flex justify-between items-center text-gray-700 font-semibold hover:text-blue-600"
          >
            <span>My Account</span>
            {isAccountOpen ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
          </button>
          {isAccountOpen && (
            <ul className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
              <li>
                <Link
                  href="/dashboard/account/profile"
                  className={`block text-gray-600 hover:text-blue-600 ${isActive('/dashboard/account/profile') ? 'font-bold text-blue-600' : ''}`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/account/credentials"
                  className={`block text-gray-600 hover:text-blue-600 ${isActive('/dashboard/account/credentials') ? 'font-bold text-blue-600' : ''}`}
                >
                  Credentials
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            href="/dashboard/provider"
            className={`block text-gray-700 font-semibold hover:text-blue-600 ${isActive('/dashboard/provider') ? 'font-bold text-blue-600' : ''}`}
          >
            Service Provider
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/countries"
            className={`block text-gray-700 font-semibold hover:text-blue-600 ${isActive('/dashboard/countries') ? 'font-bold text-blue-600' : ''}`}
          >
            Countries
          </Link>
        </li>
        <li>
          <Link
            href="/providers/list"
            className={`block text-gray-700 font-semibold hover:text-blue-600 ${isActive('/providers/list') ? 'font-bold text-blue-600' : ''}`}
          >
            Public Listings
          </Link>
        </li>
      </ul>
    </nav>
  )
} 