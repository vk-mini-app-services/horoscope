import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  link: {
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    borderRadius: '8px',
    width: '100%',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  },

  counter: {
    fontSize: '12px',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black
  },

  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  checkbox: {
    cursor: 'pointer'
  }
}));
