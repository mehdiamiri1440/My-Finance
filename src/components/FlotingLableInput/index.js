import React, {useContext, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TextInput, View} from 'react-native';
import {contextsStore} from '../../contexts';

function InputFlotingLable() {
  const {customerPhone, setCustomerPhone} = useContext(contextsStore);
  const [style, setStyle] = useState(false);

  const moveText = useRef(new Animated.Value(0)).current;

  const moveTextIn = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const moveTextOut = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveTextTranslate = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const onFocusHandler = () => {
    moveTextOut();
    setStyle(true);
  };

  const onBlurHandler = () => {
    if (customerPhone.length === 0) {
      moveTextIn();
      setStyle(false);
    }
  };

  useEffect(() => {
    if (customerPhone.length !== 0) {
      onFocusHandler();
    }
  }, [customerPhone]);

  return (
    <>
      <View
        style={[
          styles.textInput,
          {
            borderColor: '#929294',
          },
        ]}>
        <Animated.View
          style={{
            transform: [{translateY: moveTextTranslate}],
          }}>
          <Text
            style={[
              styles.phoneNumber,
              {
                color: style ? '#152F8C' : '#656565',
                fontSize: style ? 10 : 14,
                width: style ? 150 : 200,
              },
            ]}>
            Customer Number ( Optional)
          </Text>
        </Animated.View>
        <TextInput
          editable={true}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          blurOnSubmit
          style={{
            paddingHorizontal: 8,
            color: '#212121',
            height: '100%',
            width: '100%',
          }}
          keyboardType="default"
          value={customerPhone}
          onChangeText={setCustomerPhone}
          inputMode="text"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 16,
    height: 60,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#334C84',
    position: 'absolute',
    backgroundColor: '#ffffff',
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 8,
    bottom: -8,
  },
  animatedStyle: {
    top: 5,
    left: 15,
    position: 'absolute',
    borderRadius: 90,
    zIndex: 10000,
  },
});
export default InputFlotingLable;
