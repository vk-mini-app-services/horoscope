import { Box, Button, SimpleGrid } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { useStyles } from './styles';
import { FormErrors, useForm } from '@mantine/form';
import { setAllHoroscopes } from '../../../../../api';
import { formatDate } from '../../../../../utils/date';
import { showNotification } from '@mantine/notifications';
import { zodiacRus } from '../../../../../utils/mock-data/zodiac-signs';
import { ScrollContainer } from '../../../../../components/scroll-container';
import { DatePickerForm } from '../../../../../components/fields/date-picker-form';
import { TextareaField } from '../../../../../components/fields/textarea-field';
import { z } from 'zod';
import { getValidateErrors } from '../../../../../utils/validation';
import { useMediaQuery } from '@mantine/hooks';

const today = new Date();
const yesterday = new Date(today.getTime());
yesterday.setDate(today.getDate() - 1);

interface IZodiacInitForm {
  [key: string]: string;
}

const dataForm: IZodiacInitForm = {
  date: '',
  aries: '',
  taurus: '',
  gemini: '',
  cancer: '',
  leo: '',
  virgo: '',
  libra: '',
  scorpio: '',
  sagittarius: '',
  capricorn: '',
  aquarius: '',
  pisces: ''
};

export const SetHoroscopePanel = observer(() => {
  const { classes } = useStyles();
  const [datePickerKey, setDatePickerKey] = useState<number>(0);

  const isMobile = useMediaQuery('(max-width: 755px)');

  const form = useForm({
    initialValues: dataForm,
    validateInputOnChange: true,
    validate: (values: IZodiacInitForm): FormErrors => getValidateErrors(validateScheme, values)
  });

  const clearAllFields = () => {
    form.reset();
    form.setFieldValue('date', '');
    form.setTouched({ date: true });
    setDatePickerKey(Math.random());
  };

  const handleSubmit = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { date, ...zodiacData } = form.values;

    try {
      const { data } = await setAllHoroscopes({
        date: formatDate(form.values.date),
        data: { ...zodiacData }
      });

      if (data) {
        showNotification({
          title: data.message,
          message: '',
          autoClose: 10_000,
          color: data.success ? 'green' : 'red'
        });
      }
    } catch (e) {
      showNotification({
        title: 'Ошибка!',
        message: '',
        autoClose: 2_000,
        color: 'red'
      });
    }
  }, [form]);

  return (
    <Box className={classes.container}>
      <form style={{ width: '100%' }}>
        <Button
          color="button.6"
          fullWidth
          radius={8}
          mt={8}
          sx={{
            fontWeight: 500
          }}
          onClick={clearAllFields}
          w="100%"
        >
          Очистить поля
        </Button>
        <ScrollContainer className={classes.scroll}>
          <SimpleGrid cols={2} mt={16} w="100%">
            <DatePickerForm
              dropdownType={isMobile ? 'modal' : 'popover'}
              key={datePickerKey}
              fieldName="date"
              placeholder="Выберите дату гороскопа"
              label="Дата гороскопа"
              form={form}
            />

            {Object.keys(dataForm).map((zodiac) => {
              const value = zodiacRus[zodiac] ? zodiacRus[zodiac] : null;
              return (
                <>
                  {value ? (
                    <TextareaField
                      key={zodiac}
                      fieldName={zodiac}
                      label={zodiacRus[zodiac]}
                      form={form}
                    />
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </SimpleGrid>
        </ScrollContainer>
        <Button
          disabled={!form.isValid()}
          color="button.0"
          onClick={handleSubmit}
          fullWidth
          sx={{ fontWeight: 500 }}
        >
          Сохранить
        </Button>
      </form>
    </Box>
  );
});

const validateScheme = z.object({
  date: z
    .date({ invalid_type_error: 'Укажите дату гороскопа' })
    .min(yesterday, { message: 'Дата должна быть текущей или больше' })
});
