import React, {useContext, useRef} from 'react';
import {View, Text, TouchableWithoutFeedback, Dimensions} from 'react-native';
import {StyleSheet, PermissionsAndroid} from 'react-native';
import CloseIcon from '../../assets/svgs/CloseIcon';
import CameraIcon from '../../assets/svgs/CameraIcon';
import ArrowRightBtn from '../../assets/svgs/ArrowRightBtn';
import GalleryIcon from '../../assets/svgs/GalleryIcon';
import ImagePicker from 'react-native-image-crop-picker';
import {contextsStore} from '../../contexts';

function ChooseImage({refRBSheet}) {
  const {setImageSrc} = useContext(contextsStore);
  const {width, height} = Dimensions.get('window');

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Read Contacts App Permission',
          message: 'App needs access to your CONTACTS ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openPicker({
          cropping: true,
        }).then(image => {
          setImageSrc(image?.path);
        });
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Cool Read Contacts App Permission',
              message: 'App needs access to your CONTACTS ',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            ImagePicker.openPicker({
              cropping: true,
            }).then(image => {
              setImageSrc(image?.path);
            });
          } else {
          }
        } catch (err) {
          console.warn(err);
        }
      }
    } catch (err) {
      console.warn(err);
    }
    refRBSheet.current.close();
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Read Contacts App Permission',
          message: 'App needs access to your CAMERA ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openCamera({
          cropping: true,
        }).then(image => {});
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
    refRBSheet.current.close();
  };

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#01020D',
            padding: 24,
          }}>
          Upload an image{' '}
        </Text>
        <CloseIcon
          style={{marginRight: 24}}
          onPress={() => {
            refRBSheet.current.close();
          }}
          fill="#9B9B9B"
        />
      </View>

      <View
        style={{height: 1, width: '100%', backgroundColor: '#D9D9D9'}}></View>

      <View style={{padding: 24}}>
        <TouchableWithoutFeedback onPress={requestCameraPermission}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CameraIcon />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#01020D',
                  marginLeft: 8,
                }}>
                Camera
              </Text>
            </View>
            <ArrowRightBtn style={{marginTop: 4}} />
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={requestGalleryPermission}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 24,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <GalleryIcon />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#01020D',
                  marginLeft: 8,
                }}>
                Gallery
              </Text>
            </View>
            <ArrowRightBtn style={{marginTop: 4}} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    height: '15%',
    backgroundColor: '#EEEFF7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ChooseImage;
