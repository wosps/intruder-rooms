import Head from 'next/head'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import RoomList from '@/components/RoomList'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.intruderfps.com/rooms?HideEmpty=true&HidePassworded=true`)
  const data = await res.json()
  console.log(data)
  // Pass data to the page via props
  return { props: { data } }
}

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Intruder Rooms</title>
        <meta name="description" content="Live room data for Intruder." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='min-h-screen'>
        <Nav />
        <RoomList data={data}/>
      </main>
    </>
  )
}
