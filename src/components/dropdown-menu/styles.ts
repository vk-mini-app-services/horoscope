import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  divider: {
    margin: theme.spacing.sm,
    borderTopColor: '#EAECF0'
  },

  checkbox: {
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

    '& input, label': {
      cursor: 'pointer'
    },

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  },

  checkboxLastItem: {
    marginBottom: theme.spacing.xl
  },

  buttonChange: {
    width: '100%',
    position: 'absolute',
    bottom: '0px'
  }
}));
