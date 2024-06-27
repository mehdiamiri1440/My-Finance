import React, {useEffect, useState} from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {useContext} from 'react';
import {contextsStore} from '../../contexts';

function CountDown({onPress}) {
  const {setSendCodeStyle} = useContext(contextsStore);
  const [count, setCount] = useState(60);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const timer = () => {
      if (count > 0) {
        setCount(count - 1);
      }
      if (count === 0) {
        setDisplay(true);
        setSendCodeStyle(true);
      }
    };
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [count]);
  return (
    <>
      <TouchableWithoutFeedback>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            alignSelf: 'center',
            color: '#01020D',
            display: display ? 'none' : 'flex',
          }}>
          ({('0' + Math.floor(count / 60)).slice(-2)}:
          {('0' + Math.floor(count % 60)).slice(-2)})
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          onPress;
          setCount(60);
          setDisplay(false);
          setSendCodeStyle(false);
        }}>
        <Text
          style={{
            color: '#0B1596',
            fontSize: 14,
            fontWeight: '600',
            alignSelf: 'center',
            display: display ? 'flex' : 'none',
          }}>
          {locales('titles.sendCodeAgain')}
        </Text>
      </TouchableWithoutFeedback>
    </>
  );
}

export default CountDown;
