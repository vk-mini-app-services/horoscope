import React from 'react';
import { Box, Checkbox, Text } from '@mantine/core';
import { FC } from 'react';
import { useStyles } from './styles';

interface ILinkItemProps {
  checked: boolean;
  label: string;
  onClick: (event: React.SyntheticEvent<HTMLDivElement>) => void;
  value: string;
  counter?: number;
}

export const LinkItem: FC<ILinkItemProps> = ({ checked, label, onClick, value, counter }) => {
  const { classes } = useStyles();

  return (
    <Box
      className={classes.link}
      data-link={value}
      onClick={(event: React.SyntheticEvent<HTMLDivElement>) => {
        event.preventDefault();
        onClick(event);
      }}
    >
      <Checkbox
        color="mainBlue.9"
        checked={checked}
        label={<Text className={classes.checkbox}>{label}</Text>}
      />
      <Text className={classes.counter}>{counter && counter}</Text>
    </Box>
  );
};
