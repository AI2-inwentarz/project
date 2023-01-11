import {useState, useEffect} from "react"
import IDepartment from '../components/IDepartment';

export default function Departments(){
    const [data, setData] = useState();

    async function fetchData() {
        await fetch(`http://${window.location.hostname}:9000/api/user/getDepartmentsForUser`, {
            method: "GET",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${localStorage.getItem("token")}`
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
    return(
    <>
        {data && <IDepartment data={data}/>} 
    </>)
}