import { Box, Button } from '@mantine/core';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { DropdownMenu } from '../../../../../components/dropdown-menu';
import { InfoCard } from '../../../../../components/info-card';
import { IListItem } from '../../../../../types';
import { PagesEnum } from '../../../../../types/enums';
import { zodiacCompatibility } from '../../../../../utils/mock-data/zodiac-compatibility';
import { copyLink, share, shareLink, sharingStory } from '../../../../../utils/vk/sharing-method';
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
  generalZodiac: string;
}

export const ResultPanel: FC<IResultPanelProps> = ({ generalZodiac }) => {
  const { classes } = useStyles();

  const handleClickMenuItem = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.dataset.value ?? '';

    switch (value) {
      case 'send':
        shareLink();
        break;
      case 'stories':
        sharingStory();
        break;
      case 'wall':
        share(event);
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
      <Box sx={{ width: '100%' }}>
        <InfoCard
          fontSize="16px"
          height="100px"
          bgColor="#15aabf"
          fontColor="white"
          mainText={zodiacCompatibility[generalZodiac]}
        />
      </Box>

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
