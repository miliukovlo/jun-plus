import { IError } from '@/types';

export const validateLength = (str: string, max: number, min: number): IError => {
  return {
    status: str.length <= max && str.length >= min ? 'success' : 'fail',
    message:
      str.length > max
        ? `Максимальное количество символов ${max}`
        : str.length < min
          ? `Минимальное количество символов ${min}`
          : '',
  };
};
