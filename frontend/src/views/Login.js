import { PasswordInput, TextInput,Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import '../styles/App.scss';

export default function Login(){

    async function fetchData(login, password) {
        await fetch("http://localhost:9000/api/auth/authUser", {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
            })
            .then(async res => {
                const tokenObject = await res.json();
                const response = await fetch('http://localhost:9000/api/db/users/', {
                    method: "GET",
                    headers: {
                        "authorization": `Bearer ${tokenObject.token}`
                    }
                });
                const data = await response;
                console.log(data);
                })
                .catch(err => {
                    console.error(err);
                });

        
    }
    
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
          login: '',
          password: '',
        },
    
        // validate: {
        //     login: (value) =>
        //     logDB.filter(data => data.login === value).length > 0 ? null : 'Nie ma podanego loginu w bazie',
        //     password: (value, values) =>
        //     logDB.find((data) => data.login === values.login && data.password === value) ? null : 'Hasło jest niepoprawne'
        // },
      });

    return(
        <div className='container'>
            <div className='inputContainer'>
                <form onSubmit={form.onSubmit((values) => {fetchData(values.login, values.password)})}>
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