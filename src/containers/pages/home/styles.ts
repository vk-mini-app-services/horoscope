import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: theme.spacing.md
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  search: {
    marginTop: theme.spacing.md
  }
}));
