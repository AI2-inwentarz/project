import { HoverCard, Text, Group, Button, MantineProvider, TextInput, Autocomplete } from '@mantine/core';
import { showNotification, NotificationsProvider } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";

export default function Items(data){

    const { departamentsID, name } = useParams();
    const [categories, setCategories] = useState();

    const json = localStorage.getItem("token")
    const item = JSON.parse(json)
    const jwt = item.value;

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
          name: '',
          desc: '',
          tag: '',
          idk: '',
          idp: name,
          idd: departamentsID,
        },
      });


      useEffect(()=>{
        getCategories();
      },[])
      
      async function getCategories(){
        await fetch(`http://${window.location.hostname}:9000/api/db/itemCategories/`, {
            method: "GET",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${jwt}`
            },
        }).then(async res => {
            const jsonObject = await res.json();   
            setCategories(jsonObject);
        }) 
      }
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
            category_ud: idk,
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

    async function editData(id) {
        await fetch(`http://${window.location.hostname}:9000/api/user/items/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${jwt}`
        },
        }).then(async res => {
            const jsonObject = await res.json();   
            console.log(jsonObject); 
            
        }) 
    }

    async function delData(id) {
        await fetch(`http://${window.location.hostname}:9000/api/user/items/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "authorization": `Bearer ${jwt}`
            },
        }).then(async res => {
            const jsonObject = await res.json();    
            console.log(jsonObject);
            if(jsonObject.message === "Item Deleted"){
                showNotification({
                    title: 'Udało się',
                    message: `Item o id ${id} został usunięty`,
                    color: 'red'
                  })

                  setTimeout(changePage, 3000);

                    function changePage() {
                        window.location.reload(true);
                    }
            } 
        }) 
    }
    return (
        <MantineProvider withNormalizeCSS withGlobalStyles>
            <NotificationsProvider>
            <h2>Przedmioty</h2>
            <Group>
                { data &&
                    Object.values(data.data).map(item =>(
                        <HoverCard width={280} shadow="md" key={item.name}>
                            <HoverCard.Target>
                            <Group sx={{gap: "10px"}}>
                                <Text weight={600} size={20}>{item.name}</Text>
                                <Text weight={300} size={20}>({item.inventory_tag})</Text>
                                <Button onClick={()=> editData(item.id)}>Edytuj</Button>
                                <Button onClick={()=>delData(item.id)}>Usuń</Button>
                            </Group>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                            <Text size="sm">
                                {item.description} <br />
                                Ostatnio aktualizowany {item.updatedAt}
                            </Text>
                            </HoverCard.Dropdown>
                        </HoverCard>)
                    )

                }
            
            </Group>
            <hr />
            <form onSubmit={form.onSubmit((values) => {addData(values.name, values.desc, values.tag, values.idk, values.idp, values.idd)})} style={{width: "50vw", margin: "0 auto"}}>
                    <TextInput
                        placeholder="Wpisz nazwe"
                        label="Nazwa"
                        variant="filled"
                        withAsterisk
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        placeholder="Wpisz opis"
                        label="Opis"
                        variant="filled"
                        {...form.getInputProps('desc')}
                    />
                    <TextInput
                        placeholder="Wpisz tag"
                        label="Tag"
                        variant="filled"
                        {...form.getInputProps('tag')}
                    />
                    {categories && 
                        <Autocomplete
                            label="Nazwa"
                            placeholder="Wybierz jedną"
                            data={Object.values(categories).map(item => (item.id).toString())}
                            {...form.getInputProps('number')}
                        />
                    }
                    <TextInput
                        placeholder="Wpisz id pokoju"
                        label="ID pokoju"
                        variant="filled"
                        disabled
                        {...form.getInputProps('idp')}
                    />
                    <TextInput
                        placeholder="Wpisz id departamentu"
                        label="ID departamentu"
                        variant="filled"
                        disabled
                        {...form.getInputProps('idd')}
                    />
                    <br />
                    <Button type="submit" fullWidth variant="gradient" gradient={{ from: 'dark', to: 'black', deg: 200 }}>
                        Dodaj przedmiot
                    </Button>
                </form>
        </NotificationsProvider>
        </MantineProvider>
      );
}