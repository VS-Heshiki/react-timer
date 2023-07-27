import { HomeStyle, ButtonStartStyle, ButtonInterruptStyle } from '@/pages/home/styles'
import { validationResolver } from '@/pages/home/validation'
import { HandPalm, Play } from 'phosphor-react'
import { createContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as uuid from 'uuid'
import { FormStyle } from '@/pages/home/components/FormStyle'
import { TimerStyle } from '@/pages/home/components/TimerStyle'

type InputTimer = {
    task: string
    durationInMinutes: number
}

export type Cycle = {
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
    secondsPassed: number
    setSecondsPassedState: (seconds: number) => void
    setCompletedTask: () => void
}

export const TimerContext = createContext({} as TimerContextTypes)

export function Home () {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [secondsPassed, setSecondsPassed] = useState(0)
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const TimerForm = useForm<InputTimer>({
        resolver: validationResolver,
        defaultValues: {
            task: '',
            durationInMinutes: 0
        }
    })

    const { handleSubmit, watch, reset } = TimerForm

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

    const disabledButton = watch('task')
    const buttonIsDisabled = !disabledButton

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
                <FormProvider { ...TimerForm } >
                    <FormStyle activeCycle={ activeCycle } />
                </FormProvider>
                <TimerContext.Provider value={ { activeCycle, activeCycleId, secondsPassed, setSecondsPassedState, setCompletedTask } }>
                    <TimerStyle />
                </TimerContext.Provider>
                { activeCycle ? (
                    <ButtonInterruptStyle onClick={ handleInterruptTimer }>
                        <HandPalm size={ 24 } />
                        Interrupt!
                    </ButtonInterruptStyle>
                ) : (
                    <ButtonStartStyle disabled={ buttonIsDisabled } type='submit'>
                        <Play size={ 24 } />
                        Start!
                    </ButtonStartStyle>
                ) }
            </form>
        </HomeStyle>
    )
}
