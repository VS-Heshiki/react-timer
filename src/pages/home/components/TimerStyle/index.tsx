import { SeparatorStyle, TimerComponentStyle } from '@/pages/home/components/TimerStyle/styles'

export function TimerStyle () {
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
