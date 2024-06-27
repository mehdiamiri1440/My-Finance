import React, {useRef} from 'react';
import {View, FlatList, Text, ScrollView, TouchableOpacity} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import ArrowLeft from '../../assets/svgs/ArrowLeft';
import ArrowRight from './../../assets/svgs/ArrowRight';
import {StyleSheet} from 'react-native';
import FilterBtn from '../Buttons/filterBtn';
import RadioButton from '../RadioButton';
import RadioButtonComponent from './../RadioButton/index';

function Filter({sheetId, payload}: SheetProps<{data: string}>) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  return (
    <ActionSheet
      closeAnimationConfig={{bounciness: 0.1}}
      id={sheetId}
      ref={actionSheetRef}
      containerStyle={{
        height: '61%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
      indicatorStyle={{
        display: 'none',
      }}
      gestureEnabled={true}>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#01020D',
            padding: 24,
          }}>
          Filter{' '}
        </Text>
        <View
          style={{height: 1, width: '100%', backgroundColor: '#D9D9D9'}}></View>

        <View style={{padding: 24}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <FilterBtn />
          </View>

          <View style={{marginTop: 16}}>
            <RadioButtonComponent />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginHorizontal: 24,
          backgroundColor: '#0B1596',
          padding: 16,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 8,
          flexDirection: 'row',
        }}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
          Submit
        </Text>
      </TouchableOpacity>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    height: '15%',
    backgroundColor: '#EEEFF7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Filter;
