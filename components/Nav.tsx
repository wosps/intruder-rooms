import Link from 'next/link'
import { FaSteamSymbol } from 'react-icons/fa'

export default function Nav() {
    return (
        <div className="navbar bg-base-100">
        <div className='md:max-w-3xl md:mx-auto flex-1'>
        <div className="flex-1">
            <Link href="/" className="btn btn-ghost normal-case text-xl">Intruder Rooms</Link>
        </div>
        <div className="flex-none">
            <button className="btn btn-sm btn-outline" disabled><FaSteamSymbol className="mr-2"/>Sign In</button>
        </div>
        </div>
        </div>
    )
}