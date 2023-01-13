import { useEffect, useState } from 'react';
import { Text, Paper } from '@mantine/core';

export default function Myaccount(){

    const [data, setData] = useState();

    const json = localStorage.getItem("token")
    const item = JSON.parse(json)
    const jwt = item.value;

    async function fetchData() {
        await fetch(`http://${window.location.hostname}:9000/api/user/getUserInfo`, {
            method: "GET",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${jwt}`
            },
        
            
            }).then(async res => {
                const resObject = await res.json();
                console.log(resObject)
                setData(resObject);
        
        })
    }

    useEffect(()=>{
        fetchData();
    },[])

    return(
        <>
            {data && 
                <Paper shadow="lg" radius="xl" p="xl" withBorder>
                    <Text weight={800}>Login: {data.login}</Text>
                    <Text weight={500}>Imie i nazwisko: {data.firstname && data.firstname} {data.surname && data.surname}</Text>
                    <Text weight={500}>Tytuł pracy: {data.job_title && data.job_title}</Text>
                    <Text weight={400}>Numer telefonu: {data.phone && data.phone}</Text>
                    <Text weight={400}>Email: {data.email && data.email}</Text>
                    <Text weight={200}>Data stworzenia: {data.createdAt} </Text>
                    <Text weight={200}>Data edytowania: {data.updatedAt} </Text>
                </Paper>
            }
        </>
    )
}