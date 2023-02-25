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
  dropdownType?: 'popover' | 'modal';
}

export const DatePickerForm: FC<IDatePickerFormProps> = ({
  form,
  fieldName,
  className,
  disabled,
  label,
  placeholder,
  dropdownType
}) => {
  const { classes, cx } = useStyles();

  return (
    <DatePicker
      dropdownType={dropdownType}
      className={cx(classes.birthDate, className)}
      locale="ru"
      inputFormat="DD.MM.YYYY"
      placeholder={placeholder}
      label={label}
      disabled={disabled}
      defaultValue={form.values[fieldName]}
      onChange={(value: Date) => form?.setFieldValue(fieldName, value)}
      error={form.errors[fieldName]}
    />
  );
};
