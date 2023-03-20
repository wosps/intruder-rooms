import { FaUserAlt } from "react-icons/fa"

type RoomCardProps = {
    id: number,
    name: string,
    region: string,
    official: boolean,
    currentMap: string
    agentCount: number,
    maxAgents: number,
}

export default function RoomCard( { id, name, region, official, currentMap, agentCount, maxAgents } : RoomCardProps) {
    return (
            <div className="card w-96 bg-base-100 shadow-xl max-w-full">
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <div className="flex gap-2">
                        <div className="badge badge-accent">{region}</div>  
                        {official ? <div className="badge badge-primary">Official</div> : <div className="badge badge-secondary">Custom</div> }
                        <div className="badge gap-2"><FaUserAlt /> {agentCount}/{maxAgents}</div>               
                    </div>
                    <p>{currentMap}</p>
                </div>
            </div>
    )
}