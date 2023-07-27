export type Cycle = {
    id: string
    task: string
    durationInMinutes: number
    startDate: Date
    status: 'running' | 'completed' | 'interrupted'
    statusDate?: Date
}
