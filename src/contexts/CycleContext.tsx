import { Cycle, CycleContextTypes, NewCycle } from '@/contexts/models'
import { ReactNode, createContext, useState } from 'react'
import * as uuid from 'uuid'

export const CycleContext = createContext({} as CycleContextTypes)

type ChildrenCycleContext = {
    children: ReactNode
}

export function CycleContextProvider ({ children }: ChildrenCycleContext) {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [secondsPassed, setSecondsPassed] = useState(0)
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const setSecondsPassedState = (seconds: number) => {
        setSecondsPassed(seconds)
    }

    const setCompletedTask = () => {
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, status: 'completed', statusDate: new Date() }
            } else {
                return cycle
            }
        }))
        setActiveCycleId(null)
    }

    const createNewCycle = (data: NewCycle) => {
        const newCycle: Cycle = {
            id: uuid.v4(),
            task: data.task,
            durationInMinutes: data.durationInMinutes,
            startDate: new Date(),
            status: 'running'
        }

        setCycles(state => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        setSecondsPassed(0)
    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const handleInterruptTimer = () => {
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, status: 'interrupted', statusDate: new Date() }
            } else {
                return cycle
            }
        }))
        setActiveCycleId(null)
    }


    return (
        <CycleContext.Provider
            value={ {
                cycles,
                activeCycle,
                activeCycleId,
                secondsPassed,
                createNewCycle,
                handleInterruptTimer,
                setSecondsPassedState,
                setCompletedTask
            } }
        >
            { children }
        </CycleContext.Provider>
    )
}
