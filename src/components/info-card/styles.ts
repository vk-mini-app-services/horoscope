import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  card: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing.sm,
    borderRadius: '16px',

    '&:not(:last-child)': {
      marginBottom: theme.spacing.md
    }
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: theme.spacing.xs
  },
  headerLeftContent: {
    fontSize: '17px',
    color: theme.colors.brandWhite[0],
    lineHeight: '20px',
    fontWeight: 400,

    '& svg': {
      cursor: 'pointer'
    }
  },
  headerCenterContent: {
    '& svg': {
      cursor: 'pointer'
    }
  },
  headerRightContent: {
    '& svg': {
      cursor: 'pointer'
    }
  },
  main: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  mainLeftIcon: {
    marginRight: theme.spacing.xs
  },
  mainText: {
    fontSize: '14px',
    lineHeight: '17px',
    fontWeight: 400
  }
}));
