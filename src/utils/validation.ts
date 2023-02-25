import { FormErrors } from '@mantine/form';
import { ZodError, ZodObject } from 'zod';

export const emailRegExp = /^[a-zA-Z0-9_*\-*.*]+@[a-zA-Z0-9\-*]+\.*[A-Za-z.*\-*]*\.[A-Za-z]+$/;
export const emailRegExpErrorText = `Неверный адрес электронной почты. Должен быть в формате "example@email.com`;

export const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
export const passwordRegExpErrorText =
  'Пароль должен содержать не менее 8 символов, одну заглавную букву, одну строчную букву и одну цифру.';

export const rusRegExp = /^[А-Яа-яЁё`'.\-s]+$/;
export const rusRegExpErrorText = `Используйте только русские буквы`;

export const phoneRegExp = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;
export const phoneRegExpErrorText = `Неверный формат номера телефона. Должен состоять из 7-10 цифр, может включать в себя символы '-', '(', ')', '+7' или '8'`;

export const loginRegExp =
  /^(?:[a-zA-Z0-9_*\-*.*]+@[a-zA-Z0-9\-*]+\.*[A-Za-z.*\-*]*\.[A-Za-z]+|(?:8|\+7)[- ]?(?:\(?[0-9]{3}\)?[- ]?)?[0-9\- ]{7,10})$/;
export const loginRegExpErrorText = `Неверный логин. Должен быть в формате адреса электронной почты "example@email.com" или номера телефона, состоящего из 7-10 цифр, может включать в себя символы '-', '(', ')', '+7' или '8'`;

export const numberRegExp = /^\d+$/;
export const numberRegExpErrorText = `Используйте ццифры`;

export const getValidateErrors = (validateScheme: ZodObject<any, any>, values: object) => {
  const res = validateScheme.safeParse(values);
  if (!res.success) {
    const error = res.error as ZodError;
    const formErrors: FormErrors = {};
    error.errors.forEach((err: any) => {
      formErrors[err.path[0]] = err.message;
    });
    return formErrors;
  }
  return {};
};
