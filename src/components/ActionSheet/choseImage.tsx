import React, {useContext, useRef} from 'react';
import {
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import ArrowLeft from '../../assets/svgs/ArrowLeft';
import ArrowRight from './../../assets/svgs/ArrowRight';
import {StyleSheet, PermissionsAndroid} from 'react-native';
import FilterBtn from '../Buttons/filterBtn';
import RadioButton from '../RadioButton';
import RadioButtonComponent from './../RadioButton/index';
import CloseIcon from '../../assets/svgs/CloseIcon';
import CameraIcon from '../../assets/svgs/CameraIcon';
import ArrowRightIcon from '../../assets/svgs/ArrowRightIcon';
import ArrowRightBtn from '../../assets/svgs/ArrowRightBtn';
import GalleryIcon from '../../assets/svgs/GalleryIcon';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {contextsStore} from '../../contexts';

function ChooseImage({sheetId, payload}: SheetProps<{data: string}>) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {setImageSrc} = useContext(contextsStore);
  const navigation = useNavigation();
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
    actionSheetRef.current?.hide();
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
        }).then(image => {
          setImageSrc(image?.path);
        });
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet
      closeAnimationConfig={{bounciness: 0.1}}
      id={sheetId}
      ref={actionSheetRef}
      containerStyle={{
        height: height / 4.25,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
      indicatorStyle={{
        display: 'none',
      }}
      gestureEnabled={true}>
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
              actionSheetRef.current?.hide();
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
    </ActionSheet>
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
