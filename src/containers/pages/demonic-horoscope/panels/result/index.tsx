import { Box, Button, Image } from '@mantine/core';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { DropdownMenu } from '../../../../../components/dropdown-menu';
import { IListItem } from '../../../../../types';
import { PagesEnum } from '../../../../../types/enums';
import {
  demonicHoroscopeResult,
  demonicHoroscopeResultForWall
} from '../../../../../utils/results-img/demonic-horoscope-result';
import {
  copyLink,
  shareWall,
  shareLink,
  sharingStory,
  postPhotoOnWall
} from '../../../../../utils/vk/sharing-method';
import { useStyles } from './styles';
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
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../../utils/hooks/useStores';
import { getUserPlatform } from '../../../../../utils/vk/bridge-methods';
import ariesWeb from '../../../../../assets/img/demonic-horoscope/desktop/aries.png';
import taurusWeb from '../../../../../assets/img/demonic-horoscope/desktop/taurus.png';
import geminiWeb from '../../../../../assets/img/demonic-horoscope/desktop/gemini.png';
import cancerWeb from '../../../../../assets/img/demonic-horoscope/desktop/cancer.png';
import leoWeb from '../../../../../assets/img/demonic-horoscope/desktop/leo.png';
import virgoWeb from '../../../../../assets/img/demonic-horoscope/desktop/virgo.png';
import libraWeb from '../../../../../assets/img/demonic-horoscope/desktop/libra.png';
import scorpioWeb from '../../../../../assets/img/demonic-horoscope/desktop/scorpio.png';
import sagittariusWeb from '../../../../../assets/img/demonic-horoscope/desktop/sagittarius.png';
import capricornWeb from '../../../../../assets/img/demonic-horoscope/desktop/capricorn.png';
import aquariusWeb from '../../../../../assets/img/demonic-horoscope/desktop/aquarius.png';
import piscesWeb from '../../../../../assets/img/demonic-horoscope/desktop/pisces.png';

const list: IListItem[] = [
  {
    label: 'Отправить результат',
    value: 'send'
  },
  {
    label: 'Поделиться в истории',
    value: 'stories'
  },
  {
    label: 'Поделиться на стене',
    value: 'wall'
  },
  {
    label: 'Копировать ссылку',
    value: 'copy'
  },
  {
    label: 'Опубликовать на стене',
    value: 'wall-fast'
  }
];

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

const zodiacLocalPhotoWeb: { [key: string]: string } = {
  aries: ariesWeb,
  taurus: taurusWeb,
  gemini: geminiWeb,
  cancer: cancerWeb,
  leo: leoWeb,
  virgo: virgoWeb,
  libra: libraWeb,
  scorpio: scorpioWeb,
  sagittarius: sagittariusWeb,
  capricorn: capricornWeb,
  aquarius: aquariusWeb,
  pisces: piscesWeb
};

interface IResultPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
  zodiac: string;
}

export const ResultPanel: FC<IResultPanelProps> = observer(({ zodiac }) => {
  const { classes } = useStyles();
  const { UserStore } = useStores();
  const [platform, setPlatform] = useState<string | null>();

  const resultImg = platform === 'web' ? zodiacLocalPhotoWeb[zodiac] : zodiacLocalPhoto[zodiac];

  const handleClickMenuItem = useCallback(
    async (event: React.SyntheticEvent<HTMLButtonElement>) => {
      const value = event.currentTarget.dataset.value ?? '';

      switch (value) {
        case 'send':
          shareLink();
          break;
        case 'stories':
          sharingStory(demonicHoroscopeResult[zodiac]);
          break;
        case 'wall':
          shareWall(event, demonicHoroscopeResultForWall[zodiac]);
          break;
        case 'copy':
          copyLink();
          break;
        case 'wall-fast':
          await postPhotoOnWall(zodiacLocalPhoto[zodiac], UserStore.token);
          break;
        default:
          break;
      }
    },
    []
  );

  useEffect(() => {
    (async () => {
      const platform = await getUserPlatform();
      setPlatform(platform);
    })();
  }, []);

  return (
    <Box className={classes.container}>
      <Image
        radius="md"
        src={resultImg}
        alt="horoscope png"
        height={`calc(100vh - 250px)`}
        fit="contain"
      />

      <Box sx={{ width: '100%' }}>
        <DropdownMenu list={list} handleClick={handleClickMenuItem} width="calc(100% - 48px)">
          <Button
            data-value={PagesEnum.horoscopeSubscription}
            color="button.0"
            fullWidth
            radius={8}
            mt={8}
            sx={{ fontWeight: 500 }}
          >
            Поделиться результатом
          </Button>
        </DropdownMenu>
      </Box>
    </Box>
  );
});
