import { Box, Button, Text, Image } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { observer } from 'mobx-react-lite';
// import { useState } from 'react';
import { addUserInSubscription } from '../../../api';
import noty from '../../../assets/img/noty.png';
// import { Modal } from '../../../components/modal';
import { NAME_PROJECT, USER_ID } from '../../../utils/constants';
import { useAds } from '../../../utils/hooks/useAds';
import { appAllowNotifications } from '../../../utils/vk/bridge-methods';
import { Layout } from '../../layout';
import { useStyles } from './styles';

export const HoroscopeSubscription = observer(() => {
  const { classes } = useStyles();

  // const [opened, setOpened] = useState(false);

  useAds();

  const handleClick = async () => {
    const res = await appAllowNotifications();

    if (res) {
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
    }
  };

  return (
    <Layout>
      <Box className={classes.container}>
        <Image src={noty} width={200} height={200} fit="contain" />
        <Box mb={12}>
          <Text fw={600} ta="center" size="xl" color="white">
            Для того, чтобы получать
          </Text>
          <Text fw={500} size="xl" color="white">
            <span style={{ color: '#D649ED' }}>ежедневный гороскоп</span>, нужно
          </Text>
          <Text fw={500} size="xl" color="white" ta="center">
            включить уведомления.
          </Text>
        </Box>

        <Text color="#4C6283">
          {`
Один раз в день утром, мы будем отправлять 
Вам гороскоп по Вашему знаку зодиака.`}
        </Text>
        <Button onClick={handleClick} color="button.0" fullWidth sx={{ fontWeight: 500 }}>
          Включить уведомления
        </Button>
      </Box>

      {/* <Modal
        setOpened={setOpened}
        opened={opened}
        title="Подписка на уведомления"
        buttonText="Включить уведомления"
        onClickButton={handleClick}
      /> */}
    </Layout>
  );
});
