import { HomeStyle, ButtonStartStyle, ButtonInterruptStyle } from '@/pages/home/styles'
import { validationResolver } from '@/pages/home/validation'
import { FormStyle } from '@/pages/home/components/FormStyle'
import { TimerStyle } from '@/pages/home/components/TimerStyle'
import { CycleContext } from '@/contexts/CycleContext'

import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { useContext } from 'react'

type InputTimer = {
    task: string
    durationInMinutes: number
}

export function Home () {
    const { handleInterruptTimer, createNewCycle, activeCycle } = useContext(CycleContext)

    const TimerForm = useForm<InputTimer>({
        resolver: validationResolver,
        defaultValues: {
            task: '',
            durationInMinutes: 0
        }
    })

    const { handleSubmit, watch, reset } = TimerForm
    const disabledButton = watch('task')
    const buttonIsDisabled = !disabledButton

    const handleCreateNewCycle = (data: InputTimer) => {
        createNewCycle(data)
        reset()
    }

    return (
        <HomeStyle>
            <form onSubmit={ handleSubmit(handleCreateNewCycle) }>
                <FormProvider { ...TimerForm } >
                    <FormStyle activeCycle={ activeCycle } />
                </FormProvider>
                <TimerStyle />
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
