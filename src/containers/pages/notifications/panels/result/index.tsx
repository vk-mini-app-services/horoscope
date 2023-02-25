import { Box, Button } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { DropdownMenu } from '../../../../../components/dropdown-menu';
import { IListItem, IZodiac } from '../../../../../types';
import { PagesEnum } from '../../../../../types/enums';
import {
  copyLink,
  shareWall,
  shareLink,
  sharingStory
} from '../../../../../utils/vk/sharing-method';
import { useStyles } from './styles';
import zodiacCompatibilityResultPhoto from '../../../../../assets/img/zodiac-compatibility/zodiac-compatibility.png';
import { PhotoResult } from '../../../../../components/generate-photo';
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
  zodiac: string;
  sharingPhotoUrl: string;
  zodiacObj: IZodiac | null;
}

export const ResultPanel: FC<IResultPanelProps> = observer(
  ({ zodiac, sharingPhotoUrl, zodiacObj }) => {
    const { classes } = useStyles();
    // const { UserStore } = useStores();

    const handleClickMenuItem = useCallback(
      async (event: React.SyntheticEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.dataset.value ?? '';

        // const photo = await getPhoto();

        switch (value) {
          case 'send':
            shareLink();
            break;
          case 'stories':
            await sharingStory(sharingPhotoUrl);
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
      [sharingPhotoUrl]
    );

    return (
      <Box className={classes.container}>
        <PhotoResult
          localLink={zodiacCompatibilityResultPhoto}
          resultText={zodiacObj ? zodiacObj[zodiac] : ''}
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
  }
);
