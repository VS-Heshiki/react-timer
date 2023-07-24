import { Header } from '@/components/Header'
import { DefaultLayoutStyle } from './styles'

import { Outlet } from 'react-router-dom'

export function DefaultLayout () {
    return (
        <DefaultLayoutStyle>
            <Header />
            <Outlet />
        </DefaultLayoutStyle>
    )
}
