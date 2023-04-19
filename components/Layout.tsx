import Nav from './Nav'
import type { ReactNode } from 'react'

type LayoutProps = {user: SteamProfile, children: ReactNode}
import { SteamProfile } from '@/lib/passport'

export default function Layout(props: LayoutProps & {user: SteamProfile}) {
    // console.log(user)
    return (
        <div>
            {/* <Nav user={user}/> */}
            <main>{props.children}</main>
        </div>
    )
}