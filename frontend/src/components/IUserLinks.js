import React from 'react';
import { useNavigate } from "react-router-dom";
import { IconDoor, IconBooks, IconSchool, IconBallpen, IconKey, IconPlus } from '@tabler/icons';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';

function IUserLink({ icon, color, label, href }) {
  const navigate = useNavigate();

  return (
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
        navigate(href)
      }}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="md" weight={600}>{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const unloggedData = [
  { icon: <IconKey size={16} />, color: 'violet', label: 'Zaloguj', href: '/login' },
  { icon: <IconPlus size={16} />, color: 'grape', label: 'Zarejestruj', href: '/register' },
];

const userData = [
  { icon: <IconDoor size={16} />, color: 'grape', label: 'Strona główna', href: '/' },
  { icon: <IconSchool size={16} />, color: 'red', label: 'Wydziały', href: '/departments' },
  { icon: <IconBallpen size={16} />, color: 'blue', label: 'Zgłoszenia', href: '/assigment/request' },
];

const adminData = [
  { icon: <IconBooks size={16} />, color: 'violet', label: 'A', href: '/' },
  { icon: <IconDoor size={16} />, color: 'grape', label: 'B', href: '/' },
  { icon: <IconSchool size={16} />, color: 'red', label: 'C', href: '/' },
  { icon: <IconBallpen size={16} />, color: 'blue', label: 'D', href: '/' },
];

export function IUserLinks(props) {
  const unloggedLinks = unloggedData.map((link) => <IUserLink {...link} key={link.label} href={link.href}/>);
  const userLinks = userData.map((link) => <IUserLink {...link} key={link.label} href={link.href}/>);
  const adminLinks = adminData.map((link) => <IUserLink {...link} key={link.label} href={link.href}/>);
  switch (props.role) {
    case 0:
      return <div>{unloggedLinks}</div>;
    case 1:
      return <div>{userLinks}</div>;
    case 2:
      return <div>{adminLinks}</div>;
    default:
      return <div>{unloggedLinks}</div>;
  }
  
}
