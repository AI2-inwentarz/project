import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

import '../styles/App.scss';

export default function Registration() {
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
          email: '',
          login: '',
          name: '',
          surname: '',
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
        <div className='container'>
            <div className='inputContainer'>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
    );
}