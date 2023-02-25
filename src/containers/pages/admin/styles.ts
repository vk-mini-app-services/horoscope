import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  root: {
    height: `calc(100vh - 110px)`,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: `0px ${theme.spacing.md}px ${theme.spacing.md}px ${theme.spacing.md}px`
  },

  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
}));
