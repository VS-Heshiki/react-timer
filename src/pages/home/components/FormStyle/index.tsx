import { Cycle } from '@/contexts/models'
import { InputDurationInMinutes, InputStyle, InputTask } from '@/pages/home/components/FormStyle/styles'
import { useFormContext } from 'react-hook-form'

type FormStyleProps = {
    activeCycle: Cycle | undefined
}

export function FormStyle ({ activeCycle }: FormStyleProps) {
    const { register } = useFormContext()
    return (
        <InputStyle>
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
        </InputStyle>
    )
}
