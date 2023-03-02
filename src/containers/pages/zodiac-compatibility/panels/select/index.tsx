import { Box, Button, Select, Space } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';
import { observer } from 'mobx-react-lite';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { GenderFemaleIcon, GenderMaleIcon } from '../../../../../assets/icons';
import { LabelSelect } from '../../../../../components/label-select';
import ZodiacItem from '../../../../../components/zodiac-item';
import { useStores } from '../../../../../utils/hooks/useStores';

import { zodiacSignListRU } from '../../../../../utils/mock-data/zodiac-signs';
import { subscriptionById } from '../../../../../utils/vk/bridge-methods';
import { useStyles } from './styles';

interface ISelectPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
  setGeneralZodiac: Dispatch<SetStateAction<string>>;
}

export const SelectPanel: FC<ISelectPanelProps> = observer(
  ({ setActivePanel, setGeneralZodiac }) => {
    const { classes } = useStyles();
    const { UserStore } = useStores();
    const [zodiacMan, setZodiacMan] = useState<string>('');
    const [zodiacWoman, setZodiacWoman] = useState<string>('');

    const goPanel = async () => {
      setActivePanel('result');
      await subscriptionById(UserStore?.groups?.subGroup, UserStore?.groups?.mailGroup);
    };

    const handleChangeZodiacMan = (value: string) => {
      setZodiacMan(value);
    };

    const handleChangeZodiacWoman = (value: string) => {
      setZodiacWoman(value);
    };

    useEffect(() => {
      setGeneralZodiac(`${zodiacMan}|${zodiacWoman}`);
    }, [zodiacMan, zodiacWoman]);

    return (
      <Box className={classes.container}>
        <Box w="100%">
          <LabelSelect label="Выберите знак зодиака мужчины" icon={<GenderMaleIcon />} />
          <Select
            className={classes.select}
            clearable
            data={zodiacSignListRU}
            placeholder="Выберите..."
            itemComponent={ZodiacItem}
            onChange={handleChangeZodiacMan}
            value={zodiacMan}
            rightSection={<IconChevronDown color="#98A2B3" />}
          />

          <Space h="xl" />

          <LabelSelect label="Выберите знак зодиака женщины" icon={<GenderFemaleIcon />} />
          <Select
            className={classes.select}
            clearable
            data={zodiacSignListRU}
            placeholder="Выберите..."
            itemComponent={ZodiacItem}
            onChange={handleChangeZodiacWoman}
            value={zodiacWoman}
            rightSection={<IconChevronDown color="#98A2B3" />}
          />
        </Box>

        <Button
          color="button.0"
          onClick={goPanel}
          fullWidth
          radius={8}
          disabled={!zodiacMan || !zodiacWoman}
          sx={{ fontWeight: 500 }}
        >
          Узнать результат
        </Button>
      </Box>
    );
  }
);
