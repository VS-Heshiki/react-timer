import { FormContext } from '@/pages/home'
import { InputDurationInMinutes, InputStyle, InputTask } from '@/pages/home/components/FormStyle/styles'
import { useFormContext } from 'react-hook-form'
import { useContext } from 'react'

export function FormStyle () {
    const { register } = useFormContext()
    const { activeCycle } = useContext(FormContext)

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
