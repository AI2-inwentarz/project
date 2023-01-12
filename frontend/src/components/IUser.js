import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme, ThemeIcon } from '@mantine/core';
import { IconLogout } from '@tabler/icons';


export function IUser() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  const json = localStorage.getItem("token")
    const item = JSON.parse(json)
    const jwt = item.value;

  async function getDataLog(){
    await fetch(`http://${window.location.hostname}/api/user/getUserInfo`, {
    "method": "GET",
    "headers": {
      "authorization": `Bearer ${jwt}`,
      "content-type": "application/json; charset=UTF-8"
    }
  }).then(async res => {
    const resObject = await res.json();
    setUserData(resObject);
  }).catch(err => {
    console.error(err);
  });
  }

  useEffect(()=>{
    getDataLog();
  },[])

  function logout(){
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(true);
  }
  

  return (
    <Box 
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        }}
        onClick={()=>{
          navigate("/myaccount");
        }}
      >
        <Group>
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
            {userData && userData.login}
            </Text>
            <Text size="sm" weight={300}>
            {userData && userData.firstname+" "+userData.surname}
              
            </Text>
            <Text size="xs">
              {userData && userData.job_title}
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        })}
        onClick={()=>{
          logout();
        }}
      >
        <Group sx={{gap: "26px"}}>
          <ThemeIcon color="black">
            <IconLogout size={38} />
          </ThemeIcon>

          <Text size="md" weight={600}>Wyloguj</Text>
        </Group>
      </UnstyledButton>
    </Box>
  );
}