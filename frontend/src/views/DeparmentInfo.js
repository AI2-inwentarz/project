import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { Container, Text, Accordion, Anchor, Autocomplete, NumberInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconHome2, IconClockHour4, IconPlus } from '@tabler/icons';
import { IDepartmentData } from '../exampleData/IDepartmentData';
import { IRoomsData } from '../exampleData/IRoomsData';


export default function DepartmentInfo(){
    const { name } = useParams();

    const [data, setData] = useState();
    const [rooms, setRooms] = useState();

    console.log(data)
    console.log(rooms)

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

    async function fetchRooms() {
        await fetch(`http://localhost:9000/api/user/getRoomsForDepartment`+ new URLSearchParams({
            department_id: name,
        }), {
            method: "GET",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${localStorage.getItem("token")}`
            },
            // body: JSON.stringify({
            //     department_id: 3,
            // })
        }).then(async resp => {
            const resObject2 = await resp.json();
            console.log("ddd")
            console.log(resObject2)
            setRooms(resObject2); 
        }) 
    }
    
    useEffect(()=>{
        fetchData();
        fetchRooms();
    },[])

    let INumberRooms = [];
    Object.values(IRoomsData).map(data => {
        INumberRooms.push(data.NUMBER)
        return null;
    })

    let ITypeRooms = [];
    Object.values(IRoomsData).map(data => {
        if(!ITypeRooms.includes(data.TYPE)) ITypeRooms.push(data.TYPE)
        return null;
    })

    const form = useForm({
        initialValues: {
          number: '',
          type: '',
          person: 0,
          width: 0,
          length: 0,
          height: 0
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
                            <Text><IconHome2 size={20} />{item.address}</Text><br />
                            <Text><IconClockHour4 size={20} />{item.createdAt}</Text><br />
                            <hr />
                        </div>
                    )
                })
            }

        <h2>Wyszukaj</h2>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Autocomplete
                label={"po numerze pomieszczenia"}
                placeholder="Wpisz/Wybierz numer"
                data={INumberRooms}
                {...form.getInputProps('number')}
            />
            <Autocomplete
                label={"po typie pomieszczenia"}
                placeholder="Wpisz/Wybierz typ"
                data={ITypeRooms}
                {...form.getInputProps('type')}
            />
            <NumberInput
                label="po minimalnej pojemności"
                defaultValue={0}
                placeholder="Wpisz ilość osób"
                {...form.getInputProps('person')}
            />
            <NumberInput
                label="po minimalnej szerokości"
                defaultValue={0}
                placeholder="Wpisz ilość metrów"
                {...form.getInputProps('width')}
            />
            <NumberInput
                label="po minimalnej długości"
                defaultValue={0}
                placeholder="Wpisz ilość metrów"
                {...form.getInputProps('length')}
            />
            <NumberInput
                label="po minimalnej wysokości"
                defaultValue={0}
                placeholder="Wpisz ilość metrów"
                {...form.getInputProps('height')}
            />
            <Button type="submit" fullWidth variant="gradient" gradient={{ from: 'dark', to: 'black', deg: 200 }} sx={{marginTop: "10px"}}>
                Wyślij
            </Button>
        </form>
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
                <Accordion.Control sx={{textAlign: "center"}}>Sala: {item.longname}, {item.tag}</Accordion.Control>
                <Accordion.Panel>{item.description}<br />
                    {/* <Text weight={200}>Wymiary: (szerokość x długość x wysokość) {item.WIDTH} x {item.LENGTH} x {item.HEIGHT} </Text><br /> */}
                    <Anchor href={`/room/${item.id}`} target="_blank">
                        Zobacz szczegóły
                    </Anchor>
                </Accordion.Panel>
                </Accordion.Item>
            ))
          }
      </Accordion>
    </Container>
    )

}