import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/Global.styles'

export function App () {
    return (
        <ThemeProvider theme={ defaultTheme }>

            <GlobalStyles />
        </ThemeProvider>
    )
}
