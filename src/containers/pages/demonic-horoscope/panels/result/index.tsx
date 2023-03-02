import { Box, Button, Image, Loader } from '@mantine/core';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
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

interface IResultPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
  zodiac: string;
  resultImg: string;
}

export const ResultPanel: FC<IResultPanelProps> = observer(({ zodiac, resultImg }) => {
  const { classes } = useStyles();
  const { UserStore } = useStores();

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

  return (
    <Box className={classes.container}>
      {resultImg ? (
        <Image
          radius="md"
          src={resultImg}
          alt="horoscope png"
          height={`calc(100vh - 250px)`}
          fit="contain"
        />
      ) : (
        <Loader />
      )}

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
