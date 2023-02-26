import { Box, Button, Text, Image } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Dispatch, FC, SetStateAction } from 'react';
import { useStores } from '../../../../../utils/hooks/useStores';
import { useStyles } from './styles';
import book from '../../../../../assets/img/book.png';

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
      <Image src={book} width={200} height={200} fit="contain" />
      <Box>
        <Text fw={600} ta="center" size="xl" color="white" mb={12}>
          Привет!
        </Text>
        <Text fw={500} size="xl" color="white">
          Это тематическое приложение с гороскопами.
        </Text>
      </Box>

      <Text color="#4C6283">
        {`Мы ничего не пропагандируем, информация
        является развлекательной! Если хочешь ознакомиться, жми кнопку "Начать"`}
      </Text>
      <Button color="button.0" onClick={goSelectPanel} fullWidth sx={{ fontWeight: 500 }}>
        Начать
      </Button>
    </Box>
  );
});
