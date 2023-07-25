import { HomeStyle, TextStyle, InputProject, InputDurationInMinutes, TimerStyle, SeparatorStyle, ButtonStartStyle } from '@/pages/home/style'
import { Play } from 'phosphor-react'

export function Home () {
    return (
        <HomeStyle>
            <form action="">
                <TextStyle>
                    <label htmlFor='project'>I'll work in</label>
                    <InputProject type='text' id='project' list='project-suggestions' placeholder='give a name to your project' />

                    <datalist id='project-suggestions'>
                        <option value="Project !" />
                        <option value="Project !" />
                        <option value="Project !" />
                        <option value="Project !" />
                    </datalist>

                    <label htmlFor='durationInMinutes'>during</label>
                    <InputDurationInMinutes type='number' id='durationInMinutes' placeholder='00' step={ 5 } min={ 5 } max={ 60 } />
                    <span>minutes.</span>
                </TextStyle>

                <TimerStyle>
                    <span>0</span>
                    <span>0</span>
                    <SeparatorStyle>:</SeparatorStyle>
                    <span>0</span>
                    <span>0</span>
                </TimerStyle>

                <ButtonStartStyle disabled type='submit'>
                    <Play size={ 24 } />
                    Start!
                </ButtonStartStyle>
            </form>
        </HomeStyle>
    )
}
