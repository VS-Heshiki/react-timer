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

const InputBaseStyle = styled.input`
    background-color: transparent;
    border: none;
    border-bottom: 2px solid ${props => props.theme['gray-500']};
    color: ${props => props.theme['gray-100']};
    padding: 0 0.5rem;
    font-size: 1.125rem;
    font-weight: bold;

    &::placeholder {
        color: ${props => props.theme['gray-500']};
        text-align: center;
    }

    &:focus {
        box-shadow: none;
        border-color: ${props => props.theme['purple-500']};
    }
`

export const InputProject = styled(InputBaseStyle)`
    flex: 1;
`

export const InputDurationInMinutes = styled(InputBaseStyle)`
    width: 4rem;
`

export const TextStyle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
    color: ${props => props.theme['gray-100']};
`

export const TimerStyle = styled.div`
    font-size: 10rem;
    line-height: 8rem;
    font-family: 'JetBrains Mono', monospace;
    color: ${props => props.theme['gray-100']};

    display: flex;
    gap: 1rem;

    span {
        background: ${props => props.theme['gray-700']};
        padding: 2rem 1rem;
        border-radius: 8px;
    }
`

export const SeparatorStyle = styled.div`
    padding: 2rem 0;
    color: ${props => props.theme['purple-500']};

    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
`

export const ButtonStartStyle = styled.button`
    width: 100%;
    padding: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    font-weight: bold;

    background: ${props => props.theme['purple-500']};
    color: ${props => props.theme['gray-100']};
    border-radius: 8px;
    border: 0;

    cursor: pointer;

    transition: .2s;

    &:not(:disabled):hover {
        background: ${props => props.theme['purple-700']};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`
