'use client'

import { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaHome } from 'react-icons/fa'
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
          <Link
            href="/"
            className={`w-full flex items-center space-x-2 text-gray-700 font-semibold hover:text-[#0073e6] ${
              isActive('/') ? 'text-[#0073e6]' : ''
            }`}
          >
            <FaHome />
            <span>Home</span>
          </Link>
        </li>
        <li className="!mt-4">
          <button
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            className="w-full flex justify-between items-center text-gray-700 font-semibold hover:text-[#0073e6]"
          >
            <span>My Account</span>
            {isAccountOpen ? (
              <FaChevronUp className="text-xs" />
            ) : (
              <FaChevronDown className="text-xs" />
            )}
          </button>
          {isAccountOpen && (
            <ul className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
              <li>
                <Link
                  href="/dashboard/account/profile"
                  className={`block px-2 py-1 text-sm rounded-md hover:bg-gray-100 ${
                    isActive('/dashboard/account/profile')
                      ? 'text-[#0073e6] font-bold'
                      : 'text-gray-600'
                  }`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/account/credentials"
                  className={`block px-2 py-1 text-sm rounded-md hover:bg-gray-100 ${
                    isActive('/dashboard/account/credentials')
                      ? 'text-[#0073e6] font-bold'
                      : 'text-gray-600'
                  }`}
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
            className={`block font-semibold text-gray-700 hover:text-[#0073e6] ${
              isActive('/dashboard/provider') ? 'text-[#0073e6]' : ''
            }`}
          >
            Service Provider
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/countries"
            className={`block font-semibold text-gray-700 hover:text-[#0073e6] ${
              isActive('/dashboard/countries') ? 'text-[#0073e6]' : ''
            }`}
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