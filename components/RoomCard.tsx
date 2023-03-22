import Link from "next/link"
import { useEffect, useState } from "react"
import { FaUserAlt } from "react-icons/fa"

type RoomCardProps = {
    id: number,
    name: string,
    region: string,
    official: boolean,
    currentMap: string
    agentCount: number,
    maxAgents: number,
    creator: string,
}

type AgentType = {
    id: number,
    role: string,
    loginCount: number,
    firstLogin: string,
    lastLogin: string,
    lastUpdate: string,
    stats: any,
    status: any,
    steamId: string,
    name: string,
    avatarUrl: string,
}

export default function RoomCard( { id, name, region, official, currentMap, agentCount, maxAgents, creator } : RoomCardProps) {

    const [agentData, setAgentData] = useState([] as any)

    useEffect(() => {
        async function fetchAgentData() {
            const response = await fetch(`https://api.intruderfps.com/rooms/${id}/agents`)
            const data = await response.json()
            await setAgentData(data)
        }
        fetchAgentData()
    }, [])
    
    return (
            <div tabIndex={0} className="collapse collapse-arrow card w-96 bg-base-100 shadow-xl max-w-full">
                <input type="checkbox" />
                <div className="card-body collapse-title p-5">
                    <h2 className="card-title">{name}</h2>
                    <div className="flex gap-2">
                        <div className="badge badge-accent">{region}</div>  
                        {official ? <div className="badge badge-primary">Official</div> : <div className="badge badge-secondary">Custom</div> }
                        <div className="badge gap-2"><FaUserAlt /> {agentCount}/{maxAgents}</div>               
                    </div>
                    <div>
                        <p className=" text-md text-gray-400 inline">{currentMap}</p>
                        <p className=" text-md text-gray-600 inline ml-1">| Host: {creator}</p>
                    </div>
                </div>
                <div className="collapse-content -mt-2 px-5">
                    <div className="border-t-2 border-gray-700 mb-2"></div>
                    <p className="text-md text-gray-200 font-bold">Player List</p>
                    <div className="font-light text-gray-300">
                        {agentData.map((agent: AgentType) => {
                            return(<Link key={agent.id} href={`/profile/${agent.steamId}`} className="link link-hover"><p key={agent.id} className={agent.role == "Demoted" ? " text-red-200" : agent.role == "AUG" ? " text-green-200" : ""}>{agent.name}</p></Link>                            )
                        })
                        }
                    </div>
                    
                </div>
                    
            </div>
    )
}