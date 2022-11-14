import { HoverCard, Text, Group } from '@mantine/core';
import { IItemsData } from '../exampleData/IItemsData';

export default function Items(){
    return (
        <Group>
            {
                Object.values(IItemsData).map(item =>(
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