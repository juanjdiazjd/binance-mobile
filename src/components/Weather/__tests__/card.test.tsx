import React from 'react';
import {render} from '@testing-library/react-native';
import {Location, Weather} from '../../../types/Home/weather';
import {Card} from '../Card';

it('Should card component', () => {
  render(
    <Card
      weather={{} as Weather}
      location={{} as Location}
      isFetching={true}
    />,
  );
});
