import { HomeStyle, TextStyle, InputTask, InputDurationInMinutes, TimerStyle, SeparatorStyle, ButtonStartStyle, ButtonInterruptStyle } from '@/pages/home/style'
import { validationResolver } from '@/pages/home/validation'
import { HandPalm, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { differenceInSeconds } from 'date-fns'
import * as uuid from 'uuid'

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

export function Home () {
    const { register, handleSubmit, watch, reset } = useForm<InputTimer>({
        resolver: validationResolver,
        defaultValues: {
            task: '',
            durationInMinutes: 0
        }
    })

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [secondsPassed, setSecondsPassed] = useState(0)

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

    const totalSeconds = activeCycle ? activeCycle.durationInMinutes * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                const differenceSeconds = differenceInSeconds(new Date(), activeCycle.startDate)
                if (differenceSeconds >= totalSeconds) {
                    setCycles(state => state.map(cycle => {
                        if (cycle.id === activeCycleId) {
                            return { ...cycle, status: 'completed', statusDate: new Date() }
                        } else {
                            return cycle
                        }
                    }))
                    setActiveCycleId(null)
                } else {
                    setSecondsPassed(differenceSeconds)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, activeCycleId, totalSeconds])

    console.log(cycles)

    const minutesRemaining = Math.floor(currentSeconds / 60)
    const secondsRemaining = currentSeconds % 60

    const minutes = String(minutesRemaining).padStart(2, '0')
    const seconds = String(secondsRemaining).padStart(2, '0')

    const isDisabledButton = !watch('task')

    useEffect(() => {
        if (activeCycle?.status === 'running') {
            document.title = `
                ${activeCycle.task} - ${minutes}:${seconds}
            `
        } else {
            document.title = 'React Timer'
        }
    }, [activeCycle, minutes, seconds])

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
                <TextStyle>
                    <label htmlFor='task'>I'll work in</label>
                    <InputTask type='text' id='task' list='task-suggestions' disabled={ !!activeCycle } minLength={ 3 } placeholder='give a name to your task' { ...register('task') } />

                    <datalist id='task-suggestions'>
                        <option value="Task !" />
                        <option value="Task !" />
                        <option value="Task !" />
                        <option value="Task !" />
                    </datalist>

                    <label htmlFor='durationInMinutes'>during</label>
                    <InputDurationInMinutes type='number' id='durationInMinutes' disabled={ !!activeCycle } placeholder='5' step={ 5 } min={ 5 } max={ 60 } { ...register('durationInMinutes', { valueAsNumber: true }) } />
                    <span>minutes.</span>
                </TextStyle>

                <TimerStyle>
                    <span>{ minutes[0] }</span>
                    <span>{ minutes[1] }</span>
                    <SeparatorStyle>:</SeparatorStyle>
                    <span>{ seconds[0] }</span>
                    <span>{ seconds[1] }</span>
                </TimerStyle>

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
