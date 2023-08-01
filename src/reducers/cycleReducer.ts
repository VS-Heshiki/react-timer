/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CycleState } from '@/contexts/models'
import { ActionTypes } from '@/reducers/actionTypes'

import { produce } from 'immer'

export function CycleReducer (state: CycleState, action: any) {
    switch (action.type) {
        case ActionTypes.CREATE_NEW_CYCLE: {
            return produce(state, (draft) => {
                draft.cycles.push(action.payload.newCycle)
                draft.activeCycleId = action.payload.newCycle.id
            })
        }

        case ActionTypes.SET_COMPLETED_TASK: {
            const activeCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

            if (activeCycleIndex < 0) {
                return state
            }

            return produce(state, (draft) => {
                draft.cycles[activeCycleIndex].status = 'completed'
                draft.activeCycleId = null
            })
        }

        case ActionTypes.SET_INTERRUPTED_TASK: {
            const activeCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

            if (activeCycleIndex < 0) {
                return state
            }

            return produce(state, (draft) => {
                draft.cycles[activeCycleIndex].status = 'interrupted'
                draft.activeCycleId = null
            })
        }

        default:
            return state
    }
}
