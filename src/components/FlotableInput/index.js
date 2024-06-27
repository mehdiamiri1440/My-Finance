import React, {useRef, useState, useEffect, useContext} from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import ContactIcon from '../../assets/svgs/ContactIcon';
import {contextsStore} from '../../contexts';

function FlotableInput({
  inputPlaceholder,
  value,
  setValue,
  children,
  editable,
  onPress,
  keyboardType,
  borderColor,
  inputMode,
  children2,
  autoFocus,
  borderStyle,
  multiline,
  height,
  titleHeight,
  numberOfLines,
  inputStyle = {},
  ref
}) {
  const {country, setCountry, setSvgFill} = useContext(contextsStore);
  const [style, setStyle] = useState(false);
  const [focus, setFocus] = useState(false);

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

  useEffect(() => {
    if (value) {
      moveTextOut();
      setStyle(true);
    } else {
    }
  }, [value]);

  const moveTextTranslate = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, titleHeight ? titleHeight : -25],
  });

  const onFocusHandler = () => {
    setSvgFill(false);
    setCountry(true);
    moveTextOut();
    setStyle(true);
    setFocus(true);
  };

  const onBlurHandler = () => {
    if (value?.length === 0) {
      setCountry(false);
      setSvgFill(true);

      moveTextIn();
      setStyle(false);
      setFocus(false);
    }
  };

  useEffect(() => {
    if (children2) {
      onFocusHandler();
    } else {
    }
  }, [children]);

  return (
    <TouchableWithoutFeedback style={{height}} onPress={onPress}>
      <View
        style={[
          styles.textInput,
          {
            height,
            borderColor: borderColor
              ? borderColor
              : style
              ? '#0B1596'
              : '#D9D9D9',
            borderStyle: borderStyle,
            ...inputStyle,
          },
        ]}>
        <Animated.View
          style={{
            transform: [{translateY: moveTextTranslate}],
          }}>
          <Text
            style={[
              styles.text,
              {
                color: borderColor
                  ? borderColor
                  : style
                  ? '#152F8C'
                  : '#9B9B9B',
                fontSize: style ? 13 : 14,
              },
            ]}>
            {inputPlaceholder}
          </Text>
        </Animated.View>
        {children2}
        <TextInput
        ref={ref}
          numberOfLines={numberOfLines}
          focusable={true}
          editable={editable}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          blurOnSubmit
          style={{
            paddingHorizontal: 16,
            height: '100%',
            width: '80%',
            color: '#01020D',
            fontSize: 14,
            fontWeight: 'bold',
            flex: 1,
          }}
          keyboardType={keyboardType}
          value={value}
          inputMode={inputMode}
          onChangeText={setValue}
          autoFocus={autoFocus}
          multiline={multiline}
        />
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  textInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: ' #D9D9D9',
    marginTop: 30,
    width: '100%',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9B9B9B',
    position: 'absolute',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 16,
    bottom: -8,
    paddingHorizontal: 2,
  },
});

export default FlotableInput;
