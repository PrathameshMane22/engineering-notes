import Link from 'next/link'

export default function Home() {
  const subjects = [
    {
      id: 'dsp',
      name: 'Digital Signal Processing',
      description: 'DSP experiments, lecture notes, and reference books',
      color: 'blue',
      icon: '📊'
    },
    {
      id: 'mobile-wireless-communication',
      name: 'Mobile Wireless Communication',
      description: 'Wireless protocols, propagation models, GSM architecture',
      color: 'green',
      icon: '📡'
    },
    {
      id: 'analog-digital-communication',
      name: 'Analog & Digital Communication',
      description: 'Modulation techniques, signal processing',
      color: 'purple',
      icon: '📻'
    },
    {
      id: 'analog-cmos-vlsi',
      name: 'Analog CMOS VLSI',
      description: 'Circuit design, MOSFET analysis, layout',
      color: 'red',
      icon: '🔌'
    },
    {
      id: 'electromagnetic-engineering',
      name: 'Electromagnetic Engineering',
      description: 'Maxwell equations, wave propagation, antennas',
      color: 'yellow',
      icon: '⚡'
    }
  ]

  const colorClasses = {
    blue: 'border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    green: 'border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20',
    purple: 'border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20',
    red: 'border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20',
    yellow: 'border-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            📚 My Engineering Notes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Electronics & Telecommunication Engineering Resources
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Link 
              key={subject.id}
              href={`/subjects/${subject.id}`}
              className={`block p-6 bg-white dark:bg-gray-800 rounded-xl border-l-4 ${colorClasses[subject.color]} shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="text-4xl mb-3">{subject.icon}</div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {subject.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {subject.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Click on any subject to view experiments, notes, and books
          </p>
        </div>
      </div>
    </div>
  )
}
