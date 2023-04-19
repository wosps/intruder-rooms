import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import { SteamProfile } from '@/lib/passport'
import { NextSteamAuthApiRequest } from '@/lib/router'
import { NextApiRequest, NextApiResponse } from "next";
import router from '@/lib/router'

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

type VoteProps = {
    [0]: {
    id: number,
    agentId: number,
    attributeId: number,
    positive: number,
    negative: number,
    received: number,
    lastUpdate: string,
    attribute: {
        id: number,
        name: string,
    }
}
}

export async function getServerSideProps({query, req, res} : {query: any, req: NextSteamAuthApiRequest, res: NextApiResponse}) {
    const { steamid } = query
    await router.run(req, res);
    // Fetch data from external API
    const profileRes = await fetch(`https://api.intruderfps.com/agents/${steamid}/`)
    const profileData: ProfileProps = await profileRes.json()
    const statsRes = await fetch(`https://api.intruderfps.com/agents/${steamid}/stats`)
    const statsData: StatsProps = await statsRes.json()
    const voteRes = await fetch(`https://api.intruderfps.com/agents/${steamid}/votes`)
    const voteData: VoteProps = await voteRes.json()
    
    // Pass data to the page via props
    return { props: { 
        profileData, 
        statsData,
        voteData,
        user: req.user || null} }
  }

export default function Profile( {profileData, statsData, voteData, user}: { profileData: ProfileProps, statsData: StatsProps, voteData: VoteProps, user: SteamProfile} ) {
    const matchWinRate = Math.round((statsData.matchesWon / (statsData.matchesWon + statsData.matchesLost)) * 100)
    const roundsWon = statsData.roundsWonCapture + statsData.roundsWonCustom + statsData.roundsWonElimination + statsData.roundsWonHack + statsData.roundsWonTimer
    const roundWinRate = Math.round((roundsWon / (roundsWon + statsData.roundsLost + statsData.roundsTied)) * 100)
    const title = `Intruder Rooms | ${profileData.name}`
    return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Live room data for Intruder." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='min-h-screen bg-base-200'>
        <Nav user={user} />
        <div className='mx-5 md:max-w-3xl md:mx-auto'>
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
                    <div className='flex flex-row items-center gap-2'>
                        <div className=' text-green-400 text-sm font-medium'>+{voteData[0].positive}</div>
                        <div className=' text-red-400 text-sm font-medium'>-{voteData[0].negative}</div>
                        <div className=' text-gray-600 text-sm font-medium'>| {voteData[0].received} Votes</div>
                    </div>
                </div>
            </div>

            <div className="md:w-full stats stats-horizontal shadow max-w-full"> 
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
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title">K/D</div>
                    <div className="stat-value">{(statsData.kills / statsData.deaths).toFixed(2)}</div>
                </div>
            </div>

            <div className='flex flex-row justify-between'>
                <div className="stats stats-vertical md:w-90 shadow mt-3"> 
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
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                        </div>
                        <div className="stat-title mb-3">Match Win Rate</div>
                        <div className='flex justify-center items-center'>
                        <div className="radial-progress text-green-400 bg-black bg-opacity-10" style={{ "--value": matchWinRate, "--size": "7em"} as React.CSSProperties}>{matchWinRate}%</div>
                        </div>
                    </div>
                </div>
                <div className="stats stats-vertical md:w-90 shadow mt-3"> 
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                        </div>
                        <div className="stat-title">Rounds Won</div>
                        <div className="stat-value">{roundsWon}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                        </div>
                        <div className="stat-title">Rounds Lost</div>
                        <div className="stat-value">{statsData.roundsLost}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                        </div>
                        <div className="stat-title mb-3">Round Win Rate</div>
                        <div className='flex justify-center items-center'>
                        <div className="radial-progress text-blue-400 bg-black bg-opacity-10 border-black" style={{ "--value": roundWinRate, "--size": "7em"} as React.CSSProperties}>{roundWinRate}%</div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="py-3 overflow-x-auto">
                <table className="table table-zebra w-full table-fixed">
                    <tbody>
                        {/* Map through the statsData array and create a table row for each item. For 'Time Played', display this in hours */}
                        {Object.entries(statsData).map(([key, value]: [string, string | number]) => (
                            <tr key={key}>
                                <td className='w-1/2'>{key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}</td>
                                <td className='w-1/2'>{key === 'timePlayed' ? `${(typeof value === 'number' ? (value / 3600).toFixed(2) : value)} Hours` : key === 'timePlayedDemoted' ? `${(typeof value === 'number' ? (value / 3600).toFixed(2) : value)} Hours`  : key === 'lastUpdate' ? new Date(value).toLocaleString() : value}</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            </div>
      </main>
    </>
  )
}
