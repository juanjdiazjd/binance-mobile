import {parseDate} from '../utils';

test('Should date in format DD/MM/YYYY hh:mm:ss', () => {
  expect(parseDate('2022-07-13T03:18:55.81898025Z', true)).toBe(
    '13/07/2022 12:18:55',
  );
});

test('Should  date in format DD/MM/YYYY', () => {
  expect(parseDate('2022-07-13T03:13:25.197589633Z', false)).toBe('13/07/2022');
});
