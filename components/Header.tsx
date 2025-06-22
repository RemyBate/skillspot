'use client'

import { Menu } from '@headlessui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaUserCircle, FaChevronDown } from 'react-icons/fa'

export default function Header() {
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div
          className="text-2xl font-bold text-[#063773] cursor-pointer"
          onClick={() => router.push('/')}
        >
          SkillSpot
        </div>

        <div className="flex-1 max-w-xl">
          <input
            type="text"
            placeholder="What service are you looking for?"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0073e6] bg-white/90 backdrop-blur-sm"
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {status === 'authenticated' ? (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 text-gray-700 hover:text-[#0073e6]">
                <FaUserCircle className="h-6 w-6" />
                <span>{session.user?.email}</span>
                <FaChevronDown className="h-4 w-4" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push('/dashboard')}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                    >
                      Dashboard
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut()}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                    >
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-[#0073e6] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Log In / Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
