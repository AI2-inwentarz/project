import { useNavigate } from "react-router-dom";
import { PasswordInput, TextInput,Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import '../styles/App.scss';

export default function Login(){

    const navigate = useNavigate();


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
                // if(!localStorage.getItem("token")) 
                localStorage.setItem("token", tokenObject.token);
                if(res.ok) navigate("/");
            })
    }

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
          login: '',
          password: '',
        },
    
        // validate: {
        //     login: (value) =>
        //     users && (users.filter(data => data.login === value).length > 0 ? null : 'Nie ma podanego loginu w bazie'),
        //     password: (value, values) => {
        //         if(users && users.filter(data => data.login === value).length > 0){
        //             const user = users.find((data) => data.login === values.login);
        //             const verifyLog = bcrypt.compare(value, user.password).then(isMatch => {
        //                 if (isMatch) return true;
        //                 else return false;
        //             }).catch(err => {
        //                 console.log(err)
        //                 return false;
        //             })
        //         }}
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
                        {...form.getInputProps('login')}
                    />
                    <PasswordInput
                        placeholder="Wpisz Hasło"
                        label="Hasło"
                        variant="filled"
                        {...form.getInputProps('password')}
                    />
                    <Button type="submit" fullWidth variant="gradient" gradient={{ from: 'dark', to: 'black', deg: 200 }}>Zaloguj</Button>
                </form>
            </div> 
        </div>
    )
}