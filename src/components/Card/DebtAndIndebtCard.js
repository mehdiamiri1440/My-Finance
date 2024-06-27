import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import IdeaIcon from '../../assets/svgs/IdeaIcon';
import {contextsStore} from '../../contexts/index';
import database from '../../DB/index.native';

function DebtAndIndebtCard({fill, r_h, d_i, viewColor, onPress}) {
  const {customerName, boxDisplay, setBoxDisplay} = useContext(contextsStore);

  return (
    <>
      <View
        style={[
          styles.container,
          {backgroundColor: viewColor, display: boxDisplay ? 'flex' : 'none'},
        ]}>
        <IdeaIcon fill={fill} style={{marginTop: 8}} />
        <Text style={styles.text}>
          If you {r_h} goods or services from{' '}
          <Text style={{fontWeight: 'bold'}}>{customerName}</Text> choose this
          option. the amount will be add to your{' '}
          <Text style={{color: fill}}>{d_i}</Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.btn, {backgroundColor: fill}]}>
        <Text style={{color: '#fafafa', fontWeight: 'bold'}}>{r_h}</Text>
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 175,
    height: 110,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 8,
  },
  text: {
    color: '#212121',
    textAlign: 'center',
    marginBottom: 4,
    fontSize: 12,
  },
  btn: {
    width: 175,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
export default DebtAndIndebtCard;
