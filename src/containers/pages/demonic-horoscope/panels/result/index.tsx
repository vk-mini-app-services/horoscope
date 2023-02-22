import { Box, Button, Image } from '@mantine/core';
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
  sharingStory
} from '../../../../../utils/vk/sharing-method';
import { useStyles } from './styles';

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
  zodiac: string;
}

export const ResultPanel: FC<IResultPanelProps> = ({ zodiac }) => {
  const { classes } = useStyles();

  const handleClickMenuItem = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
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
      default:
        break;
    }
  }, []);

  return (
    <Box className={classes.container}>
      <Image
        radius="md"
        src={demonicHoroscopeResult[zodiac]}
        alt="Random unsplash image"
        height={`calc(100vh - 250px)`}
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
};
