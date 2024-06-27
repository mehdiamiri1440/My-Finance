import React from 'react';
import {StyleSheet, Pressable, View, Text} from 'react-native';
import ArrowRightBtn from '../../assets/svgs/ArrowRightBtn';

function MenuComponent({onPress, name, children, childern2}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.view}>
        <View style={{flexDirection: 'row'}}>
          {children}
          <Text style={styles.menuText}>{name}</Text>
        </View>
        <ArrowRightBtn/>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuText: {
    color: '#01020D',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
});
export default MenuComponent;
