import { CycleContext } from '@/contexts/CycleContext'
import { HistoryStyle, HistoryTableStyle, StatusStyle } from '@/pages/history/style'
import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'

export function History () {
    const { cycles } = useContext(CycleContext)

    return (
        <HistoryStyle>
            <h1>My History</h1>
            <HistoryTableStyle>
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Duration</th>
                            <th>Start</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { cycles.map(cycle => {
                            return (
                                <tr key={ cycle.id }>
                                    <td>{ cycle.task }</td>
                                    <td>{ cycle.durationInMinutes } minutes</td>
                                    <td>{ formatDistanceToNow(cycle.startDate, { addSuffix: true }) }</td>
                                    <td>
                                        <StatusStyle status={ cycle.status }>
                                            { cycle.status }
                                        </StatusStyle>
                                    </td>
                                </tr>
                            )
                        }) }
                    </tbody>
                </table>
            </HistoryTableStyle>
        </HistoryStyle>
    )
}
