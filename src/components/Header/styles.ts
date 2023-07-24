import styled from 'styled-components'

export const HeaderStyles = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
        width: 4rem;
        height: 4rem;
        border-radius: 8px;
    }

    nav {
        display: flex;
        gap: 0.5rem;

        a {
            width: 3rem;
            height: 3rem;

            display: flex;
            align-items: center;
            justify-content: center;

            color: ${props => props.theme['gray-100']};
            border-top: 3px solid transparent;
            border-bottom: 3px solid transparent;

            &:hover {
                border-bottom: 3px solid ${props => props.theme['purple-500']};
            }

            &.active {
                color: ${props => props.theme['purple-500']}
            }
        }
    }
`
