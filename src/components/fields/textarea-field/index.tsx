import { FC, ReactNode } from 'react';
import { Textarea } from '@mantine/core';
import { useStyles } from './styles';
import { UseFormReturnType } from '@mantine/form';

interface ITextareaFieldProps {
  fieldName: string;
  form: UseFormReturnType<any>;
  className?: string;
  label?: string;
  disabled?: boolean;
  clearable?: boolean;
  rightSection?: ReactNode;
}

export const TextareaField: FC<ITextareaFieldProps> = ({
  form,
  fieldName,
  className,
  disabled,
  label
}) => {
  const { classes, cx } = useStyles();

  return (
    <Textarea
      className={cx(classes.textFieldInput, className)}
      label={label}
      disabled={disabled}
      radius={8}
      autosize
      {...form.getInputProps(fieldName)}
    />
  );
};
