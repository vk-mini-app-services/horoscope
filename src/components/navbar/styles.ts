import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  navbar: {
    width: '264px',
    height: `calc(100vh - 80px)`,
    backgroundColor: theme.colors.backgroundGray[0],
    borderRight: 'none'
  },

  list: {
    padding: `${theme.spacing.md}px ${theme.spacing.md}px 0px ${theme.spacing.xs}px`
  },

  linksInner: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xl
  }
}));
