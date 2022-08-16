import * as React from 'react';
import {
  FlatList,
  ListRenderItem,
  Platform,
  RefreshControl,
  StatusBar,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ContentView, Header, ListCryptoItem, WrapperView} from '@components';
import {strings} from './strings';
import {RootStackParamList} from 'types/Navigation';
import {CryptoItem} from 'types/ListCryptoItem';
import {useGenerateCryptoData} from 'core/hooks/use-generate-crypto-data';
import theme from 'core/theme';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import {renderContainerBottomSheet} from './utils';
import {TransactionType} from 'types';

const INDEX_PER_DEFAULT = -1;

const ContainerBottomSheet = styled(View)`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' ? 50 : 190}px;
  bottom: 50px;
`;

const ExchangeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Exchange'>) => {
  const {items, isValidating, mutate} = useGenerateCryptoData();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<CryptoItem>();

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['80%'], []);

  const handleSheetChange = useCallback((index: number) => {
    setDisabled(index === -1 ? false : true);
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleOnPress = (item: CryptoItem): void => {
    handleSnapPress(0);
    setItemSelected(item);
  };

  const renderItem: ListRenderItem<CryptoItem> = ({item}) => (
    <ListCryptoItem
      isValidating={isValidating}
      handleOnPress={handleOnPress}
      isDisabled={disabled}
      item={item}
    />
  );

  const onRefresh = () => {
    mutate();
  };

  const handleOnPressBuySell = (option: TransactionType) => {
    itemSelected &&
      navigation.navigate('Order', {item: itemSelected, option: option});
  };

  return (
    <WrapperView>
      <ContentView>
        <StatusBar barStyle="light-content" />
        <Header
          title={strings.buySell.infoTitle}
          subtitle={strings.buySell.infoSubtitle}
          buttonBack={true}
          onPressButtonBack={() => navigation.goBack()}
          disabledButtonBack={disabled}
        />
        {items.length > 0 && (
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            refreshControl={
              <RefreshControl
                tintColor={theme.colors.white}
                refreshing={isValidating}
                onRefresh={onRefresh}
                enabled={!!disabled}
              />
            }
          />
        )}
        <ContainerBottomSheet>
          <BottomSheet
            ref={sheetRef}
            index={INDEX_PER_DEFAULT}
            backgroundStyle={{
              backgroundColor: theme.colors.charcoalGray,
            }}
            handleIndicatorStyle={{
              backgroundColor: theme.colors.white,
            }}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onChange={handleSheetChange}>
            <BottomSheetView>
              {itemSelected &&
                renderContainerBottomSheet(itemSelected, handleOnPressBuySell)}
            </BottomSheetView>
          </BottomSheet>
        </ContainerBottomSheet>
      </ContentView>
    </WrapperView>
  );
};

export default ExchangeScreen;
