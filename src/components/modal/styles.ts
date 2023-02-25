import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  root: {
    '& .mantine-Paper-root': {
      backgroundColor: '#0D1116'
    },
    '& .mantine-Text-root': {
      color: 'white'
    }
  },

  container: {
    height: `100%`,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md
  }
}));
