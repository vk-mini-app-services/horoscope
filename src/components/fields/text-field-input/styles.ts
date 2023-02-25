import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  textFieldInput: {
    '& .mantine-TextInput-label, .mantine-InputWrapper-label': {
      color: theme.white,
      fontSize: '12px'
    },

    '& .mantine-TextInput-input': {
      borderRadius: '8px',
      border: '1px solid #D0D5DD'
    }
  }
}));
