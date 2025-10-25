import Link from 'next/link'
import { notFound } from 'next/navigation'

// Subject configuration
const subjectData = {
  'dsp': {
    name: 'Digital Signal Processing',
    icon: '📊',
    color: 'blue'
  },
  'mobile-wireless-communication': {
    name: 'Mobile Wireless Communication',
    icon: '📡',
    color: 'green'
  },
  'analog-digital-communication': {
    name: 'Analog & Digital Communication',
    icon: '📻',
    color: 'purple'
  },
  'analog-cmos-vlsi': {
    name: 'Analog CMOS VLSI',
    icon: '🔌',
    color: 'red'
  },
  'electromagnetic-engineering': {
    name: 'Electromagnetic Engineering',
    icon: '⚡',
    color: 'yellow'
  }
}

export default async function SubjectPage({ params }) {
  const { subject } = await params
  const data = subjectData[subject]

  if (!data) {
    notFound()
  }

  const categories = [
    {
      id: 'expt',
      name: 'Experiments',
      description: 'Lab experiments and practical work',
      icon: '🔬',
      path: `/subjects/${subject}/expt`
    },
    {
      id: 'notes',
      name: 'Lecture Notes',
      description: 'Class notes and study material',
      icon: '📝',
      path: `/subjects/${subject}/notes`
    },
    {
      id: 'books',
      name: 'Reference Books',
      description: 'Textbooks and reference material',
      icon: '📚',
      path: `/subjects/${subject}/books`
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← Back to All Subjects
        </Link>

        <div className="mb-8">
          <div className="text-6xl mb-4">{data.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {data.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Select a category to view resources
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.path}
              className="block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                {category.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// Generate static params for all subjects
export async function generateStaticParams() {
  return Object.keys(subjectData).map((subject) => ({
    subject: subject,
  }))
}
