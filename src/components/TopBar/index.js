import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const TopBar = ({leftIcon, text, rightIcon, backgroundColor, onPress}) => {
  return (
    <TouchableOpacity disabled={true}>
      <View style={[styles.container, {backgroundColor}]}>
        <View style={styles.leftContainer}>
          <TouchableOpacity style={styles.pressableContainer} onPress={onPress}>
            {leftIcon}
          </TouchableOpacity>
          <Text style={styles.text}>{text}</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.pressableContainer}>{rightIcon}</View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pressableContainer: {
    padding: 16,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 20,
  },
});

export default TopBar;
