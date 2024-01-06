import Head from 'next/head'
import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sistema Bancario',
  description: 'Sistema Bancario de practica para la clase de bases de datos III',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-5xl mx-auto`}>
        <h1 className='my-12 text-center text-3xl'>Nombre de Banco</h1>
        {children}
      </body>
    </html>
  )
}
