import Head from 'next/head'
import clientPromise from '../lib/mongodb'

async function getDB() {
  try{
    const res = await clientPromise
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export default async function Home() {
  const isConnected: boolean = await getDB()

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js with MongoDB!</a>
        </h1>

        {isConnected ? (
          <h2>You are connected to MongoDB</h2>
        ) : (
          <h2>
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
      </main>
    </div>
  )
}
