import { Home } from '@/pages/home'
import { History } from '@/pages/history'
import { DefaultLayout } from './layouts/DefaultLayout'

import { Route, Routes } from 'react-router-dom'

export function Router () {
    return (
        <Routes>
            <Route path='/' element={ <DefaultLayout /> }>
                { <Route path='/' element={ <Home /> } /> }
                { <Route path='/history' element={ <History /> } /> }
            </Route>
        </Routes>
    )
}
