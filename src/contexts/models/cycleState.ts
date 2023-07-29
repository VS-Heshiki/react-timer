import { Cycle } from '@/contexts/models'

export type CycleState = {
    cycles: Cycle[]
    activeCycleId: string | null
}
