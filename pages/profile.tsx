import Head from 'next/head'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import RoomList from '@/components/RoomList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Intruder Rooms | Profile</title>
        <meta name="description" content="Live room data for Intruder." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Nav />
        <div className="hero min-h-screen bg-base-200">
        </div>  
      </main>
    </>
  )
}
