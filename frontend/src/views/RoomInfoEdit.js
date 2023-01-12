import { useForm} from '@mantine/form';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, TextInput, Select, MantineProvider } from '@mantine/core';
import { showNotification, NotificationsProvider } from '@mantine/notifications';

export default function RoomInfoEdit(){
    const { departmentID, roomID, itemID  } = useParams();
    const [categories, setCategories] = useState();

    const json = localStorage.getItem("token")
    const item = JSON.parse(json)
    const jwt = item.value;

    const navigate = useNavigate();

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

      async function editData(id, name, desc, tag, idk, idp, idd) {
        await fetch(`http://${window.location.hostname}:9000/api/user/items/${id}`, {
            method: "PUT",
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

            if(jsonObject.message === "Item Updated"){
                showNotification({
                    title: 'Udało się',
                    message: `Item o nazwie ${name} został dodany`,
                    color: 'green'
                  })

                  setTimeout(changePage, 3000);

                    function changePage() {
                        navigate(`/room/${departmentID}/${roomID}`)
                        window.location.reload(true);
                    }
            } 
            
        }) 
    }
    return(
        <MantineProvider withNormalizeCSS withGlobalStyles>
            <NotificationsProvider>
                <h2 style={{textAlign: "center"}}>Edytowanie itemu</h2>
                <form onSubmit={form.onSubmit((values) => {editData(itemID, values.name, values.desc, values.tag, values.idk, values.idp, values.idd)})} style={{width: "50vw", margin: "0 auto"}}>
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
    )
}