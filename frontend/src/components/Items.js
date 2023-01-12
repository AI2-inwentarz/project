import { HoverCard, Text, Group } from '@mantine/core';

export default function Items(data){
    console.log(data.data)
    return (
        <Group>
            { data &&
                Object.values(data.data).map(item =>(
                    <HoverCard width={280} shadow="md" key={item.name}>
                        <HoverCard.Target>
                        <Group sx={{gap: "10px"}}>
                            <Text weight={600} size={20}>{item.name}:</Text>
                            <Text weight={300} size={16}>{item.inventory_tag}</Text>
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
      );
}