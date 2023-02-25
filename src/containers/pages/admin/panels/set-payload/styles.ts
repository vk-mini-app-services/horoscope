import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  container: {
    height: `calc(100vh - 110px)`,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: theme.spacing.xl
  },

  group: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}));
