import { createStyles } from '@mantine/core';

export interface ISearchStylesParams {
  fullSize?: boolean;
}

export const useStyles = createStyles((theme, { fullSize }: ISearchStylesParams) => ({
  search: {
    width: fullSize ? '100%' : 'auto'
  }
}));
