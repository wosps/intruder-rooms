import Head from 'next/head'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import RoomList from '@/components/RoomList'

const inter = Inter({ subsets: ['latin'] })

export default function FourOhFour() {
  return (
    <>
      <Head>
        <title>Intruder Rooms</title>
        <meta name="description" content="Live room data for Intruder." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='min-h-screen bg-base-200'>
        <Nav />
        <div className='px-6 h-[calc(100vh-100px)] flex flex-col items-center justify-center'>
            <div>
                <h1 className='text-4xl font-medium text-gray-200'>Error 404!</h1>
                <h2 className='text-2xl font-extralight text-gray-400'>Sorry, this page doesn&apos;t exist.</h2>
            </div>
        </div>
      </main>
    </>
  )
}
