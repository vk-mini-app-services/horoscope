import moment from 'moment';

export const formatDate = (value: string | Date | null): string | null => {
  return value ? moment(value).format('DD.MM.YYYY') : '';
};
