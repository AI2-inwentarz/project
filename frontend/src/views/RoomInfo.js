import {useEffect, useState} from "react";
import Items from "../components/Items";
import { IItemsData } from '../exampleData/IItemsData';
import { useParams } from 'react-router-dom';

export default function RoomInfo(){
    const json = localStorage.getItem("token");
    const item = JSON.parse(json);
    const jwt = item.value;

    const { departmentID, roomID  } = useParams();
    //console.log(departmentID, roomID);
    const [data, setData] = useState();

    async function fetchData(room) {
        await fetch(`http://${window.location.hostname}:9000/api/user/getDepartmentItems/${departmentID}`, {
            method: "GET",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${jwt}`
            },
            
            })
            .then(async res => {
                const tokenObject = await res.json();
                setData(tokenObject);
            }) 
    }

    useEffect(()=>{
        fetchData()
    },[])
    return(<>{data && <Items data={data}/>}</>)
}