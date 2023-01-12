import { HoverCard, Text, Group, Button, MantineProvider } from '@mantine/core';
import { showNotification, NotificationsProvider } from '@mantine/notifications';

export default function Items(data){

    const json = localStorage.getItem("token")
    const item = JSON.parse(json)
    const jwt = item.value;

    async function editData(id) {
        await fetch(`http://${window.location.hostname}:9000/api/db/items/${id}`, {
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
        await fetch(`http://${window.location.hostname}:9000/api/db/items/${id}`, {
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
            <Button>Dodaj przedmiot</Button>
        </NotificationsProvider>
        </MantineProvider>
      );
}