import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/Global.styles'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Router } from './Router'
import { CycleContextProvider } from '@/contexts/CycleContext'

export function App () {
    return (
        <ThemeProvider theme={ defaultTheme }>
            <BrowserRouter>
                <CycleContextProvider>
                    <Router />
                </CycleContextProvider>
            </BrowserRouter>
            <GlobalStyles />
        </ThemeProvider>
    )
}
