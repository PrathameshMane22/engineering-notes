import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Prathamesh Engineering Notes',
  description: 'Personal collection of engineering notes and resources',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition">
              📚 Engineering Notes
            </Link>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              E&TC Resources
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
        <footer className="bg-gray-100 dark:bg-gray-800 mt-12 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2025 Engineering Notes | Made with Next.js & Vercel</p>
        </footer>
      </body>
    </html>
  )
}
