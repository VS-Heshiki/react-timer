import { HomeStyle, ButtonStartStyle, ButtonInterruptStyle } from '@/pages/home/styles'
import { validationResolver } from '@/pages/home/validation'
import { HandPalm, Play } from 'phosphor-react'
import { createContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as uuid from 'uuid'
import { FormStyle } from '@/pages/home/components/FormStyle'
import { TimerStyle } from '@/pages/home/components/TimerStyle'

type InputTimer = {
    task: string
    durationInMinutes: number
}

type Cycle = {
    id: string
    task: string
    durationInMinutes: number
    startDate: Date
    status: 'running' | 'completed' | 'interrupted'
    statusDate?: Date
}

type TimerContextTypes = {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    setCompletedTask: () => void
}

export const TimerContext = createContext({} as TimerContextTypes)

export function Home () {
    const { register, handleSubmit, watch, reset } = useForm<InputTimer>({
        resolver: validationResolver,
        defaultValues: {
            task: '',
            durationInMinutes: 0
        }
    })

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

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const handleFormSubmit = (data: InputTimer) => {
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

        reset()
    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const isDisabledButton = !watch('task')

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
        <HomeStyle>
            <form onSubmit={ handleSubmit(handleFormSubmit) }>

                <FormStyle />
                <TimerContext.Provider value={ { activeCycle, activeCycleId, setCompletedTask } }>
                    <TimerStyle />
                </TimerContext.Provider>
                { activeCycle ? (
                    <ButtonInterruptStyle onClick={ handleInterruptTimer }>
                        <HandPalm size={ 24 } />
                        Interrupt!
                    </ButtonInterruptStyle>
                ) : (
                    <ButtonStartStyle disabled={ isDisabledButton } type='submit'>
                        <Play size={ 24 } />
                        Start!
                    </ButtonStartStyle>
                ) }
            </form>
        </HomeStyle>
    )
}
