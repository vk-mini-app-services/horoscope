import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: '2px solid $primary',
    height: '60px',
    padding: '0px 22px',
    position: 'fixed',
    top: 0,
    backgroundColor: 'white',
    zIndex: 9999
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20px',

    '& svg': {
      width: '25px',
      height: '25px',
      cursor: 'pointer',
      color: 'black'
    }
  },

  title: {
    fontSize: '15px',
    fontWeight: 500
  }
}));
