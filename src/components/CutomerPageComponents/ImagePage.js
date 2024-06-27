import React, {useContext} from 'react';
import {View, Image, Text} from 'react-native';
import CloseIcon from '../../assets/svgs/CloseIcon';
import DeleteImageIcon from '../../assets/svgs/DeleteImageIcon';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {contextsStore} from '../../contexts';
import {useNavigationState} from '@react-navigation/native';

function ImagePage({navigation, route}) {
  const {imageSrc} = route.params;
  const {setImageSrc} = useContext(contextsStore);
  return (
    <>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: ' rgba(1, 2, 13, 0.95)',
          justifyContent: 'space-between',
          paddingBottom: 30,
        }}>
        <CloseIcon
          fill="#FFF"
          onPress={() => {
            navigation.goBack();
          }}
          style={{marginTop: 24, alignSelf: 'flex-end', marginRight: 24}}
        />

        <Image
          style={{
            display: 'flex',
            width: '100%',
            height: '80%',
            resizeMode: 'contain',
          }}
          source={{
            uri: imageSrc,
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('DeleteImageModal', {
              customerID: route?.params.customerID,
            });
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <DeleteImageIcon fill="#fff" />
            <Text
              style={{
                fontWeight: '500',
                fontSize: 14,
                color: '#fff',
                marginLeft: 8,
              }}>
              {locales('titles.delete')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

export default ImagePage;
