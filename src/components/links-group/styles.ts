import { createStyles } from '@mantine/core';
import { ILinksGroupProps } from '.';

export const useStyles = createStyles((theme, { icon }: Pick<ILinksGroupProps, 'icon'>) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#F9FAFB'
  },
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,
    borderRadius: '8px',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  },

  group: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`
  },

  leftContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  leftContentText: {
    marginLeft: icon ? '8px' : '0px'
  },

  rightContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },

  rightContentText: {
    fontSize: '12px'
  },

  chevron: {
    transition: 'transform 200ms ease'
  },

  controlActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
    color: theme.colorScheme === 'dark' ? theme.white : theme.black
  }
}));
