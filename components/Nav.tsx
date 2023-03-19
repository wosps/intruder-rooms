import Link from 'next/link'

export default function Nav() {
    return (
        <div className="navbar bg-base-100">
        <div className="flex-1">
            <Link href="/" className="btn btn-ghost normal-case text-xl">Intruder Rooms</Link>
        </div>
        <div className="flex-none">
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                {/* <span className="badge badge-sm badge-error indicator-item">8</span> */}
                </div>
            </label>
            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                <span className="font-bold text-lg">Notifications</span>
                <span className=" text-slate-400">No new notifications.</span>
                </div>
            </div>
            </div>
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img src="https://pbs.twimg.com/profile_images/1609240405618352129/pFMPqi7V_400x400.jpg" />
                </div>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-36">
                <li><Link href="/profile">Profile</Link></li>
                <li><a>Logout</a></li>
            </ul>
            </div>
        </div>
        </div>
    )
}