import React from 'react';
import renderer from 'react-test-renderer';
import {Status, Transaction} from '../../../types/Home/transaction';
import ListItem from '../ListItem';

jest.mock('swr');
jest.mock('react-native-paper');
jest.mock('react-native-localization');
jest.resetAllMocks();
jest.useFakeTimers();

const MOCK_DATA_LIST_ITEM: Transaction = {
  id: '1ac74e7e-e65f-44a9-be15-9015019e3e2f',
  date: '2022-07-11T16:58:24.821970868Z',
  mount: '0.0002',
  address: '0xqeqweqeq',
  status: Status.completed,
};

const ListItemComponent = (): JSX.Element => (
  <ListItem item={MOCK_DATA_LIST_ITEM} onHandlePress={jest.fn()} />
);

it('Should listi tem component', () => {
  const tree = renderer.create(ListItemComponent()).toJSON();
  expect(tree).toMatchSnapshot();
});
