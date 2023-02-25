import { FC } from 'react';
import { useStyles } from './styles';
import { UseFormReturnType } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/ru';

interface IDatePickerFormProps {
  fieldName: string;
  form: UseFormReturnType<any>;
  className?: string;
  label?: string;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
}

export const DatePickerForm: FC<IDatePickerFormProps> = ({
  form,
  fieldName,
  className,
  disabled,
  label,
  placeholder
}) => {
  const { classes, cx } = useStyles();

  return (
    <DatePicker
      className={cx(classes.birthDate, className)}
      locale="ru"
      inputFormat="DD.MM.YYYY"
      placeholder={placeholder}
      label={label}
      disabled={disabled}
      defaultValue={form.values.BirthDate}
      onChange={(value: Date) => form?.setFieldValue(fieldName, value)}
      error={form.errors[fieldName]}
    />
  );
};
