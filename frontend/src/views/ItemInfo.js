import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Text, Paper } from '@mantine/core';

export default function ItemInfo(){

    const { name } = useParams();
    const [data, setData] = useState();

    const json = localStorage.getItem("token")
    const item = JSON.parse(json)
    const jwt = item.value;

    async function fetchData(name) {
        await fetch(`http://${window.location.hostname}:9000/api/user/items/${name}`, {
            method: "GET",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${jwt}`
            },
        
            
            }).then(async res => {
                const resObject = await res.json();
                setData(resObject);
        
        })
    }

    useEffect(()=>{
        fetchData(name);
    },[])

    return(
        <>
            {data && 
                <Paper shadow="lg" radius="xl" p="xl" withBorder>
                    <Text weight={500}>{data.name} #{data.inventory_tag}</Text>
                    <Text weight={350}>{data.description}</Text>
                        <Text weight={200}>Data stworzenia: {data.createdAt} </Text>
                        <Text weight={200}>Data edytowania: {data.updatedAt} </Text>
                </Paper>
            }
        </>
    )
}