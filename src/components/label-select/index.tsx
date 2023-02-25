import { FC, ReactNode } from 'react';
import { Box, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStyles } from './styles';

export interface ILabelSelectProps {
  label?: string;
  icon?: ReactNode;
}

const LabelSelect: FC<ILabelSelectProps> = observer(({ label, icon }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.label}>
      {icon && icon}
      <Text className={classes.labelText}>{label}</Text>
    </Box>
  );
});

export { LabelSelect };
