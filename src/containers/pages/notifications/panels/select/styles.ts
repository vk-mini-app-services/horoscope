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

  center: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    margin: `${theme.spacing.sm}px 0px`
  },

  select: {
    marginTop: theme.spacing.md,
    width: '100%',
    '& .mantine-Select-input': {
      borderRadius: '8px',
      border: '1px solid #D0D5DD'
    },
    '& .mantine-Select-label': {
      fontSize: '12px'
    },
    '& .mantine-Select-item[data-selected]': {
      backgroundColor: '#15aabf'
    }
  }
}));
