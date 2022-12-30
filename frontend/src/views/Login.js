import { PasswordInput, TextInput,Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import '../styles/App.scss';

export default function Login(){
    const logDB = [{login: "admin", password:"admin"},{login: "jakub", password:"123456"},{login: "login", password:"password"}]

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
          login: '',
          password: '',
        },
    
        validate: {
            login: (value) =>
            logDB.filter(data => data.login === value).length > 0 ? null : 'Nie ma podanego loginu w bazie',
            password: (value, values) =>
            logDB.find((data) => data.login === values.login && data.password === value) ? null : 'Hasło jest niepoprawne'
        },
      });

    return(
        <div className='container'>
            <div className='inputContainer'>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                        placeholder=" Wpisz Login"
                        label="Login"
                        variant="filled"
                        withAsterisknpm
                        {...form.getInputProps('login')}
                    />
                    <PasswordInput
                        placeholder="Wpisz Hasło"
                        label="Hasło"
                        variant="filled"
                        withAsterisknpm
                        {...form.getInputProps('password')}
                    />
                    <Button type="submit" fullWidth variant="gradient" gradient={{ from: 'dark', to: 'black', deg: 200 }}>Zaloguj</Button>
                </form>
            </div> 
        </div>
    )
}