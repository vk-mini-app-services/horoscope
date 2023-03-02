import { Box, Button } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { DropdownMenu } from '../../../../../components/dropdown-menu';

import { IListItem } from '../../../../../types';
import { PagesEnum } from '../../../../../types/enums';
import { _zodiacCompatibility } from '../../../../../utils/mock-data/zodiac-compatibility';
import {
  copyLink,
  shareWall,
  shareLink,
  sharingStory,
  postPhotoOnWall
} from '../../../../../utils/vk/sharing-method';
import { useStyles } from './styles';
import zodiacCompatibilityResultPhoto from '../../../../../assets/img/zodiac-compatibility/zodiac-compatibility.png';
import {
  addTextInLocalPhotoNew,
  convertToLocalFile,
  uploadImage
} from '../../../../../utils/files';
import { PhotoResult } from '../../../../../components/generate-photo';
import {
  compatibilityResultLink,
  compatibilityResultLinkForWall
} from '../../../../../utils/results-img/compatibility-result';
import { useStores } from '../../../../../utils/hooks/useStores';
import desktopZodiacResult from '../../../../../assets/img/zodiac-compatibility/desktop/zodiac-res.png';

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

interface IResultPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
  generalZodiac: string;
}

export const ResultPanel: FC<IResultPanelProps> = observer(({ generalZodiac }) => {
  const { classes } = useStyles();
  const { UserStore } = useStores();

  const [sharingPhotoUrl, setSharingPhotoUrl] = useState<string>('');

  const [photo, setPhoto] = useState<string>('');

  const handleClickMenuItem = useCallback(
    async (event: React.SyntheticEvent<HTMLButtonElement>) => {
      const value = event.currentTarget.dataset.value ?? '';

      switch (value) {
        case 'send':
          shareLink();
          break;
        case 'stories':
          await sharingStory(sharingPhotoUrl);
          break;
        case 'wall':
          shareWall(event, compatibilityResultLinkForWall);
          break;
        case 'copy':
          copyLink();
          break;
        case 'wall-fast':
          await postPhotoOnWall(sharingPhotoUrl, UserStore.token);
          break;
        default:
          break;
      }
    },
    [sharingPhotoUrl, UserStore.token]
  );

  useEffect(() => {
    (async () => {
      const photFile = await convertToLocalFile(zodiacCompatibilityResultPhoto);
      const { file } = await addTextInLocalPhotoNew(
        _zodiacCompatibility[generalZodiac],
        photFile,
        'Переходи по ссылке в приложение'
      );

      const linkPhoto = await uploadImage(file);

      if (linkPhoto) {
        setSharingPhotoUrl(linkPhoto);
      } else {
        setSharingPhotoUrl(compatibilityResultLink);
      }
    })();
  }, []);

  useEffect(() => {
    const resultText = _zodiacCompatibility[generalZodiac];
    (async () => {
      if (UserStore.platform === 'web') {
        const photFile = await convertToLocalFile(desktopZodiacResult);
        const { base64 } = await addTextInLocalPhotoNew(resultText, photFile, '', 700, 400);
        setPhoto(base64);
      } else {
        const photFile = await convertToLocalFile(zodiacCompatibilityResultPhoto);
        const { base64 } = await addTextInLocalPhotoNew(resultText, photFile, '');
        setPhoto(base64);
      }
    })();
  }, [UserStore.platform]);

  return (
    <Box className={classes.container}>
      <PhotoResult photo={photo} />

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
