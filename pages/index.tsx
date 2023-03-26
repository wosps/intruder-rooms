import Head from 'next/head'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import RoomList from '@/components/RoomList'
import router from '@/lib/router'
import type { SteamProfile } from '@/lib/passport'
import { NextApiRequest, NextApiResponse } from "next";
import { NextSteamAuthApiRequest } from '@/lib/router'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps({req, res}: {req: NextSteamAuthApiRequest, res: NextApiResponse}) {
  await router.run(req, res);
  // Fetch data from external API
  const fetchRes = await fetch(`https://api.intruderfps.com/rooms?HideEmpty=true&HidePassworded=true`)
  const data: object = await fetchRes.json()
  // Pass data to the page via props
  return { props: {
    data,
    user: req.user || null } }
}

type HomeProps = {
  data: object
}

export default function Home( {data, user} : {data: HomeProps, user: SteamProfile}) {
  return (
    <>
      <Head>
        <title>Intruder Rooms</title>
        <meta name="description" content="Live room data for Intruder." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='min-h-screen bg-base-200'>
        <Nav user={user} />
        <RoomList data={data}/>
      </main>
    </>
  )
}