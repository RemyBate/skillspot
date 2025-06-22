'use client'

import { Menu } from '@headlessui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaUserCircle } from 'react-icons/fa'

export default function Header() {
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => router.push('/')}
        >
          SkillSpot
        </div>

        <div className="flex-1 max-w-xl">
          <input
            type="text"
            placeholder="What service are you looking for?"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          {status === 'authenticated' ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center">
                  <FaUserCircle className="text-3xl text-gray-600" />
                </Menu.Button>
              </div>
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push('/dashboard')}
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Dashboard
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          ) : (
            <button onClick={() => router.push('/login')}>
              <FaUserCircle className="text-3xl text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
