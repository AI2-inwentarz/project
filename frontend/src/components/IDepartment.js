
import { Accordion, Anchor, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons';

export default function IDepartment(data) {
  return (
    <>
      <h2>
        Wydziały
      </h2>
      <Accordion variant="separated" radius="lg" chevronPosition="left" disableChevronRotation transitionDuration={1000} chevron={<IconPlus size={16} />}
        sx={{
            '[data-active="true"] svg': {
              transform: 'rotate(45deg)',
            },
        }}>
          { data && Object.values(data.data).map(item =>(
            <Accordion.Item value={item.shortname} key={item.shortname}>
              <Accordion.Control>{item.name}</Accordion.Control>
              <Accordion.Panel>{item.description}<br />
              {item.shortdescription}
              <Text weight={100}>Właściciel: {item.affiliation }</Text><br />
                <Anchor href={`/department/${item.id}`} target="_blank">
                    Zobacz szczegóły
                </Anchor>
                <Anchor href={`/department/${item.id}/add`} target="_blank" sx={{paddingLeft: "20px"}}>
                    Dodaj do wydziału
                </Anchor>
              </Accordion.Panel> 
            </Accordion.Item>
          ))}
      </Accordion>
    </>
  );
}