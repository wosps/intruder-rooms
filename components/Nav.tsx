import Link from 'next/link'
import Steam from '@/components/Steam'
import router from '@/lib/router'
import { NextApiRequest, NextApiResponse } from "next";

import type { SteamProfile } from '@/lib/passport'
import type { NextSteamAuthApiRequest } from "@/lib/router"

export default function Nav({ user }: {user: SteamProfile}) {
    return (
        <div className="navbar bg-base-100">
        <div className='md:max-w-3xl md:mx-auto flex-1'>
        <div className="flex-1">
            <Link href="/" className="btn btn-ghost normal-case text-xl">Intruder Rooms</Link>
        </div>
        <div className="flex-none">
            <Steam user={user} />
        </div>
        </div>
        </div>
    )
}