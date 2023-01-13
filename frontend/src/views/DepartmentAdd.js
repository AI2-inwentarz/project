import { useParams } from 'react-router-dom';
import { HoverCard, Text, Group, Button, MantineProvider, Select, Anchor, Input } from '@mantine/core';
import { showNotification, NotificationsProvider } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';

export default function DepartmentAdd(){
    const { department_id } = useParams();

    const [data, setData] = useState();

    const json = localStorage.getItem("token")
    const item = JSON.parse(json)
    const jwt = item.value;

    useEffect(()=>{
        getData();
    },[])


    async function addData(name, desc, tag, idk, idp, idd) {
        await fetch(`http://${window.location.hostname}:9000/api/user/items/`, {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify({
            name: name,
            description: desc,
            inventory_tag: tag,
            category_id: idk,
            room_id: idp,
            department_id: idd
        })
        }).then(async res => {
            const jsonObject = await res.json();   
            console.log(jsonObject); 
            if(jsonObject.message === "Record Created"){
                showNotification({
                    title: 'Udało się',
                    message: `Item o nazwie ${name} został dodany`,
                    color: 'green'
                  })

                  setTimeout(changePage, 3000);

                    function changePage() {
                        window.location.reload(true);
                    }
            } 
        }) 
    }

    async function delData(id) {
        fetch(`http://localhost:9000/api/user/deleteDepartmentUser/${department_id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${jwt}`,
                "content-type": "application/json; charset=UTF-8"
            },
            body: {
                "user_id": id
            }
        }).then(async res => {
            const jsonObject = await res.json();    
            console.log(jsonObject);
            if(jsonObject.message === "One result deleted"){
                showNotification({
                    title: 'Udało się',
                    message: `Departament o id ${id} został usunięty`,
                    color: 'red'
                  })
                  setTimeout(changePage, 3000);
                    function changePage() {
                        window.location.reload(true);
                    }
            } 
        }) 
    }

    async function getData(){
        await fetch(`http://${window.location.hostname}:9000/api/user/getDepartmentUsers/${department_id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${jwt}`
        },
        }).then(async res => {
            const jsonObject = await res.json();   
            setData(jsonObject);
            console.log(jsonObject);
        }) 
    }

    const form = useForm({
        initialValues: {
          user: '',
        },
      });

    return(
        <MantineProvider withNormalizeCSS withGlobalStyles>
            <NotificationsProvider>
                <h2>Dodawanie użytkowników do departamentów</h2>
                <Group sx={{gap:"0", display:"flex", alignItems:"end"}}>
                    <form>
                        <Select
                            label="Lista użytkowników, spoza wydziału"
                            placeholder="Wybierz kogo chcesz dodać"
                            data={[
                                { value: 'react', label: 'React' },
                                { value: 'ng', label: 'Angular' },
                                { value: 'svelte', label: 'Svelte' },
                                { value: 'vue', label: 'Vue' },
                            ]}
                            sx={{width: "50%", minWidth: "400px"}}
                            {...form.getInputProps('user')}
                        />
                        {/* <Input
                            label="Wpisz użytkownika"
                            placeholder="ID"
                            {...form.getInputProps('user')}
                        /> */}
                    </form>
                    <Button >Dodaj</Button>
                </Group>
                
                <h2>Wyświetl użytkowników w departamencie</h2>
                
                <Group>
                    { data &&
                        Object.values(data).map((item,i) =>(
                            <HoverCard width={280} shadow="md" key={i}>
                                <HoverCard.Target>
                                <Group sx={{gap: "10px"}}>
                                    <Anchor href={`/item/${item.id}`} target="_blank">
                                        <Text weight={600} size={18}>{item.User.firstname} {item.User.surname}</Text>
                                        <Text weight={300} size={14}>({item.User.email})</Text>
                                    </Anchor>
                                    <Button onClick={()=>delData(item.id)}>Usuń</Button>
                                </Group>
                                
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                <Text size="sm">
                                    {item.User.job_title}
                                </Text>
                                </HoverCard.Dropdown>
                            </HoverCard>
                            )
                        )

                    }
                </Group>
            </NotificationsProvider>
        </MantineProvider>
        
    )
}