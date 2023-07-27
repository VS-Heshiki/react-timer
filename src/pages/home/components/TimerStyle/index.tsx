import { TimerContext } from '@/pages/home'
import { SeparatorStyle, TimerComponentStyle } from '@/pages/home/components/TimerStyle/styles'
import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'

export function TimerStyle () {
    const { activeCycle, activeCycleId, secondsPassed, setCompletedTask, setSecondsPassedState } = useContext(TimerContext)

    const totalSeconds = activeCycle ? activeCycle.durationInMinutes * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

    const minutesRemaining = Math.floor(currentSeconds / 60)
    const secondsRemaining = currentSeconds % 60

    const minutes = String(minutesRemaining).padStart(2, '0')
    const seconds = String(secondsRemaining).padStart(2, '0')

    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                const differenceSeconds = differenceInSeconds(new Date(), activeCycle.startDate)
                if (differenceSeconds >= totalSeconds) {
                    setCompletedTask()
                } else {
                    setSecondsPassedState(differenceSeconds)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, activeCycleId, setCompletedTask, setSecondsPassedState, totalSeconds])

    useEffect(() => {
        if (activeCycle?.status === 'running') {
            document.title = `
                ${activeCycle.task} - ${minutes}:${seconds}
            `
        } else {
            document.title = 'React Timer'
        }
    }, [activeCycle, minutes, seconds])

    return (
        <TimerComponentStyle>
            <span>{ minutes[0] }</span>
            <span>{ minutes[1] }</span>
            <SeparatorStyle>:</SeparatorStyle>
            <span>{ seconds[0] }</span>
            <span>{ seconds[1] }</span>
        </TimerComponentStyle>
    )
}
