import { Box, Button } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { DropdownMenu } from '../../../../../components/dropdown-menu';

import { IListItem } from '../../../../../types';
import { PagesEnum } from '../../../../../types/enums';
import { zodiacCompatibility } from '../../../../../utils/mock-data/zodiac-compatibility';
import {
  copyLink,
  createAndShareStory,
  shareWall,
  shareLink
} from '../../../../../utils/vk/sharing-method';
import { useStyles } from './styles';
import zodiacCompatibilityResultPhoto from '../../../../../assets/img/zodiac-compatibility/zodiac-compatibility.png';
import { useStores } from '../../../../../utils/hooks/useStores';
import { convertToLocalFile } from '../../../../../utils/files';
import { PhotoResult } from '../../../../../components/generate-photo/test';
import { demonicHoroscopeResultForWall } from '../../../../../utils/results-img/demonic-horoscope-result';

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
  }
];

interface IResultPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
  generalZodiac: string;
}

export const ResultPanel: FC<IResultPanelProps> = observer(({ generalZodiac }) => {
  const { classes } = useStyles();
  const { UserStore } = useStores();

  const getPhoto = async (): Promise<File> => {
    const photo = await convertToLocalFile(zodiacCompatibilityResultPhoto);
    return photo;
  };

  const handleClickMenuItem = useCallback(
    async (event: React.SyntheticEvent<HTMLButtonElement>) => {
      const value = event.currentTarget.dataset.value ?? '';

      const photo = await getPhoto();

      switch (value) {
        case 'send':
          shareLink();
          break;
        case 'stories':
          await createAndShareStory(zodiacCompatibility[generalZodiac], photo, UserStore.token);
          break;
        case 'wall':
          shareWall(event, demonicHoroscopeResultForWall['aries']);

          break;
        case 'copy':
          copyLink();
          break;
        default:
          break;
      }
    },
    []
  );

  return (
    <Box className={classes.container}>
      <PhotoResult
        localLink={zodiacCompatibilityResultPhoto}
        resultText={zodiacCompatibility[generalZodiac]}
      />

      <Box sx={{ width: '100%' }}>
        <DropdownMenu list={list} handleClick={handleClickMenuItem} width="calc(100% - 48px)">
          <Button
            data-value={PagesEnum.horoscopeSubscription}
            color="cyan"
            fullWidth
            radius={8}
            mt={8}
          >
            Поделиться результатом
          </Button>
        </DropdownMenu>
      </Box>
    </Box>
  );
});
