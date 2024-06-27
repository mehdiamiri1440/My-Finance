import React from 'react';
import {Pressable} from 'react-native';
import {Image, ImageBackground} from 'react-native';
import {StyleSheet, View, Text} from 'react-native';
import IntroPageOneIcon from '../../assets/svgs/IntroPageOneIcon';
import LargeCycleIcon from '../../assets/svgs/LargeCycleIcon';
import SmallCycleIcon from '../../assets/svgs/SmallCycleIcon';

function PageOne({navigation}) {
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
          <View style={{marginTop: 112}}>
            <IntroPageOneIcon style={{alignSelf: 'center'}} />
            <View>
              <Text style={styles.header}>
                {locales('titles.welcometotheMyBudget')}
              </Text>
              <Text style={styles.exp}>
                {locales(
                  'titles.itsTimeToPullOverYourPenAndPaperArrangeTheBookAccountAndTakeToTheMyBudget',
                )}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Pressable
              style={{
                padding: 24,
              }}
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
              <LargeCycleIcon />
              <SmallCycleIcon />
              <SmallCycleIcon />
            </View>
            <Pressable
              style={{
                padding: 24,
              }}
              onPress={() => {
                navigation.navigate('pageTwo');
              }}>
              <Text style={{color: '#0B1596', fontWeight: '600', fontSize: 16}}>
                {locales('titles.next')}
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
    marginTop: 70,
  },
  welcome: {
    fontSize: 16,
    color: '#5A6070',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  exp: {
    width: '60%',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: '#9B9B9B',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 17,
  },
});
export default PageOne;
