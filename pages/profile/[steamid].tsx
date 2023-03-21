import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'

const inter = Inter({ subsets: ['latin'] })

type ProfileProps = {
    avatarUrl: string,
    id: number,
    name: string,
    role: string,
    steamId: string,
    status: {
        online: boolean,
    }
}

type StatsProps = {
    id: number,
    agentId: number,
    matchesWon: number,
    matchesLost: number,
    roundsLost: number,
    roundsTied: number,
    roundsWonElimination: number,
    roundsWonCapture: number,
    roundsWonHack: number,
    roundsWonTimer: number,
    roundsWonCustom: number,
    timePlayed: number,
    timePlayedDemoted: number,
    kills: number,
    teamKills: number,
    deaths: number,
    arrests: number,
    gotArrested: number,
    captures: number,
    pickups: number,
    networkHacks: number,
    survivals: number,
    suicides: number,
    knockdowns: number,
    gotKnockedDown: number,
    teamKnockdowns: number,
    teamDamage: number,
    lastUpdate: string,
    level: number,
    levelXp: number,
    levelXpRequired: number,
    totalXp: number,
}

export async function getServerSideProps(context: any) {
    const { steamid } = context.query
    // Fetch data from external API
    const profileRes = await fetch(`https://api.intruderfps.com/agents/${steamid}/`)
    const profileData: ProfileProps = await profileRes.json()
    const statsRes = await fetch(`https://api.intruderfps.com/agents/${steamid}/stats`)
    const statsData: StatsProps = await statsRes.json()
    
    // Pass data to the page via props
    return { props: { profileData, statsData } }
  }

export default function Profile( {profileData, statsData}: { profileData: ProfileProps, statsData: StatsProps} ) {
    return (
    <>
      <Head>
        <title>Intruder Rooms | Profile</title>
        <meta name="description" content="Live room data for Intruder." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='min-h-screen bg-base-200'>
        <Nav />
        <div className='px-6'>
        <div className='flex flex-row items-center py-5 gap-4'>
            <div>
                {profileData.status.online ? <div><div className="avatar online"><div className="w-24 rounded-full"><img src={profileData.avatarUrl}/></div></div></div> : <div className="avatar offline"><div className="w-24 rounded-full"><img src={profileData.avatarUrl}/></div></div>}
            </div>
            <div className="flex flex-col">
                <div className='flex flex-row items-center gap-2'>
                    <h1 className='font-bold text-lg'>{profileData.name}</h1>
                    {profileData.role === 'Demoted' ? <div className="badge badge-secondary">Demoted</div> : profileData.role === 'AUG' ? <div className="badge badge-primary">AUG</div> : <div className="badge">Agent</div>}
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <h2 className='font-medium text-gray-400'>Level {statsData.level}</h2>
                    <div className="tooltip tooltip-bottom" data-tip={`${statsData.levelXp} XP / ${statsData.levelXpRequired} XP`}>
                        <progress className="progress progress-success w-20" value={statsData.levelXp} max={statsData.levelXpRequired}></progress>
                    </div>
                </div>
            </div>
        </div>

        <div className="stats shadow min-w-full"> 
            <div className="stat">
                <div className="stat-figure text-secondary">
                </div>
                <div className="stat-title">Kills</div>
                <div className="stat-value">{statsData.kills}</div>
            </div>
            <div className="stat">
                <div className="stat-figure text-secondary">
                </div>
                <div className="stat-title">Deaths</div>
                <div className="stat-value">{statsData.deaths}</div>
            </div>
        </div>

        <div className="stats shadow min-w-full mt-3"> 
            <div className="stat">
                <div className="stat-figure text-secondary">
                </div>
                <div className="stat-title">Matches Won</div>
                <div className="stat-value">{statsData.matchesWon}</div>
            </div>
            <div className="stat">
                <div className="stat-figure text-secondary">
                </div>
                <div className="stat-title">Matches Lost</div>
                <div className="stat-value">{statsData.matchesLost}</div>
            </div>
        </div>
        {/* <div className="stats shadow min-w-full">
            <div className="stat">
                <div className="stat-figure text-secondary">
                </div>
                <div className="stat-title">K/D</div>
                <div className="stat-value">{(statsData.kills / statsData.deaths).toFixed(2)}</div>
            </div>
        </div> */}

            {/* <div className="radial-progress" style={{"--value":80}}>80%</div> */}
            {/* <p>Win Rate</p> */}
        </div>
      </main>
    </>
  )
}
