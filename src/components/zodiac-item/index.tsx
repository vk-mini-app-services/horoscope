import { forwardRef, ReactNode } from 'react';
import { Group, Text } from '@mantine/core';

interface ItemProps {
  value: string;
  label: string;
  icon: ReactNode;
}

const ZodiacItem = forwardRef<HTMLDivElement, ItemProps>(function SelectItem(
  { icon, label, ...others }: ItemProps,
  ref
) {
  return (
    <div ref={ref} {...others}>
      <Group noWrap>
        {icon}

        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  );
});

export default ZodiacItem;
