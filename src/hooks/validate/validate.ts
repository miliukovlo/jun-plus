import { validateLength } from './varians/validateLength';
import { validateMaxValue } from './varians/validateMaxValue';

export const validateTitle = (str: string) => {
  return validateLength(str, 50, 2);
};

export const validateDescription = (str: string) => {
  return validateLength(str, 300, 2);
};

export const validateMinute = (value: number) => {
  return validateMaxValue(value, 59);
};

export const validate = {
  title: validateTitle,
  description: validateDescription,
  minute: validateMinute,
};
