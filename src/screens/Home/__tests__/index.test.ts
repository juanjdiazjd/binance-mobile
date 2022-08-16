import {mountToSatoshi} from '../helpers';

test('Should return a mount in satoshi', () => {
  expect(mountToSatoshi(25000)).toBe('0.00025000');
});
