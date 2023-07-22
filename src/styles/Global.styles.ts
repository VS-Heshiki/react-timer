import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        background-color: ${props => props.theme['gray-900']};
        color: ${props => props.theme['white']};

        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`
