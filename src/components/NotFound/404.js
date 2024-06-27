import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Icon404 from '../../assets/svgs/Icon404';

function PageNotFound404() {
  return (
    <View style={styles.cnotainer}>
      <View style={{alignItems: 'center', display: 'flex', marginTop: '30%'}}>
        <Image source={require('../../assets/img/404.png')} />
        <Text style={styles.notFound}>
          {locales('titles.404PageNotFound')}</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#0B1596',
          paddingVertical: 16,
          paddingHorizontal: 50,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 8,
          flexDirection: 'row',
          margin: 24,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
          }}>
            {locales('titles.home')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cnotainer: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  notFound: {
    textAlign: 'center',
    color: '#01020D',
    fontWeight: '500',
    fontSize: 14,
    marginTop: 50,
  },
});
export default PageNotFound404;
