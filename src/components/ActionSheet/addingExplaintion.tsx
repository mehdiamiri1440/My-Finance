import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
  BackHandler,
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import ArrowLeft from '../../assets/svgs/ArrowLeft';
import ArrowRight from '../../assets/svgs/ArrowRight';
import {StyleSheet} from 'react-native';
import FilterBtn from '../Buttons/filterBtn';
import RadioButton from '../RadioButton';
import RadioButtonComponent from '../RadioButton/index';
import {contextsStore} from '../../contexts';
import {useContext} from 'react';

function AddingExplaintion({
  sheetId,
  payload,
}: SheetProps<{data: string; value: string}>) {
  const {setDesData, desData} = useContext(contextsStore);
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [focus, setFocus] = useState(false);
  const [style, setStyle] = useState(false);
  const [height, setHeight] = useState(true);
  const [explaiontion, setExplaiontion] = useState('');

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
    outputRange: [0, -25],
  });

  useEffect(() => {
    if (explaiontion.length !== 0) {
      moveTextOut();
      setStyle(true);
    } else {
    }
  }, [explaiontion]);

  const onFocusHandler = () => {
    moveTextOut();
    setStyle(true);
    setFocus(true);
    setHeight(false);
  };

  const onBlurHandler = () => {
    setHeight(true);
    if (explaiontion.length === 0) {
      moveTextIn();
      setStyle(false);
      setFocus(false);
    }
  };

  function handleBackButtonClick() {
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <ActionSheet
      closeAnimationConfig={{bounciness: 0.1}}
      id={sheetId}
      ref={actionSheetRef}
      containerStyle={{
        height: height ? '25%' : '40%',
      }}
      indicatorStyle={{
        display: 'none',
      }}
      gestureEnabled={true}>
      <View>
        <View style={styles.header}>
          <Text style={[styles.text, {color: '#464C5C'}]}>
            {payload?.value}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setDesData(explaiontion);
                actionSheetRef.current?.hide();
              }}>
              <Text style={[styles.text, {color: '#2F49AA', fontSize: 18}]}>
                Confirm
              </Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => {
                actionSheetRef.current?.hide();
              }}>
              <Text
                style={[
                  styles.text,
                  {color: '#868C9C', fontSize: 18, marginLeft: 16},
                ]}>
                Cancel
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', padding: 16}}>
          <View
            style={[
              styles.textInput,
              {
                borderColor: focus ? '#2F49AA' : '#929294',
                borderWidth: focus ? 3 : 2,
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
                    color: style ? '#656565' : '#656565',
                    fontSize: style ? 11 : 14,
                    width: style ? 100 : 120,
                  },
                ]}>
                {payload?.data}
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
              value={explaiontion}
              inputMode="text"
              onChangeText={setExplaiontion}
            />
          </View>
        </View>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    height: '40%',
    backgroundColor: '#EEEFF7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 16,
    flex: 1,
    height: 90,
  },
  phoneNumber: {
    fontSize: 12,
    color: '#334C84',
    position: 'absolute',
    backgroundColor: '#ffffff',
    width: 110,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 8,
    bottom: 15,
  },
});

export default AddingExplaintion;
