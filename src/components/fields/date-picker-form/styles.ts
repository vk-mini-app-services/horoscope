import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  birthDate: {
    '& .mantine-DatePicker-input': {
      borderRadius: '8px',
      border: '1px solid #D0D5DD'
    },

    '& .mantine-DatePicker-label': {
      color: theme.white,
      fontSize: '12px'
    }
  }
}));
