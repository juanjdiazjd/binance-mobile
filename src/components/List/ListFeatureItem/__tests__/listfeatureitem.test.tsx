import theme from 'core/theme';
import React from 'react';
import renderer from 'react-test-renderer';
import {Feature, ItemsHomeStackList} from 'types';
import ListFeatureItem from '../ListFeatureItem';

jest.mock('swr');
jest.mock('react-native-localization', () => {
  return {
    getLocales: jest.fn(),
  };
});

jest.resetAllMocks();
jest.useFakeTimers();

const MOCK_DATA_LIST_FEATURE_ITEM: Feature = {
  id: 1,
  image: 'https://i.imgur.com/a6qfBLb.png',
  title: 'Exchange',
  screenName: ItemsHomeStackList.Exchange,
  color: theme.colors.primary,
  backgroundColor: theme.colors.primaryDark,
};

const ListFeatureItemComponent = (): JSX.Element => (
  <ListFeatureItem
    item={MOCK_DATA_LIST_FEATURE_ITEM}
    onHandlePress={jest.fn()}
  />
);

it('Should list feature item component', () => {
  const tree = renderer.create(ListFeatureItemComponent()).toJSON();
  expect(tree).toMatchSnapshot();
});
