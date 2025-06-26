import { IError } from '@/types';

export const validateMaxValue = (value: number, max: number): IError => {
  return {
    status: value <= max ? 'success' : 'fail',
    message: value >= max ? `Максимальное значение ${max}` : '',
  };
};
