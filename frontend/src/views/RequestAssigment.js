import { Text, Accordion, Button, Anchor} from '@mantine/core';
import { IconPlus } from '@tabler/icons';


export default function RequestAssigment(){
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
          {/* { data && Object.values(data.data).map(item =>( */}
            <Accordion.Item value={"item.shortname"} key={"item.shortname"}>
              <Accordion.Control>Imie</Accordion.Control>
              <Accordion.Panel>
                <Text weight={100}>Właściciel: </Text><br />
                <Anchor href={`mailto:kubafa99@gmail.com`}target="_blank">
                    <Button sx={{backgroundColor: "#ad8881", '&:hover': {backgroundColor:"#4d331f"}}}> Wyślij maila</Button>
                </Anchor>
                
              </Accordion.Panel> 
            </Accordion.Item>
          {/* ))} */}
      </Accordion>
    </>
    )
}