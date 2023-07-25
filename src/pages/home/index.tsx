import { HomeStyle, TextStyle, InputProject, InputDurationInMinutes, TimerStyle, SeparatorStyle, ButtonStartStyle } from '@/pages/home/style'
import { validationResolver } from '@/pages/home/validation'
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

type InputTimer = {
    project: string
    durationInMinutes: number
}

export function Home () {
    const { register, handleSubmit, watch, reset } = useForm<InputTimer>({
        resolver: validationResolver,
        defaultValues: {
            project: '',
            durationInMinutes: 0
        }
    })

    const handleReloadSubmit = (data: InputTimer) => {
        console.log(data)
        reset()
    }

    const isDisabledButton = !watch('project')

    return (
        <HomeStyle>
            <form onSubmit={ handleSubmit(handleReloadSubmit) }>
                <TextStyle>
                    <label htmlFor='project'>I'll work in</label>
                    <InputProject type='text' id='project' list='project-suggestions' minLength={ 3 } placeholder='give a name to your project' { ...register('project') } />

                    <datalist id='project-suggestions'>
                        <option value="Project !" />
                        <option value="Project !" />
                        <option value="Project !" />
                        <option value="Project !" />
                    </datalist>

                    <label htmlFor='durationInMinutes'>during</label>
                    <InputDurationInMinutes type='number' id='durationInMinutes' placeholder='5' step={ 5 } min={ 5 } max={ 60 } { ...register('durationInMinutes', { valueAsNumber: true }) } />
                    <span>minutes.</span>
                </TextStyle>

                <TimerStyle>
                    <span>0</span>
                    <span>0</span>
                    <SeparatorStyle>:</SeparatorStyle>
                    <span>0</span>
                    <span>0</span>
                </TimerStyle>

                <ButtonStartStyle disabled={ isDisabledButton } type='submit'>
                    <Play size={ 24 } />
                    Start!
                </ButtonStartStyle>
            </form>
        </HomeStyle>
    )
}
