import { Box, Button, Select, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';
import { Dispatch, FC, SetStateAction } from 'react';
import { LabelSelect } from '../../../../../components/label-select';
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

  const handleChangeZodiac = (value: string) => {
    setZodiac(value);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.center}>
        <Box sx={{ width: '100%' }}>
          <Text fw={600} ta="center" size="xl" color="white" mb={40}>
            В каждом из нас есть скрытый демон
          </Text>
          <Text color="#4C6283">
            Зная своего демона, можно лучше понять и принять свою темную сторону, а также научится
            договариваться с ним.
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
        Узнать совместимость
      </Button>
    </Box>
  );
};
