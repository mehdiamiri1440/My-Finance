import React, {useState} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

function BankRdadioButton() {
  const [userOption, setUserOption] = useState(null || 0);

  const [value, setValue] = useState(0);

  const items = [
    {label: 'Cash', value: 0},
    {label: 'Credit Card', value: 1},
    {label: 'ATM', value: 2},
  ];

  return (
    <View>
      {/* <RadioForm
      wrapStyle={{backgroundColor:'red'}}
        radio_props={items}
        initial={value}
        onPress={value => {
          setValue(value);
        }}
        buttonColor="#E7E9F5"
        selectedButtonColor="#E7E9F5"
        labelColor="#EBEFFB"
        selectedLableColor="#EBEFFB"
      /> */}

      <RadioForm animation={true}>
        {items.map((obj, index) => (
          <RadioButton wrapStyle={{}} labelHorizontal={true} key={index}>
            <TouchableWithoutFeedback
              onPress={() => {
                setUserOption(obj.value);
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
                  obj={obj}
                  index={index}
                  isSelected={obj.value === userOption}
                  onPress={value => {
                    setValue(value);
                    setUserOption(obj.value);
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
                  obj={obj}
                  index={index}
                  labelHorizontal={true}
                  onPress={value => {
                    setValue(value);
                    setUserOption(obj.value);
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
        ))}
      </RadioForm>
    </View>
  );
}

export default BankRdadioButton;
