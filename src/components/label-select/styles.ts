import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  label: {
    width: '100%',
    marginBottom: theme.spacing.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },

  labelText: {
    color: 'white',
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: 500,
    marginLeft: theme.spacing.xs
  }
}));
