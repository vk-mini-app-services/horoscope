import { Box, Button, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Dispatch, FC, SetStateAction } from 'react';
import { useStores } from '../../../../../utils/hooks/useStores';
import { useStyles } from './styles';

interface IStartPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
}

export const StartPanel: FC<IStartPanelProps> = observer(({ setActivePanel }) => {
  const { classes } = useStyles();
  const { UserStore } = useStores();

  const goSelectPanel = () => {
    if (UserStore.token) {
      setActivePanel('select');
    } else {
      setActivePanel('access-publish-photo');
    }
  };

  return (
    <Box className={classes.container}>
      <Box>
        <Text fw={600} ta="center">
          Привет!
        </Text>
        <Text fw={600}>Это тематические приложение с гороскопами.</Text>
      </Box>

      <Text>
        {`Мы ничего не пропагандируем, информация
        является развлекательной! Если хочешь ознакомиться, жми кнопку "Начать"`}
      </Text>
      <Button color="cyan" onClick={goSelectPanel} fullWidth>
        Начать
      </Button>
    </Box>
  );
});
