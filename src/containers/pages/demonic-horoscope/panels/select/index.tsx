import { Box, Button, Select } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';
import { Dispatch, FC, SetStateAction } from 'react';
import { InfoCard } from '../../../../../components/info-card';
import ZodiacItem from '../../../../../components/zodiac-item';

import { zodiacSignList } from '../../../../../utils/mock-data/zodiac-signs';
import { useStyles } from './styles';

interface ISelectPanelProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
  setZodiac: Dispatch<SetStateAction<string>>;
  zodiac: string;
}

export const SelectPanel: FC<ISelectPanelProps> = ({ setActivePanel, setZodiac, zodiac }) => {
  const { classes } = useStyles();

  const goPanel = () => {
    setActivePanel('result');
  };

  const handleChangeZodiacMan = (value: string) => {
    setZodiac(value);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.center}>
        <Box sx={{ width: '100%' }}>
          <InfoCard
            fontSize="16px"
            height="100px"
            bgColor="#15aabf"
            fontColor="white"
            mainText="Написать интересный завликающий текст"
          />
        </Box>

        <Select
          className={classes.select}
          clearable
          data={zodiacSignList}
          label="Выберите знак зодиака женщины"
          placeholder="Выберите..."
          itemComponent={ZodiacItem}
          onChange={handleChangeZodiacMan}
          value={zodiac}
          rightSection={<IconChevronDown color="#98A2B3" />}
        />
      </Box>

      <Button color="cyan" onClick={goPanel} fullWidth radius={8} disabled={!zodiac}>
        Узнать совместимость
      </Button>
    </Box>
  );
};
