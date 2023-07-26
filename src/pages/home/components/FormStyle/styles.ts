import styled from 'styled-components'

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

export const InputTask = styled(InputBaseStyle)`
    flex: 1;
`

export const InputDurationInMinutes = styled(InputBaseStyle)`
    width: 4rem;
`

export const InputStyle = styled.div`
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
