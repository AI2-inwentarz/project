import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { Container, Text, Accordion, Anchor, TextInput, NumberInput, Button, Autocomplete } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconHome2, IconClockHour4, IconPlus } from '@tabler/icons';
import { IDepartmentData } from '../exampleData/IDepartmentData';
import { IRoomsData } from '../exampleData/IRoomsData';


export default function DepartmentInfo(){
    const { name } = useParams();

    const [data, setData] = useState();
    const [rooms, setRooms] = useState();
    const [depFromCat, setDepFromCat] = useState();
    

    const json = localStorage.getItem("token")
    const item = JSON.parse(json)
    const jwt = item.value;

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

    async function fetchRooms() {
        await fetch(`http://localhost:9000/api/user/getRoomsForDepartment/${name}`, {
            method: "GET",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${jwt}`
            },
        }).then(async res => {
            const resObject = await res.json();
            setRooms(resObject); 
        }) 
    }

    async function fetchDepCat(category) {
        await fetch(`http://localhost:9000/api/user/getDepartmentCategories/5`, {
            method: "GET",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${jwt}`
            },
        }).then(async res => {
            const resObject = await res.json();
            console.log(resObject);
            setDepFromCat(resObject); 
        }) 
    }
    
    useEffect(()=>{
        fetchData();
        fetchRooms();
        fetchDepCat(name);
    },[])

    const form = useForm({
        initialValues: {
          number: '',
          type: '',
        },
      });

    return(
        <Container size="xs" px="xs" sx={{textAlign: "center"}}>
            { data &&
                Object.values(data).map(item =>{
                    return (
                        <div key={item.name}>
                            <h2>{item.name}</h2>
                            <h4>{item.description}</h4>
                            <Text weight={100}>Właściciel: {item.affiliation }</Text><br />
                            <Text><IconHome2 size={20} />{item.adress}</Text><br />
                            <Text><IconClockHour4 size={20} />{item.createdAt}</Text><br />
                            <hr />
                        </div>
                    )
                })
            }

        <h2>Pomieszczenia</h2>
        <Accordion variant="separated" radius="lg" chevronPosition="left" disableChevronRotation transitionDuration={1000} chevron={<IconPlus size={16} />}
        sx={{
            '[data-active="true"] svg': {
              transform: 'rotate(45deg)',
            },
        }}>
          { rooms &&
            Object.values(rooms).map(item =>(
                <Accordion.Item value={item.name} key={item.name}>
                <Accordion.Control sx={{textAlign: "center"}}>Nazwa sali: {item.name}</Accordion.Control>
                <Accordion.Panel>{item.longname}, {item.tag}<br />
                    <Text weight={200}>{item.description} </Text><br />
                    <Anchor href={`/room/${item.id}`} target="_blank">
                        Zobacz szczegóły
                    </Anchor>
                </Accordion.Panel>
                </Accordion.Item>
            ))
          }
      </Accordion> <hr />
      <h2>Wyszukaj</h2>
        <form>
          {depFromCat && 
            <Autocomplete
            label="Kategorie"
            placeholder="Wybierz jedną"
            data={Object.values(depFromCat).map(item =>(item.name))}
            {...form.getInputProps('type')}
        />
          }
        
            <TextInput
                placeholder="Nazwa"
                label="Wpisz nazwe"
                {...form.getInputProps('number')}
            />
            <Button type="submit" fullWidth variant="gradient" gradient={{ from: 'dark', to: 'black', deg: 200 }} sx={{marginTop: "10px"}}>
                Wyślij
            </Button>
        </form>
    </Container>
    )

}