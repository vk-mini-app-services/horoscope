import { FC } from 'react';
import { DefaultProps, Input, InputProps, Selectors } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { ISearchStylesParams, useStyles } from './styles';

type MyComponentStylesNames = Selectors<typeof useStyles>;

export interface ISearchProps extends DefaultProps<MyComponentStylesNames, ISearchStylesParams> {
  placeholder?: string;
  props?: InputProps;
  fullSize?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export const Search: FC<ISearchProps> = ({
  placeholder = 'Search...',
  classNames,
  className,
  fullSize,
  styles,
  unstyled,
  onChange,
  ...props
}) => {
  const { classes, cx } = useStyles({ fullSize }, { name: 'Search', classNames, styles, unstyled });

  return (
    <Input
      className={cx(classes.search, className)}
      icon={<IconSearch />}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    />
  );
};
