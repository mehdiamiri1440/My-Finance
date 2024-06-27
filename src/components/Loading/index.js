import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import SplashIcon from '../../assets/svgs/SplashIcon';
import CalIcon from '../../assets/svgs/CalIcon';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

function Loading() {
  return (
    <>
      <ImageBackground
        resizeMode="cover"
        style={{width: '100%', height: '100%', backgroundColor: '#0B1596'}}
        source={require('./../../assets/img/Mask-group.png')}>
        <View style={styles.container}>
          <CalIcon />
          <Text style={styles.headerText}>My Budget</Text>
          <Text style={styles.subHeaderText}>Accounting Application</Text>
          <AnimatedEllipsis
            numberOfDots={9}
            style={{color: '#fff', fontSize: 34, marginTop: -16}}
            animationDelay={100}
          />
          {/* <View style={{flexDirection: 'row', gap: 3}}>
            <SplashIcon fill={'white'} />
            <SplashIcon fill={'rgba(255, 255, 255, 0.7)'} />
            <SplashIcon fill={'rgba(255, 255, 255, 0.4)'} />
            <SplashIcon fill={'rgba(255, 255, 255, 0.15)'} />
          </View> */}
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 60,
    height: '100%',
    justifyContent: 'flex-end',
  },
  headerText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 24,
    marginTop: 24,
  },
  subHeaderText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 14,
    marginTop: 8,
  },
});

export default Loading;
