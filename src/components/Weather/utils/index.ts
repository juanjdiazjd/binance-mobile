import dayjs from 'dayjs';

export const removeDecimals = (temp: number) => Math.trunc(temp);

export const formatDate = (date: string) => dayjs(date).format('dddd')