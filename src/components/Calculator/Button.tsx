import React from 'react';
import {useContext} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Styles} from './MainStyles';

interface ButtonProps {
  onPress: () => void;
  title: string;
  isBlue?: boolean;
  isGray?: boolean;
}

export default function Button({title, onPress, isBlue, isGray}: ButtonProps) {
  return (
    <TouchableOpacity
      style={
        isBlue ? Styles.btnBlue : isGray ? Styles.btnDark : Styles.btnLight
      }
      onPress={onPress}>
      <Text
        style={isBlue || isGray ? Styles.smallTextLight : Styles.smallTextDark}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
