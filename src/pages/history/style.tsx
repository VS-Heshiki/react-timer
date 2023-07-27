import styled from 'styled-components'

export const HistoryStyle = styled.main`
    padding: 3.5rem;

    display: flex;
    flex-direction: column;
    flex: 1;

    h1 {
        font-size: 1.5rem;
        font-weight: bold;
        color: ${props => props.theme['gray-100']};
    }
`

export const HistoryTableStyle = styled.div`
    margin-top: 2rem;
    flex: 1;
    overflow: auto;

    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;

        th {
            background-color: ${props => props.theme['gray-700']};
            color: ${props => props.theme['gray-100']};
            padding: 1rem;
            text-align: left;
            font-size: 0.875rem;
            font-weight: bold;

            &:first-child {
                border-top-left-radius: 8px ;
                padding-left: 1.5rem;
            }

            &:last-child {
                border-top-right-radius: 8px ;
                padding-left: 1.5rem;
            }
        }

        td {
            padding: 1rem;
            font-size: 0.875rem;
            border-top: 4px solid ${props => props.theme['gray-800']};
            background-color: ${props => props.theme['gray-600']};

            &:first-child {
                width: 50%;
                padding-left: 1.5rem;
            }

            &:last-child {
                padding-left: 1.5rem;
            }
        }
    }
`

const STATUS_COLORS = {
    completed: 'green-500',
    running: 'yellow-500',
    interrupted: 'red-500'
}

interface Status {
    status: keyof typeof STATUS_COLORS
}

export const StatusStyle = styled.span<Status>`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 9999px;
        background: ${props => props.theme[STATUS_COLORS[props.status]]};
    }
`
