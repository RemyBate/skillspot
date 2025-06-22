import Header from '@/components/Header'

const categories = [
  'Pet Sitter', 'Electrician', 'Plumber', 'Carpenter', 'Painter', 'Babysitter'
]

function CategoryButtons() {
    return (
        <div className="flex flex-wrap justify-center gap-3 mt-6">
            {categories.map((cat, index) => (
                <button
                    key={index}
                    className="bg-white rounded-full px-4 py-2 text-sm shadow hover:bg-gray-200 transition-colors"
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-gray-400">
      <Header />
      <main className="container mx-auto px-4 py-12 text-center">
        <div className="text-center mt-20">
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
            Find the right service, right away
          </h1>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Your one-stop platform for discovering and connecting with skilled local service providers.
          </p>
        </div>
        <div className="mt-12">
          <CategoryButtons />
        </div>
      </main>
    </div>
  )
}
