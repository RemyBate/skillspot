'use client'

import { useState } from 'react'
import countries from '@/lib/data/countries.json'

export default function CountriesPage() {
  const [selectedCountry, setSelectedCountry] = useState('')

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Select a Country
      </h1>
      <p className="text-gray-600 mb-6">
        Choose a country from the dropdown list below.
      </p>

      <div className="max-w-sm">
        <select
          value={selectedCountry}
          onChange={handleSelectChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            -- Please choose a country --
          </option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="font-semibold text-gray-800">
            You have selected:{' '}
            <span className="font-bold text-blue-600">
              {
                countries.find((country) => country.code === selectedCountry)
                  ?.name
              }
            </span>
          </p>
        </div>
      )}
    </div>
  )
} 