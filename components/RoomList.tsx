import { useEffect, useState } from "react"
import { FaUserAlt } from "react-icons/fa"

export default function RoomList( { data }) {

    const [rooms, setRooms] = useState(data)

    return (
        <div className="py-3 px-6 bg-base-200">
                <div className="text-lg flex gap-3 pb-3 border-b-2 border-gray-700">
                    <h1 className=" font-medium">Current Rooms</h1>
                    <select className="select select-bordered select-sm w-20">
                        <option selected>All</option>
                        <option disabled>EU</option>
                        <option disabled>US</option>
                        <option disabled>Asia</option>
                        <option disabled>JP</option>
                        <option disabled>AU</option>
                        <option disabled>USW</option>
                        <option disabled>SA</option>
                        <option disabled>CAE</option>
                        <option disabled>KR</option>
                        <option disabled>IN</option>
                        <option disabled>RU</option>
                    </select>
                </div>
                <div className="py-3 flex gap-5">
                    <div>
                        <div className="stat-title">Active Rooms</div>
                        <div className="stat-value">{rooms.totalCount}</div>
                    </div>
                    <div>
                        <div className="stat-title">Current Players</div>
                        <div className="stat-value">?</div>
                    </div>
                </div>
        
                <div className="flex flex-col gap-3">
                {data.data.map((room) => (
                    <div className="card w-96 bg-base-100 shadow-xl max-w-full" key={room.id}>
                        <div className="card-body">
                            <h2 className="card-title">{room.name}</h2>
                            <div className="flex gap-2">
                                <div className="badge badge-accent">{room.region}</div>  
                                {room.official ? <div className="badge badge-primary">Official</div> : <div className="badge badge-secondary">Custom</div> }
                                <div className="badge gap-2"><FaUserAlt /> {room.agentCount}/{room.maxAgents}</div>               
                            </div>
                            <p>{room.currentMap.name}</p>
                        </div>
                    </div>
                ))}
                </div>

        </div>
    )
}