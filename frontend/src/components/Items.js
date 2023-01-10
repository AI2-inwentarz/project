import { HoverCard, Text, Group } from '@mantine/core';

export default function Items(data){
    return (
        <Group>
            {
                Object.values(data.data).map(item =>(
                    <HoverCard width={280} shadow="md">
                        <HoverCard.Target>
                        <Group sx={{gap: "10px"}}>
                            {item.ICON}
                            <Text weight={600} size={20}>{item.NAME}</Text>
                        </Group>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                        <Text size="sm">
                            {item.DESCRIPTION}
                        </Text>
                        </HoverCard.Dropdown>
                    </HoverCard>)
                )

            }
          
        </Group>
      );
}