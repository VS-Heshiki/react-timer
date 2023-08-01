import { Cycle, CycleContextTypes, NewCycle } from '@/contexts/models'
import { ActionTypes } from '@/reducers/actionTypes'
import { CycleReducer } from '@/reducers/cycleReducer'
import { differenceInSeconds } from 'date-fns'
import { ReactNode, createContext, useEffect, useReducer, useState } from 'react'

import * as uuid from 'uuid'

export const CycleContext = createContext({} as CycleContextTypes)

type ChildrenCycleContext = {
    children: ReactNode
}

export function CycleContextProvider ({ children }: ChildrenCycleContext) {
    const [cyclesState, dispatch] = useReducer(CycleReducer, {
        cycles: [],
        activeCycleId: null
    }, (initialState) => {
        const cyclesAsJSON = localStorage.getItem('@react-timer:timer-cycles=1.0.0')

        if (cyclesAsJSON) {
            return JSON.parse(cyclesAsJSON)
        }

        return initialState
    })

    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const [secondsPassed, setSecondsPassed] = useState(() => {
        if (activeCycle) {
            const differenceSeconds = differenceInSeconds(new Date(), new Date(activeCycle.startDate))
            return differenceSeconds
        }
        return 0
    })

    const setSecondsPassedState = (seconds: number) => {
        setSecondsPassed(seconds)
    }

    useEffect(() => {
        const cyclesJSON = JSON.stringify(cyclesState)
        localStorage.setItem('@react-timer:timer-cycles=1.0.0', cyclesJSON)
    }, [cyclesState])

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
