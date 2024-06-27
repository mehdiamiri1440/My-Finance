import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import CloseIcon from '../../assets/svgs/CloseIcon';
import BankfilterBtn from '../Buttons/BankfilterBtn';
import BankRdadioButton from '../RadioButton/BankRadioButton';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

const bottomFilterBtn = [
  {label: locales('titles.newest'), value: 0},
  {label: locales('titles.latest'), value: 1},
  {label: locales('titles.alphabet'), value: 2},
  {label: locales('titles.lowerPrice'), value: 3},
  {label: locales('titles.higherPrice'), value: 4},
];

const topFilterBtnData = [
  {
    lable: locales('titles.all'),
    value: 0,
  },
  {
    lable: locales('titles.debt'),
    value: 1,
  },
  {
    lable: locales('titles.demand'),
    value: 2,
  },
  {
    lable: locales('titles.settlement'),
    value: 3,
  },
];

function BankListFilter({refRBSheet}) {
  const [topBtn, setTopBtn] = useState(null || 0);
  const [color, setColor] = useState(true);
  const [userOption, setUserOption] = useState(null || 0);
  const [value, setValue] = useState(0);

  const renderTopFilterBtn = ({item}) => (
    <TouchableWithoutFeedback
      key={item.value}
      onPress={() => {
        setTopBtn(item.value);
      }}
      style={{marginRight: 8}}>
      <View
        style={[
          styles.btnStyle,
          {
            backgroundColor:
              item.value === topBtn ? '#0B1596' : 'rgba(11, 21, 150, 0.09)',
          },
        ]}>
        <Text
          style={{
            color: item.value === topBtn ? '#fff' : '#0B1596',
            fontSize: 16,
            fontWeight: '600',
          }}>
          {item.lable}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const renderBottomFilterBtn = ({item, index}) => (
    <RadioButton wrapStyle={{}} labelHorizontal={true} key={index}>
      <TouchableWithoutFeedback
        onPress={value => {
          setValue(index);
          setUserOption(item.value);
        }}>
        <View
          key={index}
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 6,
            alignItems: 'center',
            paddingHorizontal: 8,
            marginTop: 4,
          }}>
          <RadioButtonInput
            animation={true}
            obj={item}
            index={index}
            isSelected={item.value === userOption}
            onPress={value => {
              setValue(value);
              setUserOption(item.value);
            }}
            borderWidth={1}
            buttonInnerColor={'#0B1596'}
            buttonOuterColor={value === index ? '#0B1596' : '#C2C7E7'}
            buttonSize={10}
            buttonOuterSize={20}
            buttonStyle={{}}
            buttonWrapStyle={{marginTop: 16}}
          />
          <RadioButtonLabel
            animation={true}
            obj={item}
            index={index}
            labelHorizontal={true}
            onPress={value => {
              setValue(value);
              setUserOption(item.value);
            }}
            labelStyle={{
              fontSize: 14,
              fontWeight: '600',
              color: '#17191C',
              marginTop: 16,
            }}
            labelWrapStyle={{}}
          />
        </View>
      </TouchableWithoutFeedback>
    </RadioButton>
  );
  return (
    <>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#01020D',
              padding: 24,
            }}>
            Filter{' '}
          </Text>
          <CloseIcon
            style={{marginRight: 24}}
            onPress={() => {
              refRBSheet.current?.close();
            }}
            fill="#9B9B9B"
          />
        </View>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#D9D9D9',
          }}></View>

        <View style={{padding: 24}}>
          <FlatList
            contentContainerStyle={{flexDirection: 'row'}}
            data={topFilterBtnData}
            renderItem={renderTopFilterBtn}
          />

          <View style={{marginTop: 16}}>
            <RadioForm animation={true}>
              <FlatList
                data={bottomFilterBtn}
                renderItem={renderBottomFilterBtn}
              />
            </RadioForm>
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
          {locales('titles.submit')}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#152F8C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    borderRadius: 23,
    marginRight: 8,
    paddingHorizontal: 10,
  },
});
export default BankListFilter;
