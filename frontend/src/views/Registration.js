import { TextInput, PasswordInput, Button, MantineProvider } from '@mantine/core';
import { showNotification, NotificationsProvider } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom";

import '../styles/App.scss';

export default function Registration() {

    const navigate = useNavigate();

    async function fetchData(email, login, name, surname,phone, password) {
        await fetch("http://localhost:9000/api/auth/registerUser", {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                email: email,
                login: login,
                name: name,
                surname: surname,
                phone: phone,
                password: password,
            })
            
            })
            .then(async res => {
                const status = res.status;

                const resObject = await res.json();
                console.log(resObject);

                if(resObject.message === "User Created"){
                    setTimeout(changePage, 3000);

                    function changePage() {
                        navigate("/");
                        window.location.reload(true);
                    }

                    showNotification({
                        title: 'Gratulacje',
                        message: `${login} zostałeś zarejestrowany!`,
                      })
                }

                // if(!tokenObject.token){
                //     if(tokenObject.message === "Bad username") 
                //     if(tokenObject.message === "Bad password") 
                // }
                // else{
                //     error = [];
                //     localStorage.setItem("token", tokenObject.token);
                //     navigate("/");
                //     window.location.reload(true);
                // } 
                
            }) 
    }
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
          email: '',
          login: '',
          name: '',
          surname: '',
          phone: '',
          password: '',
          confirmPassword: '',
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Nieprawidłowy adres'),
          phone: (value) => (/^(\d{9}|)$/.test(value) ? null : 'Nieprawidłowy format numeru telefonu'), 
          login: (value) => (value.length < 4 ? 'Zbyt krótki login' : null),
          password: (value) => (value.length < 8 ? 'Zbyt krótkie hasło' : null),
          confirmPassword: (value, values) =>
            value !== values.password ? 'Hasła nie są identyczne' : null
          },
      });
    
    return (
        <MantineProvider withNormalizeCSS withGlobalStyles>
        <NotificationsProvider>
        <div className='container'>
            <div className='inputContainer'>
                <form onSubmit={form.onSubmit((values) => fetchData(values.email, values.login, values.name, values.surname, values.phone, values.password))}>
                    <TextInput
                        placeholder="Wpisz login"
                        label="Login"
                        description="Login musi mieć co najmniej 4 znaki"
                        variant="filled"
                        withAsterisk
                        {...form.getInputProps('login')}
                    />
                    <TextInput
                        placeholder="Wpisz maila"
                        label="Email"
                        variant="filled"
                        withAsterisk
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        placeholder="Wpisz imie"
                        label="Imie"
                        variant="filled"
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        placeholder="Wpisz nazwisko"
                        label="Nazwisko"
                        variant="filled"
                        {...form.getInputProps('surname')}
                    />
                    <TextInput
                        placeholder="Wpisz numer telefonu"
                        label="Telefon"
                        variant="filled"
                        {...form.getInputProps('phone')}
                    />
                    <PasswordInput
                        placeholder="Wpisz hasło"
                        label="Hasło"
                        description="Hasło musi mieć co najmniej 8 znaków"
                        variant="filled"
                        withAsterisk
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        placeholder="Wpisz ponownie hasło"
                        label="Potwierdź hasło"
                        variant="filled"
                        withAsterisk
                        {...form.getInputProps('confirmPassword')}
                    />
                    <Button type="submit" fullWidth variant="gradient" gradient={{ from: 'dark', to: 'black', deg: 200 }}>
                        Wyślij
                    </Button>
                </form>
            </div>
        </div>
        </NotificationsProvider>
    </MantineProvider>
    );
}