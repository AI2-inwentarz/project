import { TextInput, PasswordInput, Button, MantineProvider } from '@mantine/core';
import { showNotification, NotificationsProvider } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom";

import '../styles/App.scss';

let error;

export default function Registration() {

    const navigate = useNavigate();
    error = [];

    async function fetchData(email, login, name, surname,phone, password) {
        await fetch(`http://${window.location.hostname}:9000/api/auth/registerUser`, {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                email: email,
                login: login,
                name: name !== '' ? name : 'nieznane',
                surname: surname !== '' ? surname : 'nieznane',
                phone: phone,
                password: password,
            })
            
            }).then(async res => {
                const status = res.status;

                const resObject = await res.json();
                console.log(resObject);

                if(resObject.message && resObject.message !== "User Created"){
                    error.push(resObject.message);
                }

                if(resObject.message === "User Created"){
                    setTimeout(changePage, 3000);

                    function changePage() {
                        navigate("/");
                        window.location.reload(true);
                    }

                    showNotification({
                        title: 'Gratulacje',
                        message: `${login} zostałeś zarejestrowany!`,
                        color: 'green'
                      })
                } else if(resObject.message === "Email is taken"){
                    showNotification({
                        title: 'Ten email jest już zajęty',
                        message: `Niestety musisz wpisać inny email niż: ${email}`,
                        color: 'red'
                      })
                } else if(resObject.message === "Login is taken"){
                    showNotification({
                        title: 'Ten login jest już zajęty',
                        message: `Niestety musisz wpisać inny email niż: ${login}`,
                        color: 'red'
                      })
                }
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
          email: (value) => {
            if(!/^\S+@\S+$/.test(value)) return 'Nieprawidłowy adres';
            if(error.includes("Email is taken")) return "Podany email istnieje już w bazie"
          },
          phone: (value) => (/^(\d{9}|)$/.test(value) ? null : 'Nieprawidłowy format numeru telefonu'), 
          login: (value) => {
            if(value.length < 4) return 'Zbyt krótki login';
            if(error.includes("Login is taken")) return "Podany login już istnieje w bazie"
          },
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