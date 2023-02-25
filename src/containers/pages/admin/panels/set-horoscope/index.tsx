import { Box, Button, SimpleGrid } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useStyles } from './styles';
import { TextFieldInput } from '../../../../../components/fields/text-field-input';
import { useForm } from '@mantine/form';
import { setAllHoroscopes } from '../../../../../api';
import { formatDate } from '../../../../../utils/date';
import { showNotification } from '@mantine/notifications';
import { zodiacRus } from '../../../../../utils/mock-data/zodiac-signs';
import { ScrollContainer } from '../../../../../components/scroll-container';
import { DatePickerForm } from '../../../../../components/fields/date-picker-form';

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

  const form = useForm({
    initialValues: dataForm,
    validateInputOnChange: true
  });

  const onSubmit = (values: any) => {
    console.log('values', values);
  };

  const handleSubmit = useCallback(async () => {
    onSubmit(form.values);

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
        <ScrollContainer className={classes.scroll}>
          <SimpleGrid cols={2} mt={16} w="100%">
            <DatePickerForm
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
                    <TextFieldInput
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
        <Button color="button.0" onClick={handleSubmit} fullWidth sx={{ fontWeight: 500 }}>
          Сохранить
        </Button>
      </form>
    </Box>
  );
});
