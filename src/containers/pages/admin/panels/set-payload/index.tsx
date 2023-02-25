import { Button, SimpleGrid } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useStyles } from './styles';
import { FormErrors, useForm } from '@mantine/form';
import { setPayload } from '../../../../../api';
import { showNotification } from '@mantine/notifications';
import { z } from 'zod';
import {
  getValidateErrors,
  numberRegExp,
  numberRegExpErrorText
} from '../../../../../utils/validation';
import { useStores } from '../../../../../utils/hooks/useStores';
import { TextFieldInput } from '../../../../../components/fields/text-field-input';

const today = new Date();
const yesterday = new Date(today.getTime());
yesterday.setDate(today.getDate() - 1);

interface IItemForm {
  [key: string]: number;
}

export const SetPayloadPanel = observer(() => {
  const { classes } = useStyles();
  const { UserStore } = useStores();

  const dataForm: IItemForm = {
    subGroup: UserStore?.groups?.subGroup ?? 0,
    mailGroup: UserStore?.groups?.mailGroup ?? 0
  };

  const form = useForm({
    initialValues: dataForm,
    validateInputOnChange: true,
    validate: (values: IItemForm): FormErrors => getValidateErrors(validateScheme, values)
  });

  const handleSubmit = useCallback(async () => {
    let payload = {};
    payload = form.values.subGroup
      ? { ...payload, subGroup: Number(form.values.subGroup) }
      : payload;
    payload = form.values.mailGroup
      ? { ...payload, mailGroup: Number(form.values.mailGroup) }
      : payload;

    try {
      const { data } = await setPayload(payload);

      if (data) {
        showNotification({
          title: 'Ссылки обновлены!',
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
    <form className={classes.container}>
      <SimpleGrid cols={1} w="100%">
        <TextFieldInput
          placeholder="Введите id группы"
          fieldName="subGroup"
          label="Подписка на группу"
          form={form}
          clearable
        />
        <TextFieldInput
          placeholder="Введите id группы"
          fieldName="mailGroup"
          label="Подписка на рассылку"
          form={form}
          clearable
        />
      </SimpleGrid>

      <Button color="button.0" onClick={handleSubmit} fullWidth sx={{ fontWeight: 500 }}>
        Сохранить
      </Button>
    </form>
  );
});

const validateScheme = z.object({
  // subGroup: z.string().min(1, 'Минимум 1 символ'),
  // mailGroup: z.string().min(1, 'Минимум 1 символ'),
  subGroup: z.string().regex(numberRegExp, { message: numberRegExpErrorText }),
  mailGroup: z.string().regex(numberRegExp, { message: numberRegExpErrorText })
});
