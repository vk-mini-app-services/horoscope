import { Box, Button, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUserInSubscription } from '../../../../../api';
import { Modal } from '../../../../../components/modal';
import { PagesEnum } from '../../../../../types/enums';
import { NAME_PROJECT, USER_ID } from '../../../../../utils/constants';
import { useStyles } from './styles';

interface ISelectPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
}

export const SelectPanel: FC<ISelectPanelProps> = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  const handleGoPage = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.dataset.value;

    navigate(`/${value}`);
  }, []);

  const handleSubscription = async () => {
    const { data } = await addUserInSubscription({
      appName: NAME_PROJECT,
      userId: USER_ID
    });

    if (data && data?.success) {
      showNotification({
        title: `Вы успешно добавлены в рассылку!`,
        message: '',
        autoClose: 5_000,
        color: 'green'
      });
    } else {
      showNotification({
        title: `Ошибка!`,
        message: data?.message,
        autoClose: 10_000,
        color: 'red'
      });
    }

    setOpened(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setOpened(true);
    }, 5_000);
  }, []);

  return (
    <Box className={classes.container}>
      <Box sx={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center' }}>
        <Text fw={600} ta="center" size="xl" color="white" mb={12}>
          В нашем приложении на данный момент доступен функционал
        </Text>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Button
          data-value={PagesEnum.zodiacCompatibility}
          color="button.0"
          onClick={handleGoPage}
          fullWidth
          radius={8}
          sx={{ fontWeight: 500 }}
        >
          Совместимость знаков зодиака
        </Button>
        <Button
          data-value={PagesEnum.demonicHoroscope}
          color="button.0"
          onClick={handleGoPage}
          fullWidth
          radius={8}
          mt={8}
          sx={{ fontWeight: 500 }}
        >
          {`Кто ты по "Демоническому гороскопу"`}
        </Button>
        <Button
          data-value={PagesEnum.horoscopeSubscription}
          color="button.0"
          onClick={handleGoPage}
          fullWidth
          radius={8}
          mt={8}
          sx={{ fontWeight: 500 }}
        >
          Получать актуальный гороскоп каждый день
        </Button>
      </Box>

      <Modal
        setOpened={setOpened}
        opened={opened}
        title="Подписка на уведомления"
        buttonText="Включить уведомления"
        onClickButton={handleSubscription}
      />
    </Box>
  );
};
