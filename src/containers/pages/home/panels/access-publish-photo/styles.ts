import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  container: {
    height: `calc(100vh - 110px)`,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: theme.spacing.md
  },

  actions: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
}));
