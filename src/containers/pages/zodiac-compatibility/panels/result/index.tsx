import { Box, Button } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { DropdownMenu } from '../../../../../components/dropdown-menu';

import { IListItem } from '../../../../../types';
import { PagesEnum } from '../../../../../types/enums';
import { zodiacCompatibility } from '../../../../../utils/mock-data/zodiac-compatibility';
import {
  copyLink,
  shareWall,
  shareLink,
  sharingStory
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

  const [sharingPhotoUrl, setSharingPhotoUrl] = useState<string>('');

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
        default:
          break;
      }
    },
    [sharingPhotoUrl]
  );

  useEffect(() => {
    (async () => {
      const photFile = await convertToLocalFile(zodiacCompatibilityResultPhoto);
      const { file } = await addTextInLocalPhotoNew(
        zodiacCompatibility[generalZodiac],
        photFile,
        'Переходи по ссылке в приложение'
      );

      const linkPhoto = await uploadImage(file);

      if (linkPhoto) {
        setSharingPhotoUrl(linkPhoto);
      } else {
        // TODO: добавить ссылку на статичныую картинку, если не получится загрузить основную фото
        setSharingPhotoUrl(compatibilityResultLink);
      }
    })();
  }, []);

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
