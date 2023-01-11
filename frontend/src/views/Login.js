import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput, TextInput,Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import '../styles/App.scss';

let error;

export default function Login(){

    const navigate = useNavigate();
    error = [];

    async function fetchData(login, password) {
        await fetch("http://"+window.location.hostname+":9000/api/auth/authUser", {
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
                error = [];
                const status = res.status;
                if(status !== 200) error.push(status)

                const tokenObject = await res.json();
                console.log(tokenObject);

                if(!tokenObject.token){
                    console.log("DDD")
                    if(tokenObject.message === "Bad username") error.push(1);
                    if(tokenObject.message === "Bad password") error.push(2);
                }
                else{
                    error = [];
                    localStorage.setItem("token", tokenObject.token);
                    navigate("/");
                    window.location.reload(true);
                } 
                
            }) 
    }

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
          login: '',
          password: '',
        },
    
        validate: {
            login: (value) => {
                if(error.includes(1)) return "Nie ma podanego loginu w bazie";
                else if(error.includes(400)) return "Nieprawidłowe żądanie";
                else if(error.includes(401)) return "Wygasł token logowania";
                else if(value.length < 3) return 'Login musi mieć co najmniej 3 znaki';
                
            },
            password: (value) => {
                if(error.includes(2)) return "Nieprawidłowe hasło";
                else if(value.length < 3) return 'Login musi mieć co najmniej 3 znaki';
                else return null;
            } 
        },
    });

    return(
        <div className='container'>
            <div className='inputContainer'>
                <form onSubmit={form.onSubmit((values) => {fetchData(values.login, values.password);})}>
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