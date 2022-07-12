import { formatDate, removeDecimals } from "../utils";

  test('Should number without decimals, example: 13.34234 output 13', () => {
    expect(removeDecimals(13.34234)).toBe(13);
  });

  test('Should date format dddd', () => {
    expect(formatDate('2018/12/12')).toBe('Wednesday');
  });