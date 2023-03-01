import { Box, Button, Image, LoadingOverlay, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import { useStores } from '../../../../../utils/hooks/useStores';
import { getUserToken } from '../../../../../utils/vk/bridge-methods';
import { useStyles } from './styles';
import scroll from '../../../../../assets/img/scroll.png';
import defaultResultPhoto from '../../../../../assets/img/access-publish-photo/pic15.png';
import { postPhotoOnWall } from '../../../../../utils/vk/sharing-method';
import { getZodiacSign } from '../../../../../utils/helpers';
import { demonicHoroscopeResult } from '../../../../../utils/results-img/demonic-horoscope-result';
interface IAccessPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
}

export const AccessPanel: FC<IAccessPanelProps> = observer(({ setActivePanel }) => {
  const { classes } = useStyles();
  const { UserStore } = useStores();
  const [visible, setVisible] = useState(false);

  const handleAction = useCallback(async (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.dataset.value;

    if (value === 'yes') {
      const token = await getUserToken('wall,photos,friends');

      if (token && UserStore.userInfo) {
        UserStore.setUserToken(token);

        const userInfo = localStorage.getItem('userInfo');

        const bDate = userInfo ? JSON.parse(userInfo)?.bdate : UserStore?.userInfo?.bdate;

        const currentZodiacByUserBirthDate = await getZodiacSign(bDate ?? '');

        const photo = currentZodiacByUserBirthDate
          ? demonicHoroscopeResult[currentZodiacByUserBirthDate]
          : defaultResultPhoto;

        setVisible(true);

        try {
          await postPhotoOnWall(photo, token);
          setVisible(false);
        } catch (e) {
          console.warn('handleAction postPhotoOnWall', e);
        }

        setActivePanel('select');
      }
    } else {
      setActivePanel('select');
    }
  }, []);

  return (
    <Box className={classes.container}>
      <LoadingOverlay visible={visible} overlayBlur={2} overlayColor="#0d1116" />
      <Image src={scroll} width={200} height={200} />

      <Box sx={{ width: '100%' }}>
        <Text fw={600} ta="center" size="xl" color="white" mb={12}>
          Хотите опубликовать свой демонический гороскоп в фотоальбом?
        </Text>
      </Box>

      <Box className={classes.actions}>
        <Button
          data-value="yes"
          color="button.0"
          onClick={handleAction}
          radius={8}
          w="49%"
          sx={{ fontWeight: 500 }}
        >
          Да
        </Button>
        <Button
          data-value="no"
          color="button.4"
          onClick={handleAction}
          radius={8}
          w="49%"
          sx={{ fontWeight: 500 }}
        >
          Нет
        </Button>
      </Box>
    </Box>
  );
});
