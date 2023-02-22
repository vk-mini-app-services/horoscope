import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '60px',
    padding: 0,
    backgroundColor: '#132136'
  },
  content: {
    height: `calc(100vh - 60px)`,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
}));
