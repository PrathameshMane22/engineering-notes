import Link from 'next/link'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'

const subjectData = {
  'dsp': 'Digital Signal Processing',
  'mobile-wireless-communication': 'Mobile Wireless Communication',
  'analog-digital-communication': 'Analog & Digital Communication',
  'analog-cmos-vlsi': 'Analog CMOS VLSI',
  'electromagnetic-engineering': 'Electromagnetic Engineering'
}

const categoryData = {
  'expt': { name: 'Experiments', icon: '🔬' },
  'notes': { name: 'Lecture Notes', icon: '📝' },
  'books': { name: 'Reference Books', icon: '📚' }
}

function getPDFs(subject, category) {
  try {
    const pdfDir = path.join(process.cwd(), 'public', 'subjects', subject, category)
    if (!fs.existsSync(pdfDir)) {
      return []
    }
    const files = fs.readdirSync(pdfDir)
    return files.filter(file => file.endsWith('.pdf'))
  } catch (error) {
    return []
  }
}

export default async function CategoryPage({ params }) {
  const { subject, category } = await params
  
  if (!subjectData[subject] || !categoryData[category]) {
    notFound()
  }

  const pdfs = getPDFs(subject, category)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <Link href={`/subjects/${subject}`} className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← Back to {subjectData[subject]}
        </Link>

        <div className="mb-8">
          <div className="text-6xl mb-4">{categoryData[category].icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {categoryData[category].name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {subjectData[subject]}
          </p>
        </div>

        {pdfs.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 text-center">
            <p className="text-yellow-800 dark:text-yellow-300 text-lg">
              📂 No PDFs uploaded yet. Add your PDF files to:
            </p>
            <code className="block mt-4 bg-yellow-100 dark:bg-yellow-900/40 px-4 py-2 rounded text-sm">
              public/subjects/{subject}/{category}/
            </code>
          </div>
        ) : (
          <div className="grid gap-4">
            {pdfs.map((pdf, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">📄</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {pdf.replace('.pdf', '').replace(/-|_/g, ' ')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">PDF Document</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a
                    href={`/subjects/${subject}/${category}/${pdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View
                  </a>
                  <a
                    href={`/subjects/${subject}/${category}/${pdf}`}
                    download
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const params = []
  Object.keys(subjectData).forEach(subject => {
    Object.keys(categoryData).forEach(category => {
      params.push({ subject, category })
    })
  })
  return params
}
