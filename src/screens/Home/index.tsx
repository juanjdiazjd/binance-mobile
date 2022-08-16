import * as React from 'react';
import {FlatList, ListRenderItem, StatusBar} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ContentView, Header, ListFeatureItem, WrapperView} from '@components';
import {strings} from './strings';
import {HomeFeatures} from './utils';
import {Feature} from 'types/ListItem';
import {RootStackParamList} from 'types/Navigation';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const renderItem: ListRenderItem<Feature> = ({item}) => (
    <ListFeatureItem
      item={item}
      onHandlePress={() => navigation.navigate(item.screenName)}
    />
  );

  return (
    <WrapperView>
      <ContentView>
        <StatusBar barStyle="light-content" />
        <Header
          title={strings.home.infoTitle}
          subtitle={strings.home.infoSubtitle}
        />
        {HomeFeatures.length > 0 && (
          <FlatList
            data={HomeFeatures.map(items => items).flat()}
            renderItem={renderItem}
          />
        )}
      </ContentView>
    </WrapperView>
  );
};

export default HomeScreen;
