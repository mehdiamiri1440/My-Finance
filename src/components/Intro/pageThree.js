import React from 'react';
import {Pressable} from 'react-native';
import {Image, ImageBackground} from 'react-native';
import {StyleSheet, View, Text} from 'react-native';
import SmallCycleIcon from '../../assets/svgs/SmallCycleIcon';
import LargeCycleIcon from '../../assets/svgs/LargeCycleIcon';

function PageThree({navigation}) {
  return (
    <>
      <ImageBackground
        resizeMode="contain"
        style={{width: '100%', height: '100%', backgroundColor: '#fff'}}
        source={require('./../../assets/img/Mask-group.png')}>
        <View
          style={{
            height: '100%',
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <View style={{marginTop: 112, padding: 24}}>
            <Image
              style={{alignSelf: 'center', marginBottom: 70}}
              source={require('../../assets/img/PageThreeIcon.png')}
            />

            <Text style={styles.header}>{locales('titles.dataRecovery')}</Text>
            <Text style={styles.exp}>
              {locales(
                'titles.YouNeedYourPhoneNumberToBeAbleToRetrieveYourInformationEnteringTheNumberProtectsYourInformation',
              )}
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Pressable
              style={{padding: 24}}
              onPress={() => {
                navigation.replace('Auth');
              }}>
              <Text style={{color: '#9B9B9B', fontWeight: '600', fontSize: 16}}>
                {locales('titles.skip')}
              </Text>
            </Pressable>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <SmallCycleIcon />
              <SmallCycleIcon />
              <LargeCycleIcon />
            </View>
            <Pressable
              style={{padding: 24}}
              onPress={() => {
                navigation.replace('Auth');
              }}>
              <Text style={{color: '#0B1596', fontWeight: '600', fontSize: 16}}>
                {locales('titles.finish')}
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    color: '#01020D',
    fontWeight: '700',
    textAlign: 'center',
  },
  welcome: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
    color: '#9B9B9B',
    fontWeight: '600',
  },
  exp: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: '#9B9B9B',
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 16,
  },
});
export default PageThree;
