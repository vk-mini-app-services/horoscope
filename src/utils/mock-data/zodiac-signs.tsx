import { ZodiacSignEnum } from '../../types/enums';
import { IconZodiacAries } from '@tabler/icons';
import { IconZodiacTaurus } from '@tabler/icons';
import { IconZodiacGemini } from '@tabler/icons';
import { IconZodiacCancer } from '@tabler/icons';
import { IconZodiacLeo } from '@tabler/icons';
import { IconZodiacVirgo } from '@tabler/icons';
import { IconZodiacLibra } from '@tabler/icons';
import { IconZodiacScorpio } from '@tabler/icons';
import { IconZodiacSagittarius } from '@tabler/icons';
import { IconZodiacCapricorn } from '@tabler/icons';
import { IconZodiacAquarius } from '@tabler/icons';
import { IconZodiacPisces } from '@tabler/icons';

export const zodiacSignList = [
  {
    label: 'Овен',
    value: ZodiacSignEnum.ARIES,
    icon: <IconZodiacAries />
  },
  {
    label: 'Телец',
    value: ZodiacSignEnum.TAURUS,
    icon: <IconZodiacTaurus />
  },
  {
    label: 'Близнецы',
    value: ZodiacSignEnum.GEMINI,
    icon: <IconZodiacGemini />
  },
  {
    label: 'Рак',
    value: ZodiacSignEnum.CANCER,
    icon: <IconZodiacCancer />
  },
  {
    label: 'Лев',
    value: ZodiacSignEnum.LEO,
    icon: <IconZodiacLeo />
  },
  {
    label: 'Дева',
    value: ZodiacSignEnum.VIRGO,
    icon: <IconZodiacVirgo />
  },
  {
    label: 'Весы',
    value: ZodiacSignEnum.LIBRA,
    icon: <IconZodiacLibra />
  },
  {
    label: 'Скорпион',
    value: ZodiacSignEnum.SCORPIO,
    icon: <IconZodiacScorpio />
  },
  {
    label: 'Стрелец',
    value: ZodiacSignEnum.SAGITTARIUS,
    icon: <IconZodiacSagittarius />
  },
  {
    label: 'Козерог',
    value: ZodiacSignEnum.CAPRICORN,
    icon: <IconZodiacCapricorn />
  },
  {
    label: 'Водолей',
    value: ZodiacSignEnum.AQUARIUS,
    icon: <IconZodiacAquarius />
  },
  {
    label: 'Рыбы',
    value: ZodiacSignEnum.PISCES,
    icon: <IconZodiacPisces />
  }
];

export const zodiacSignListRU = [
  {
    label: 'Овен',
    value: 'Овен',
    icon: <IconZodiacAries />
  },
  {
    label: 'Телец',
    value: 'Телец',
    icon: <IconZodiacTaurus />
  },
  {
    label: 'Близнецы',
    value: 'Близнецы',
    icon: <IconZodiacGemini />
  },
  {
    label: 'Рак',
    value: 'Рак',
    icon: <IconZodiacCancer />
  },
  {
    label: 'Лев',
    value: 'Лев',
    icon: <IconZodiacLeo />
  },
  {
    label: 'Дева',
    value: 'Дева',
    icon: <IconZodiacVirgo />
  },
  {
    label: 'Весы',
    value: 'Весы',
    icon: <IconZodiacLibra />
  },
  {
    label: 'Скорпион',
    value: 'Скорпион',
    icon: <IconZodiacScorpio />
  },
  {
    label: 'Стрелец',
    value: 'Стрелец',
    icon: <IconZodiacSagittarius />
  },
  {
    label: 'Козерог',
    value: 'Козерог',
    icon: <IconZodiacCapricorn />
  },
  {
    label: 'Водолей',
    value: 'Водолей',
    icon: <IconZodiacAquarius />
  },
  {
    label: 'Рыбы',
    value: 'Рыбы',
    icon: <IconZodiacPisces />
  }
];

export const zodiacRus: { [key: string]: string } = {
  aries: 'Овен',
  taurus: 'Телец',
  gemini: 'Близнецы',
  cancer: 'Рак',
  leo: 'Лев',
  virgo: 'Дева',
  libra: 'Весы',
  scorpio: 'Скорпион',
  sagittarius: 'Стрелец',
  capricorn: 'Козерог',
  aquarius: 'Водолей',
  pisces: 'Рыбы'
};
