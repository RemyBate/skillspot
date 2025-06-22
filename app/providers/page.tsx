'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddServiceProviderPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    category: '',
    location: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/providers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Failed to save.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Add Your Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Business or Service Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="e.g. Plumber, Babysitter"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Short description of your service"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
