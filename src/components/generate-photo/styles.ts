import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '0px',
    height: '50px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: `0 ${theme.spacing.sm}px`
  },
  button: {
    backgroundColor: 'transparent',
    color: '#D6D7E4',

    '&:hover': {
      backgroundColor: 'transparent',
      svg: {
        color: '#132136'
      }
    }
  },

  buttonActive: {
    svg: {
      color: '#132136'
    }
  },

  container: {
    height: `calc(100vh - 110px)`,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: theme.spacing.md
  }
}));
