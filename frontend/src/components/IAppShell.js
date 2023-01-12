import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import logo from "../img/inwentarzor-logo.png";

import { IUser } from './IUser';
import { IUserLinks } from './IUserLinks';

import '../styles/IAppShell.scss';

export function IAppShell(props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Navbar height={600} p="xs" width={{ base: 300 }}>
            <Navbar.Section grow mt="md">
              <IUserLinks role={props.role} />
            </Navbar.Section>
            {
              props.role === 1 &&
                <Navbar.Section>
                  <IUser /> 
                </Navbar.Section>
            }
              
            
            </Navbar>
        </Navbar>
      }
      footer={
        <Footer height={80} p="md">
          @2023 Projekt Aplikacje Internetowe 2 <br/>
          JF, JJ, SC, SL
        </Footer>
      }
      header={
        <Header height={100} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <img src={logo} alt="logo" className='logo' onClick={()=>{
              navigate("/")
            }} />
          </div>
        </Header>
      }
    >
      <Text>{props.contain}</Text>
    </AppShell>
  );
}

export default IAppShell;