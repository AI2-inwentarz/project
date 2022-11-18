import { PasswordInput, TextInput,Button } from '@mantine/core';
import '../styles/App.scss';

export default function Login(){
    return(
        <div className='container'>
            <div className='inputContainer'>
                <TextInput
                    placeholder=" Wpisz Login"
                    label="Login"
                    withAsterisknpm
                />
                <PasswordInput
                    placeholder="Wpisz Hasło"
                    label="Hasło"
                    withAsterisknpm
                />
                <Button type="submit" fullWidth variant="gradient" gradient={{ from: 'dark', to: 'black', deg: 200 }}>Zaloguj</Button>
            </div> 
        </div>
    )
}