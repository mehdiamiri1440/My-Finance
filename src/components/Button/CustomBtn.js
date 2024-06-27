import React from 'react';
import {Pressable, ActivityIndicator, StyleSheet, Text} from 'react-native';

function CustomBtn({onPress, btnStyle, loadingDisplay, title, style ,children}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        style,
        styles.btnStyle,
        {
          backgroundColor: btnStyle ? '#0B1596' : 'rgba(1, 2, 13, 0.09)',
        },
      ]}>
        {children}
      <ActivityIndicator
        size="small"
        style={{display: loadingDisplay ? 'flex' : 'none'}}
        color="#fff"
      />
      <Text
        style={[
          styles.textStyle,
          {
            display: loadingDisplay ? 'none' : 'flex',
            color: btnStyle ? '#fff' : '#9B9B9B',
          },
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomBtn;
