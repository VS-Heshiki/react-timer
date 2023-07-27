import { Cycle, NewCycle } from '@/contexts/models'

export type CycleContextTypes = {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    secondsPassed: number
    setSecondsPassedState: (seconds: number) => void
    createNewCycle: (data: NewCycle) => void
    handleInterruptTimer: () => void
    setCompletedTask: () => void
}
