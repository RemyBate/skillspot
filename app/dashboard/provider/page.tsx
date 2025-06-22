'use client';

import { useState } from 'react';

export default function ProviderPage() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/providers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage('✅ Service Provider created successfully!');
      setForm({ name: '', category: '', location: '', description: '' });
    } else {
      const data = await res.json();
      setMessage(`❌ Error: ${data.error || 'Failed to create provider'}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Service Provider</h2>

      {message && <p className="mb-4 text-sm">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Provider Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category (e.g., Plumber, Electrician)"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location (e.g., Berlin)"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
