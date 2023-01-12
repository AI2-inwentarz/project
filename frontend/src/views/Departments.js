import {useState, useEffect} from "react"
import { TextInput,  Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import IDepartment from '../components/IDepartment';

export default function Departments(){
    const [data, setData] = useState();
    const [depFromCat, setDepFromCat] = useState();

    const json = localStorage.getItem("token")
    const item = JSON.parse(json)
    const jwt = item.value;

    console.log(depFromCat);

    async function fetchData() {
        await fetch(`http://${window.location.hostname}:9000/api/user/getDepartmentsForUser`, {
            method: "GET",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${jwt}`
            },
            })
            .then(async res => {
                const resObject = await res.json();
                setData(resObject); 
            }) 
    }
    
    
    useEffect(()=>{
        fetchData();
    },[])

    const form = useForm({
        initialValues: {
          number: '',
          type: '',
        },
      });
    return(
    <>
        {data && <IDepartment data={data}/>} 
        
        { depFromCat &&
                Object.values(depFromCat).map(item =>{
                    return (
                        <div key={item.name}>
                            <h2>{item.name}</h2>
                            <h4>{item.description}</h4>
                            <hr />
                        </div>
                    )
                })
            }
    </>)
}