import styled from 'styled-components'

export const HomeStyle = styled.main`
    flex: 1;

    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`

export const DefaultButtonStyle = styled.button`
    width: 100%;
    padding: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    font-weight: bold;

    color: ${props => props.theme['gray-100']};
    border-radius: 8px;
    border: 0;

    cursor: pointer;

    transition: .2s;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`

export const ButtonStartStyle = styled(DefaultButtonStyle)`
    background: ${props => props.theme['purple-500']};

    &:not(:disabled):hover {
        background: ${props => props.theme['purple-700']};
    }
`

export const ButtonInterruptStyle = styled(DefaultButtonStyle)`
    background: ${props => props.theme['red-500']};

    &:hover {
        background: ${props => props.theme['red-700']};
    }
`
