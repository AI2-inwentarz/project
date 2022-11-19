import { useParams } from 'react-router-dom';
import { Container, Text, Accordion, Anchor, Autocomplete, NumberInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconHome2, IconPhoneCall, IconPlus } from '@tabler/icons';
import { IDepartmentData } from '../exampleData/IDepartmentData';
import { IRoomsData } from '../exampleData/IRoomsData';


export default function DepartmentInfo(){
    const { name } = useParams();

    let INumberRooms = [];
    Object.values(IRoomsData).map(data => {
        INumberRooms.push(data.NUMBER)
        return null;
    })

    let ITypeRooms = [];
    Object.values(IRoomsData).map(data => {
        if(!ITypeRooms.includes(data.TYPE)) ITypeRooms.push(data.TYPE)
        return null;
    })

    const form = useForm({
        initialValues: {
          number: '',
          type: '',
          person: 0,
          width: 0,
          length: 0,
          height: 0
        },
      });

    return(
        <Container size="xs" px="xs" sx={{textAlign: "center"}}>
            {
                Object.values(IDepartmentData).map(item =>{
                    if(item.SHORT_NAME === name) {
                        return (
                            <div key={item.NAME}>
                                <h2>{item.NAME}</h2>
                                <h4>{item.DESCRIPTION}</h4>
                                <Text weight={100}>Właściciel: {item.FIRM}</Text><br />
                                <Text><IconHome2 size={20} />{item.ADDRESS}</Text><br />
                                <Text><IconPhoneCall size={20} />{item.PHONE}</Text><br />
                            </div>
                        )
                    }
                    else return null
                })
            }

        <h2>Wyszukaj</h2>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Autocomplete
                label={"po numerze pomieszczenia"}
                placeholder="Wpisz/Wybierz numer"
                data={INumberRooms}
                {...form.getInputProps('number')}
            />
            <Autocomplete
                label={"po typie pomieszczenia"}
                placeholder="Wpisz/Wybierz typ"
                data={ITypeRooms}
                {...form.getInputProps('type')}
            />
            <NumberInput
                label="po minimalnej pojemności"
                defaultValue={0}
                placeholder="Wpisz ilość osób"
                {...form.getInputProps('person')}
            />
            <NumberInput
                label="po minimalnej szerokości"
                defaultValue={0}
                placeholder="Wpisz ilość metrów"
                {...form.getInputProps('width')}
            />
            <NumberInput
                label="po minimalnej długości"
                defaultValue={0}
                placeholder="Wpisz ilość metrów"
                {...form.getInputProps('length')}
            />
            <NumberInput
                label="po minimalnej wysokości"
                defaultValue={0}
                placeholder="Wpisz ilość metrów"
                {...form.getInputProps('height')}
            />
            <Button type="submit" fullWidth variant="gradient" gradient={{ from: 'dark', to: 'black', deg: 200 }} sx={{marginTop: "10px"}}>
                Wyślij
            </Button>
        </form>
        <h2>Pomieszczenia</h2>
        <Accordion variant="separated" radius="lg" chevronPosition="left" disableChevronRotation transitionDuration={1000} chevron={<IconPlus size={16} />}
        sx={{
            '[data-active="true"] svg': {
              transform: 'rotate(45deg)',
            },
        }}>
          {
            Object.values(IRoomsData).map(item =>(
                <Accordion.Item value={item.NUMBER} key={item.NUMBER}>
                <Accordion.Control sx={{textAlign: "center"}}>Sala nr. {item.NUMBER}, {item.MAX_PERSON} osobowa, {item.TYPE}</Accordion.Control>
                <Accordion.Panel>{item.DESCRIPTION}<br />
                    <Text weight={200}>Wymiary: (szerokość x długość x wysokość) {item.WIDTH} x {item.LENGTH} x {item.HEIGHT} </Text><br />
                    <Anchor href={`/room/${item.NUMBER}`} target="_blank">
                        Zobacz szczegóły
                    </Anchor>
                </Accordion.Panel>
                </Accordion.Item>
            ))
          }
      </Accordion>
    </Container>
    )

}