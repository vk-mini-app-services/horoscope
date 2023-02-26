import { ZodiacSignEnum } from '../../types/enums';

export const getZodiacSign = async (dateString: string): Promise<string> => {
  if (!dateString) {
    return '';
  }

  const dateArray = dateString.split('.');
  if (dateArray.length !== 3) {
    return '';
  }

  const day = Number(dateArray[0]);
  const month = Number(dateArray[1]);

  if (isNaN(day) || isNaN(month)) {
    return '';
  }

  if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) {
    return ZodiacSignEnum.ARIES;
  } else if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
    return ZodiacSignEnum.TAURUS;
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
    return ZodiacSignEnum.GEMINI;
  } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
    return ZodiacSignEnum.CANCER;
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return ZodiacSignEnum.LEO;
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return ZodiacSignEnum.VIRGO;
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return ZodiacSignEnum.LIBRA;
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return ZodiacSignEnum.SCORPIO;
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 20)) {
    return ZodiacSignEnum.SAGITTARIUS;
  } else if ((month === 12 && day >= 21) || (month === 1 && day <= 19)) {
    return ZodiacSignEnum.CAPRICORN;
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 19)) {
    return ZodiacSignEnum.AQUARIUS;
  } else if ((month === 2 && day >= 20) || (month === 3 && day <= 20)) {
    return ZodiacSignEnum.PISCES;
  } else {
    return '';
  }
};
