import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
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
    padding: '0 57px'
  },
  button: {
    backgroundColor: 'transparent',
    color: '#D6D7E4',

    '&:hover': {
      backgroundColor: 'transparent',
      svg: {
        color: '#15aabf'
      }
    }
  },

  buttonActive: {
    svg: {
      color: '#15aabf'
    }
  }
}));
