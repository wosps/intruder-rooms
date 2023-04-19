import { useEffect, useState } from "react"
import { FaUserAlt } from "react-icons/fa"
import RoomCard from "./RoomCard"

type RoomListProps = {
    data: any,
}

type RoomListData = {
    data: any,
    totalCount: number,
}

type roomType = {
    id: number,
    name: string,
    region: string,
    official: boolean,
    currentMap: {
        name: string
    },
    agentCount: number,
    maxAgents: number,
}

export default function RoomList( { data } : RoomListProps) {

    const [rooms, setRooms] = useState(data as RoomListData)
    const [playerCount, setPlayerCount] = useState(0)

    function makeRoomList() {
        const roomElements = data.data.map((roomFound: any) => {
            return(<RoomCard key={roomFound.id} id={roomFound.id} name={roomFound.name} region={roomFound.region} official={roomFound.official} currentMap={roomFound.currentMap.name} agentCount={roomFound.agentCount} maxAgents={roomFound.maxAgents} creator={roomFound.creator.name}/>)
        })
        return roomElements
    }

    useEffect(() => {

        function getPlayerCount() {
            setRooms(data)
            let count = 0
            data.data.forEach((room: roomType) => {
                count += room.agentCount
            })
            setPlayerCount(count)
        }

        getPlayerCount()

    }, [rooms])

    return (
        <div className="py-3 px-6 bg-base-200">
            <div className="md:max-w-3xl md:mx-auto">
                <div className="text-lg flex gap-3 pb-3 border-b-2 border-gray-700">
                    <h1 className=" font-medium">Current Rooms</h1>
                    <select defaultValue={"All"} className="select select-bordered select-sm w-20">
                        <option>All</option>
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
                <div className="py-3 flex gap-5 border-b-2 border-gray-700">
                    <div>
                        <div className="stat-title">Active Rooms</div>
                        <div className="stat-value">{rooms.totalCount}</div>
                    </div>
                    <div>
                        <div className="stat-title">Current Players</div>
                        <div className="stat-value">{playerCount}</div>
                    </div>
                </div>
        
                <div className="grid grid-cols-1 gap-3 pt-3 md:grid-cols-2 lg:grid-cols-2 items-start">
                {makeRoomList()}
                </div>
            </div>
        </div>
    )
}