import { Box, Button, Select } from '@mantine/core';
import { IconChevronDown, IconCirclePlus } from '@tabler/icons';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import ZodiacItem from '../../../../../components/zodiac-item';

import { zodiacSignListRU } from '../../../../../utils/mock-data/zodiac-signs';
import { useStyles } from './styles';

interface ISelectPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
  setGeneralZodiac: Dispatch<SetStateAction<string>>;
}

export const SelectPanel: FC<ISelectPanelProps> = ({ setActivePanel, setGeneralZodiac }) => {
  const { classes } = useStyles();
  const [zodiacMan, setZodiacMan] = useState<string>('');
  const [zodiacWoman, setZodiacWoman] = useState<string>('');

  const goPanel = () => {
    setActivePanel('result');
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
        <Select
          className={classes.select}
          clearable
          data={zodiacSignListRU}
          label="Выберите знак зодиака мужчины"
          placeholder="Выберите..."
          itemComponent={ZodiacItem}
          onChange={handleChangeZodiacMan}
          value={zodiacMan}
          rightSection={<IconChevronDown color="#98A2B3" />}
        />

        <Box className={classes.center}>
          <IconCirclePlus size="80px" color="#15aabf" />
        </Box>

        <Select
          className={classes.select}
          clearable
          data={zodiacSignListRU}
          label="Выберите знак зодиака женщины"
          placeholder="Выберите..."
          itemComponent={ZodiacItem}
          onChange={handleChangeZodiacWoman}
          value={zodiacWoman}
          rightSection={<IconChevronDown color="#98A2B3" />}
        />
      </Box>

      <Button color="cyan" onClick={goPanel} fullWidth radius={8}>
        Узнать совместимость
      </Button>
    </Box>
  );
};
