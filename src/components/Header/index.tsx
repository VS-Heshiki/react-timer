import { HeaderStyles } from './styles'
import vshLogo from '@/assets/vsh-logo.png'

import { ClockCounterClockwise, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header () {
    return (
        <HeaderStyles>
            <img src={ vshLogo } />
            <nav>
                <NavLink to='/' title='timer'>
                    <Timer size={ 30 } />
                </NavLink>
                <NavLink to='/history' title='history'>
                    <ClockCounterClockwise size={ 30 } />
                </NavLink>
            </nav>
        </HeaderStyles>
    )
}
