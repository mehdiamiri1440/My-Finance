import React, {useState} from 'react';
import {TouchableWithoutFeedback, Text, StyleSheet, View} from 'react-native';

function BankfilterBtn() {
  const Btns = [
    {
      lable: 'All',
      value: 0,
    },
    {
      lable: 'Deposit',
      value: 1,
    },
    {
      lable: 'Withdrawal',
      value: 2,
    },
  ];

  const [userOption, setUserOption] = useState(null || 0);
  const [color, setColor] = useState(true);
  return (
    <>
      {Btns.map(index => (
        <TouchableWithoutFeedback
          key={index.value}
          onPress={() => {
            setUserOption(index.value);
          }}
          style={{marginRight: 8}}>
          <View
            style={[
              styles.btnStyle,
              {
                backgroundColor:
                  index.value === userOption
                    ? '#0B1596'
                    : 'rgba(11, 21, 150, 0.09)',
              },
            ]}>
            <Text
              style={{
                color: index.value === userOption ? '#fff' : '#0B1596',
                fontSize: 16,
                fontWeight: '600',
              }}>
              {index.lable}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
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
export default BankfilterBtn;
