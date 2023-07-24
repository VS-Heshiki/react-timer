import { DefaultLayout } from './layouts/DefaultLayout'

import { Route, Routes } from 'react-router-dom'

export function Router () {
    return (
        <Routes>
            <Route path='/' element={ <DefaultLayout /> }>
                {/* <Route path='/' element={ } /> */ }
            </Route>
        </Routes>
    )
}
