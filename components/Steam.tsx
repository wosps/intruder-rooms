import Link from "next/link";
import { FaSteamSymbol } from 'react-icons/fa'
import type { SteamProfile } from '../lib/passport'


export default function Steam({ user }: {user: SteamProfile}) {
	return <div>
        { user ? 
        <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={user.photos[2].value} />
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <Link href={"/profile/" + user.id}>Profile</Link>
          </li>
          <li><Link href="/api/auth/logout">Logout</Link></li>
        </ul>
      </div> : 
        <Link href="/api/auth/login"><button className="btn btn-sm btn-outline"><FaSteamSymbol className="mr-2"/>Sign In</button></Link>}
    </div>

}