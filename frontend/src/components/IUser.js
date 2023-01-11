import React from 'react';
import { useNavigate } from "react-router-dom";
import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme, ThemeIcon } from '@mantine/core';
import { IconLogout } from '@tabler/icons';


export function IUser() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

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
          <Avatar
            src="data:image/jpeg;base64,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"
            radius="xl"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              Maciej Kowalski
            </Text>
            <Text size="xs">
              zwykły użytkownik
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