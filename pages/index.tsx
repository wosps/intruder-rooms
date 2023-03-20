import Head from 'next/head'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import RoomList from '@/components/RoomList'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.intruderfps.com/rooms?HideEmpty=true&HidePassworded=true`)
  const data: object = await res.json()
  // Pass data to the page via props
  return { props: { data } }
}

type HomeProps = {
  data: object
}

export default function Home( {data} : HomeProps) {
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
        <RoomList data={data}/>
      </main>
    </>
  )
}
