import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  container: {
    height: `calc(100vh - 110px)`,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: theme.spacing.xl
  },

  collapseContainer: {
    marginBottom: theme.spacing.xs,
    width: '100%'
  },

  collapse: {
    width: '100%',
    padding: theme.spacing.xs
  },

  chevron: {
    transition: 'transform 200ms ease'
  },

  collapseBtn: {
    '& .mantine-Button-inner': {
      width: '100%',
      justifyContent: 'space-between'
    }
  }
}));
