import { FC } from 'react';
import { ScrollArea, ScrollAreaProps } from '@mantine/core';

const styleScroll = {
  scrollbar: {
    '&, &:hover': {
      background: 'transparent'
    },

    '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
      backgroundColor: '#98A2B3'
    },

    '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
      backgroundColor: '#98A2B3'
    }
  }
};

export const ScrollContainer: FC<ScrollAreaProps> = ({ children, ...props }) => {
  return (
    <ScrollArea {...props} styles={styleScroll}>
      {children}
    </ScrollArea>
  );
};
