import { Box, Button, Image, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { useStores } from '../../../../../utils/hooks/useStores';
import { getUserToken } from '../../../../../utils/vk/bridge-methods';
import { useStyles } from './styles';
import scroll from '../../../../../assets/img/scroll.png';
import defaultResultPhoto from '../../../../../assets/img/access-publish-photo/pic14.png';
import { postPhotoOnWall } from '../../../../../utils/vk/sharing-method';
import { convertToLocalFileInBlob } from '../../../../../utils/files';
import aries from '../../../../../assets/img/demonic-horoscope/aries.png';
import taurus from '../../../../../assets/img/demonic-horoscope/taurus.png';
import gemini from '../../../../../assets/img/demonic-horoscope/gemini.png';
import cancer from '../../../../../assets/img/demonic-horoscope/cancer.png';
import leo from '../../../../../assets/img/demonic-horoscope/leo.png';
import virgo from '../../../../../assets/img/demonic-horoscope/virgo.png';
import libra from '../../../../../assets/img/demonic-horoscope/libra.png';
import scorpio from '../../../../../assets/img/demonic-horoscope/scorpio.png';
import sagittarius from '../../../../../assets/img/demonic-horoscope/sagittarius.png';
import capricorn from '../../../../../assets/img/demonic-horoscope/capricorn.png';
import aquarius from '../../../../../assets/img/demonic-horoscope/aquarius.png';
import pisces from '../../../../../assets/img/demonic-horoscope/pisces.png';
import { getZodiacSign } from '../../../../../utils/helpers';
interface IAccessPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
}

const zodiacLocalPhoto: { [key: string]: string } = {
  aries: aries,
  taurus: taurus,
  gemini: gemini,
  cancer: cancer,
  leo: leo,
  virgo: virgo,
  libra: libra,
  scorpio: scorpio,
  sagittarius: sagittarius,
  capricorn: capricorn,
  aquarius: aquarius,
  pisces: pisces
};

export const AccessPanel: FC<IAccessPanelProps> = observer(({ setActivePanel }) => {
  const { classes } = useStyles();
  const { UserStore } = useStores();

  const handleAction = useCallback(async (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.dataset.value;

    if (value === 'yes') {
      const token = await getUserToken('wall,photos');

      if (token && UserStore.userInfo) {
        UserStore.setUserToken(token);

        const currentZodiacByUserBirthDate = await getZodiacSign(UserStore?.userInfo?.bdate ?? '');

        // TODO: ЗАменить дефолтное фото.
        const photo = currentZodiacByUserBirthDate
          ? zodiacLocalPhoto[currentZodiacByUserBirthDate]
          : defaultResultPhoto;

        const blob = await convertToLocalFileInBlob(photo);
        await postPhotoOnWall(blob, token);

        setActivePanel('select');
      }
    } else {
      setActivePanel('select');
    }
  }, []);

  return (
    <Box className={classes.container}>
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
