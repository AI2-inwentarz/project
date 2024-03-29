import {useEffect, useState} from "react";
import { Text, Accordion, Button, Anchor} from '@mantine/core';
import { IconPlus } from '@tabler/icons';


export default function RequestAssigment(){

  const [data, setData] = useState();

  const json = localStorage.getItem("token")
  const item = JSON.parse(json)
  const jwt = item.value;

  console.log(data)

  async function fetchData() {
    await fetch(`http://${window.location.hostname}:9000/api/user/getContacts`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "authorization": `Bearer ${jwt}` 
        },
        }).then(async res => {
            const resObject = await res.json();
            setData(resObject);

            
      }) 
  }

  useEffect(()=>{
    fetchData();
  },[])
    return(
<>
      <h2>
        Zgłoszenia
      </h2>
      <Accordion variant="separated" radius="lg" chevronPosition="left" disableChevronRotation transitionDuration={1000} chevron={<IconPlus size={16} />}
        sx={{
            '[data-active="true"] svg': {
              transform: 'rotate(45deg)',
            },
        }}>
          { data &&
            Object.values(data.users).map(user =>(
                  <Accordion.Item value={user.firstname} key={user.firstname}>
                    <Accordion.Control>{user.role > 0 ? "Administrator: " : "Użytkownik: "}  {user.firstname} {user.surname}</Accordion.Control>
                    <Accordion.Panel>
                      <Text weight={100}>{user.job_title}</Text>
                      <Anchor href={`mailto:${user.email}`}target="_blank">
                          <Button sx={{backgroundColor: "#ad8881", '&:hover': {backgroundColor:"#4d331f"}}}> Wyślij maila</Button>
                      </Anchor>
                      
                    </Accordion.Panel> 
                  </Accordion.Item>
            
        ))}
      </Accordion>
    </>
    )
}