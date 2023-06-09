import Head from 'next/head'
import './globals.css'
import { Inter } from 'next/font/google'
import { isAuth } from '@/lib/isAuth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Sistema Bancario</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${inter.className} max-w-5xl mx-auto`}>
        <h1 className='my-12 text-center text-3xl'>Nombre de Banco</h1>
        {children}
      </body>
    </html>
  )
}
