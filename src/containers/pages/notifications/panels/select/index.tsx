import { Box, Button, Select, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconChevronDown } from '@tabler/icons';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { getHoroscopeToday } from '../../../../../api';
import { LabelSelect } from '../../../../../components/label-select';
import ZodiacItem from '../../../../../components/zodiac-item';
import { IZodiac } from '../../../../../types';
import {
  addTextInLocalPhotoNew,
  convertToLocalFile,
  uploadImage
} from '../../../../../utils/files';
import zodiacCompatibilityResultPhoto from '../../../../../assets/img/zodiac-compatibility/zodiac-compatibility.png';
import { zodiacSignList } from '../../../../../utils/mock-data/zodiac-signs';
import { useStyles } from './styles';
import { compatibilityResultLink } from '../../../../../utils/results-img/compatibility-result';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../../utils/hooks/useStores';
import { subscriptionById } from '../../../../../utils/vk/bridge-methods';

interface ISelectPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
  setZodiac: Dispatch<SetStateAction<string>>;
  zodiac: string;
  setSharingPhotoUrl: Dispatch<SetStateAction<string>>;
  setZodiacObj: Dispatch<SetStateAction<IZodiac | null>>;
  zodiacObj: IZodiac | null;
}

export const SelectPanel: FC<ISelectPanelProps> = observer(
  ({ setActivePanel, setZodiac, zodiac, setSharingPhotoUrl, setZodiacObj, zodiacObj }) => {
    const { classes } = useStyles();
    const { UserStore } = useStores();

    const goPanel = async () => {
      setActivePanel('result');
      await subscriptionById(UserStore?.groups?.subGroup, UserStore?.groups?.mailGroup);
    };

    const handleChangeZodiac = (value: string) => {
      setZodiac(value);
    };

    useEffect(() => {
      (async () => {
        try {
          const { data } = await getHoroscopeToday();

          if (data) {
            if (data.success) {
              setZodiacObj(data.message);
            } else {
              showNotification({
                title: data.message,
                message: '',
                autoClose: 10_000,
                color: 'red'
              });
            }
          }
        } catch (e) {
          showNotification({
            title: 'Ошибка!',
            message: '',
            autoClose: 2_000,
            color: 'red'
          });
        }
      })();
    }, []);

    useEffect(() => {
      (async () => {
        const resText = zodiacObj && zodiac ? zodiacObj[zodiac] : '';

        const photFile = await convertToLocalFile(zodiacCompatibilityResultPhoto);
        const { file } = await addTextInLocalPhotoNew(
          resText,
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
    }, [zodiacObj, zodiac]);

    return (
      <Box className={classes.container}>
        <Box className={classes.center}>
          <Box sx={{ width: '100%' }}>
            <Text fw={600} ta="center" size="xl" color="white">
              Актуальный гороскоп готов для Вас
            </Text>
          </Box>

          <Box sx={{ width: '100%' }}>
            <LabelSelect label="Выберите Ваш знак зодиака" />
            <Select
              className={classes.select}
              clearable
              data={zodiacSignList}
              placeholder="Выберите..."
              itemComponent={ZodiacItem}
              onChange={handleChangeZodiac}
              value={zodiac}
              rightSection={<IconChevronDown color="#98A2B3" />}
            />
          </Box>
        </Box>

        <Button
          color="button.0"
          sx={{ fontWeight: 500 }}
          onClick={goPanel}
          fullWidth
          radius={8}
          disabled={!zodiac}
        >
          Получить результат
        </Button>
      </Box>
    );
  }
);
