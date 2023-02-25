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
    backgroundColor: '#0D1116',
    padding: `0 ${theme.spacing.sm}px`
  },
  button: {
    backgroundColor: 'transparent',
    color: '#223653',

    '&:hover': {
      backgroundColor: 'transparent',
      svg: {
        color: '#2775BC'
      }
    }
  },

  buttonActive: {
    svg: {
      color: '#2775BC'
    }
  }
}));
