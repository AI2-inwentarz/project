import { HoverCard, Text, Group, Button, MantineProvider, TextInput, Select, Anchor } from '@mantine/core';
import { showNotification, NotificationsProvider } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from "react";

export default function Items(data){
    const { departmentID, roomID  } = useParams();
    //console.log(departmentID, roomID);
    const [categories, setCategories] = useState();

    const navigate = useNavigate();

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
          idp: roomID,
          idd: departmentID,
        },
      });


      useEffect(()=>{
        getCategories();
      },[])
      
      async function getCategories(){
        await fetch(`http://${window.location.hostname}:9000/api/user/getDepartmentCategories/${departmentID}`, {
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
                        Object.values(data.data).map((item,i) =>(
                        
                            <HoverCard width={280} shadow="md" key={item.name+i}>
                                <HoverCard.Target>
                                <Group sx={{gap: "10px"}}>
                                    <Anchor href={`/item/${item.id}`} target="_blank">
                                        <Text weight={600} size={18}>{item.name}</Text>
                                        <Text weight={300} size={14}>({item.inventory_tag})</Text>
                                    </Anchor>
                                    <Button onClick={()=>navigate(`/room/${departmentID}/${roomID}/${item.id}/edit`)}>Edytuj</Button>
                                    <Button onClick={()=>delData(item.id)}>Usuń</Button>
                                </Group>
                                
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                <Text size="sm">
                                    {item.description} <br />
                                    Ostatnio aktualizowany {item.updatedAt}
                                </Text>
                                </HoverCard.Dropdown>
                            </HoverCard>
                        )
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
                        <Select
                            label="Wybierz ID kategorii"
                            placeholder="jedną z listy"
                            data={Object.values(categories).map(item => ({value: item.id, label: item.name}))}
                            {...form.getInputProps('idk')}
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