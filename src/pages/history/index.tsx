import { HistoryStyle, HistoryTableStyle, StatusStyle } from '@/pages/history/style'

export function History () {
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
                        <tr>
                            <td>Name task</td>
                            <td>20 Minutes</td>
                            <td>2 Months ago</td>
                            <td>
                                <StatusStyle statusColor='green'>
                                    Completed
                                </StatusStyle>
                            </td>
                        </tr>
                        <tr>
                            <td>Name task</td>
                            <td>20 Minutes</td>
                            <td>2 Months ago</td>
                            <td>
                                <StatusStyle statusColor='green'>
                                    Completed
                                </StatusStyle>
                            </td>
                        </tr>
                        <tr>
                            <td>Name task</td>
                            <td>20 Minutes</td>
                            <td>2 Months ago</td>
                            <td>
                                <StatusStyle statusColor='green'>
                                    Completed
                                </StatusStyle>
                            </td>
                        </tr>
                        <tr>
                            <td>Name task</td>
                            <td>20 Minutes</td>
                            <td>2 Months ago</td>
                            <td>
                                <StatusStyle statusColor='yellow'>
                                    In progress
                                </StatusStyle>
                            </td>
                        </tr>
                        <tr>
                            <td>Name task</td>
                            <td>20 Minutes</td>
                            <td>2 Months ago</td>
                            <td>
                                <StatusStyle statusColor='red'>
                                    Interrupted
                                </StatusStyle>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HistoryTableStyle>
        </HistoryStyle>
    )
}
