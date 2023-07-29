import { Cycle, CycleContextTypes, NewCycle } from '@/contexts/models'
import { ActionTypes } from '@/reducers/actionTypes'
import { CycleReducer } from '@/reducers/cycleReducer'
import { ReactNode, createContext, useReducer, useState } from 'react'

import * as uuid from 'uuid'

export const CycleContext = createContext({} as CycleContextTypes)

type ChildrenCycleContext = {
    children: ReactNode
}

export function CycleContextProvider ({ children }: ChildrenCycleContext) {
    const [cyclesState, dispatch] = useReducer(CycleReducer, {
        cycles: [],
        activeCycleId: null
    })

    const [secondsPassed, setSecondsPassed] = useState(0)
    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const setSecondsPassedState = (seconds: number) => {
        setSecondsPassed(seconds)
    }

    const createNewCycle = (data: NewCycle) => {
        const newCycle: Cycle = {
            id: uuid.v4(),
            task: data.task,
            durationInMinutes: data.durationInMinutes,
            startDate: new Date(),
            status: 'running'
        }

        dispatch({
            type: ActionTypes.CREATE_NEW_CYCLE,
            payload: {
                newCycle
            }
        })
    }

    const setCompletedTask = () => {
        dispatch({
            type: ActionTypes.SET_COMPLETED_TASK
        })
    }

    const handleInterruptTimer = () => {
        dispatch({
            type: ActionTypes.SET_INTERRUPTED_TASK
        })
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
