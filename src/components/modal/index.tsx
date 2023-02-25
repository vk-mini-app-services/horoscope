import { Box, Button, Modal as DefaultModal, Text } from '@mantine/core';
import { Dispatch, FC, SetStateAction } from 'react';
import { useStyles } from './styles';

interface IModalProps {
  setOpened: Dispatch<SetStateAction<boolean>>;
  opened: boolean;
  title: string;
  buttonText: string;
  onClickButton: () => void;
}

export const Modal: FC<IModalProps> = ({ setOpened, opened, title, onClickButton, buttonText }) => {
  const { classes } = useStyles();

  return (
    <DefaultModal
      className={classes.root}
      centered
      opened={opened}
      onClose={() => setOpened(false)}
      title={title}
    >
      <Box className={classes.container}>
        <Text fw={600} ta="center" size="sm" color="white" mb={12}>
          Один раз в день утром, мы будем отправлять Вам гороскоп по Вашему знаку зодиака.
        </Text>

        <Button
          color="button.0"
          onClick={onClickButton}
          fullWidth
          radius={8}
          mt={8}
          sx={{ fontWeight: 500 }}
        >
          {buttonText}
        </Button>
      </Box>
    </DefaultModal>
  );
};
