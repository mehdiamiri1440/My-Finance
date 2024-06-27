import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import BackIcon from '../../assets/svgs/BackIcon';
import {StyleSheet, Image, FlatList, Modal} from 'react-native';
import CalenderIcon from '../../assets/svgs/CalenderIcon';
import ClockIcon from '../../assets/svgs/ClockIcon';
import database from '../../DB/index.native';
import EuroIcon from './../../assets/svgs/EuroIcon';
import CalculatorIcon from './../../assets/svgs/CalculatorIcon';
import ImageIcon from './../../assets/svgs/ImageIcon';
import ViewIcon from './../../assets/svgs/ViewIcon';
import DeleteImageIcon from './../../assets/svgs/DeleteImageIcon';
import DateTimePicker from '@react-native-community/datetimepicker';
import {contextsStore} from '../../contexts';
import FlotableInput from '../../components/FlotableInput';
import {useNavigation} from '@react-navigation/native';
import DropDownIcon from '../../assets/svgs/DropDownIcon';
import NotifPageIcon from '../../assets/svgs/NotifPageIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import ChooseImage from '../../components/SheetManager/ChooseImage';
import Calculator from '../../components/SheetManager/Calculator';
import ArrowRightBtn from '../../assets/svgs/ArrowRightBtn';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CloseIcon from '../../assets/svgs/CloseIcon';
import CameraIcon from '../../assets/svgs/CameraIcon';
import GalleryIcon from '../../assets/svgs/GalleryIcon';
import moment from 'moment';
import {permissions} from '../../utils';
import ImageCropPicker from 'react-native-image-crop-picker';
import ErrorIcon from '../../assets/svgs/ErrorIcon';

function DepositPage({navigation, route}) {
  const {
    firstNumber,
    setFirstNumber,
    secondNumber,
    operation,
    desData,
    setDesData,
    result,
    setResult,
    expression,
    setExpression,
    imageSrc,
    setImageSrc,
    setTabBarBottom,
  } = useContext(contextsStore);
  const {addListener} = useNavigation();
  const [calenderDisplay, setCalenderDisplay] = useState(false);
  const [date, setDate] = useState(moment().unix());
  const [dateDisplay, setDateDisplay] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(moment().unix());
  const [timeDisplay, setTimeDisplay] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [depositeType, setDepositeType] = useState('');
  const [showUnitList, setShowUnitList] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [euCal, setEuCal] = useState(false);
  const [description, setDescription] = useState('');
  const [calendarType, setCalendarType] = useState('date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState({});
  const [imageModalVisibility, setImageModalVisibility] = useState(false);
  const [deleteimageModalVisibility, setDeleteImageModalVisibility] =
    useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorDisplay2, setErrorDisplay2] = useState(false);
  const [bankAccountDetails, setBankAccountDetails] = useState({});

  const {bankAccountId, isDeposit, totalTransactionAmount, currenciesList} =
    route.params;
  const refRBSheet = useRef();
  const calculatorRef = useRef(null);
  const sheetRef = useRef(null);

  useEffect(() => {
    addListener('focus', () => {
      setTabBarBottom(false);
    });
    navigation.setOptions({
      headerLeft: () => (
        <BackIcon
          style={{marginHorizontal: 16}}
          onPress={() => {
            setExpression('');
            setResult('');
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={{color: '#fff', fontSize: 20}}>
              {isDeposit
                ? locales('titles.deposit')
                : locales('titles.withdrawal')}
            </Text>
          </View>
        </>
      ),
      headerRight: () => (
        <View style={{marginRight: 16}}>
          <NotifPageIcon
            onPress={() => {
              navigate('Notifications');
            }}
          />
        </View>
      ),
      headerStyle: {backgroundColor: isDeposit ? '#00CF82' : '#E52929'},
    });
  }, [navigation]);

  const handleCustomerData = () => {};
  const handleYesBtn = () => {
    setImage('');
    setDeleteImageModalVisibility(false);
    setImageModalVisibility(false);
  };

  const onSheetItemPressed = async index => {
    const isAllowed = await permissions.requestCameraPermission();

    if (!isAllowed) return;
    let options = {
      cropping: true,
    };

    switch (index) {
      case 0:
        return ImageCropPicker.openCamera(options).then(result => {
          setImage(result);
          sheetRef?.current?.close();
        });
      case 1:
        return ImageCropPicker.openPicker(options).then(result => {
          setImage(result);
          sheetRef?.current?.close();
        });
      default:
        break;
    }
  };

  useEffect(() => {
    if (expression.length > 0) {
      setEuCal(true);
    } else {
      setEuCal(false);
    }
  }, [expression]);

  const fetchBankAccountDetails = async () => {
    await database.collections
      .get('bank_accounts')
      .find(bankAccountId)
      .then(res => setBankAccountDetails(res._raw));
  };

  const requestImagePermission = async () => {
    refRBSheet.current.open();
  };

  const typeOdDeposit = [{name: 'Cash'}, {name: 'Credit Card'}, {name: 'ATM'}];

  const handleConfirm = (cDate, type) => {
    const momentObj = moment(
      cDate,
      type === 'date' ? 'ddd MMM DD YYYY HH:mm' : 'HH:mm',
    );
    if (type === 'date') setDate(momentObj.unix());
    else setTime(momentObj.unix());
    setDatePickerVisibility(false);
  };

  const openCalendar = type => {
    setCalendarType(type);
    setDatePickerVisibility(true);
  };

  const renderActionSheet = _ => {
    return (
      <RBSheet
        animationType="none"
        openDuration={250}
        closeDuration={250}
        closeOnDragDown
        closeOnPressMask
        closeOnPressBack
        ref={sheetRef}
        height={200}
        customStyles={{
          container: {},
          wrapper: {
            backgroundColor: 'rgba(1, 2, 13, 0.2)',
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
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
            {locales('titles.uploadAnImage')}
          </Text>
          <Pressable
            onPress={() => {
              sheetRef?.current?.close();
            }}
            style={{padding: 24}}>
            <CloseIcon fill="#9B9B9B" />
          </Pressable>
        </View>

        <View
          style={{height: 1, width: '100%', backgroundColor: '#D9D9D9'}}></View>

        <View style={{padding: 24}}>
          <Pressable onPress={_ => onSheetItemPressed(0)}>
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
                  {locales('titles.camera')}
                </Text>
              </View>
              <ArrowRightBtn style={{marginTop: 4}} />
            </View>
          </Pressable>

          <Pressable onPress={_ => onSheetItemPressed(1)}>
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
                  {locales('titles.gallery')}
                </Text>
              </View>
              <ArrowRightBtn style={{marginTop: 4}} />
            </View>
          </Pressable>
        </View>
      </RBSheet>
    );
  };

  const calculator = () => (
    <RBSheet
      animationType="none"
      openDuration={250}
      closeDuration={250}
      closeOnDragDown
      closeOnPressMask
      closeOnPressBack
      ref={calculatorRef}
      height={450}
      customStyles={{
        container: {},
        wrapper: {
          backgroundColor: 'rgba(1, 2, 13, 0.2)',
        },
        draggableIcon: {
          display: 'none',
        },
      }}>
      <Calculator calculatorRef={calculatorRef} />
    </RBSheet>
  );

  useEffect(() => {
    if (expression) {
      setErrorDisplay(false);
      setErrorDisplay2(false);
    }
  }, [expression]);

  const onSubmit = _ => {
    if (!isDeposit && result > totalTransactionAmount) {
      setErrorDisplay2(true);
      return;
    }
    if (result <= 0) {
      setErrorDisplay(true);
      return;
    }
    const datePart = moment.unix(date ?? moment()).format('YYYY-MM-DD');
    const timePart = moment.unix(time).format('HH:mm:ss');
    const newDate = moment(`${datePart} ${timePart}`, 'YYYY-MM-DD HH:mm:ss');

    if (!date) setDate(moment().unix());
    if (!time) setTime(moment().unix().format('HH:mm'));
    database.write(async _ => {
      await database.collections
        .get('account_transactions')
        .create(accountTransactions => {
          accountTransactions._raw.bank_account_transactions_id = bankAccountId;
          accountTransactions._raw.description = description;
          accountTransactions._raw.amount = isDeposit
            ? parseFloat(result)
            : -1 * parseFloat(result);
          accountTransactions._raw.date = newDate.unix();
          accountTransactions._raw.account_type = depositeType;
          accountTransactions._raw.image =
            image && image.path ? image.path : '';
        })
        .then(async _ => {
          await database.collections
            .get('account_transactions')
            .query()
            .fetch();
          setResult('');
          setExpression('');
          return navigation.goBack();
        });
    });
  };
  console.log(moment.unix(date).format('MMM DD'));

  return (
    <>
      {calculator()}

      <TouchableWithoutFeedback
        onPress={() => {
          setCalenderDisplay(false);
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            height: '100%',
            justifyContent: 'space-between',
          }}>
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                calculatorRef.current.open();
              }}>
              <View
                style={[
                  styles.calStyle,
                  {
                    borderTopColor: errorDisplay
                      ? '#E62929'
                      : 'rgba(11, 21, 150, 1)',
                    borderBottomWidth: 1,
                    borderBottomColor: errorDisplay
                      ? '#E62929'
                      : 'rgba(11, 21, 150, 1)',
                  },
                ]}>
                <View>
                  <Text
                    style={{color: '#0B1596', fontSize: 13, fontWeight: '500'}}>
                    {expression}
                  </Text>
                  <Text
                    style={{color: '#01020D', fontSize: 18, fontWeight: '600'}}>
                    {result ? result : '0'}
                  </Text>
                </View>

                <EuroIcon style={{display: euCal ? 'flex' : 'none'}} />
                <CalculatorIcon style={{display: euCal ? 'none' : 'flex'}} />
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{
                display: errorDisplay2 ? 'flex' : 'none',
                flexDirection: 'row',
                gap: 4,
                marginVertical: 4,
                marginLeft: 16,
                alignItems: 'center',
              }}>
              <ErrorIcon />

              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: '#E62929',
                  alignItems: 'center',
                }}>
                {locales('titles.theAmountEnteredIsMoreThanTheAccountBalance')}
              </Text>
            </View>

            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#E62929',
                marginLeft: 16,
                marginVertical: 4,
                display: errorDisplay ? 'flex' : 'none',
              }}>
              {locales('titles.thisFieldCantBeEmpty')}
            </Text>
            <View style={styles.bar}>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#01020D'}}>
                {locales('titles.yourBalanceAccount')}
              </Text>
              <Text style={{color: '#0B1596', fontSize: 14, fontWeight: '600'}}>
                {totalTransactionAmount}{' '}
                {currenciesList.find(
                  currency => currency.id === bankAccountDetails.currency_id,
                )?.title === 'EUR'
                  ? '£'
                  : '$'}
              </Text>
            </View>

            <View style={{marginHorizontal: 24}}>
              <FlotableInput
                onPress={() => {
                  setShowUnitList(!showUnitList);
                }}
                editable={false}
                inputMode="text"
                value={depositeType}
                setValue={setDescription}
                inputPlaceholder={locales('titles.typeOfDeposit')}
                multiline={true}>
                <DropDownIcon style={{marginRight: 16}} />
              </FlotableInput>
            </View>
            <FlatList
              data={typeOdDeposit}
              style={[
                styles.depositeTypeStyle,
                {
                  display: showUnitList ? 'flex' : 'none',
                },
              ]}
              renderItem={item => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setShowUnitList(false);
                    setDepositeType(item.item.name);
                  }}>
                  <View style={{padding: 8}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color:
                          item.item.name === depositeType
                            ? '#2E5BFF'
                            : '#01020D',
                      }}>
                      {item.item.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />

            {renderActionSheet()}
            <DateTimePickerModal
              mode={calendarType}
              isVisible={isDatePickerVisible}
              onConfirm={calendarDate =>
                handleConfirm(calendarDate, calendarType)
              }
              onCancel={_ => setDatePickerVisibility(false)}
            />

            <View style={styles.calClockStyle}>
              <View style={{flex: 1, marginRight: 16}}>
                <FlotableInput
                  editable={false}
                  onPress={() => {
                    openCalendar('date');
                  }}
                  value={`${moment.unix(date).format('MMM DD')}`}
                  setValue={setDate}
                  inputPlaceholder={locales('titles.calendar')}
                  children={<CalenderIcon style={{marginRight: 16}} />}
                />
              </View>
              <View style={{flex: 1}}>
                <FlotableInput
                  onPress={() => {
                    openCalendar('time');
                  }}
                  editable={false}
                  value={`${moment.unix(time).format('HH:mm')}`}
                  setValue={setTime}
                  inputPlaceholder={locales('titles.clock')}
                  children={<ClockIcon style={{marginRight: 16}} />}
                />
              </View>
            </View>

            <View style={{marginHorizontal: 24}}>
              <FlotableInput
                inputMode="text"
                value={description}
                setValue={setDescription}
                inputPlaceholder={locales('titles.discription')}
                multiline={true}
              />
            </View>

            <TouchableWithoutFeedback onPress={() => sheetRef.current.open()}>
              <View
                style={{
                  marginHorizontal: 24,
                  borderColor: 'rgba(11, 21, 150, 0.09)',
                  borderWidth: image.path?.length > 0 ? 0 : 2,
                  borderStyle: 'dashed',
                  borderRadius: 8,
                  paddingVertical: image.path?.length > 0 ? 0 : 16,
                  paddingHorizontal: image.path?.length > 0 ? 0 : 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 12,
                  maxHeight: '25%',
                }}>
                <View
                  style={{
                    display: image.path?.length > 0 ? 'none' : 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ImageIcon />
                  <Text
                    style={{
                      color: '#0B1596',
                      fontSize: 14,
                      fontWeight: '500',
                      marginTop: 16,
                    }}>
                    {locales('titles.uploadAImage')}
                  </Text>
                </View>

                {image && image.path ? (
                  <Image
                    style={{
                      display: image.path?.length > 0 ? 'flex' : 'none',
                      width: '100%',
                      height: '95%',
                      borderRadius: 8,
                      resizeMode: 'cover',
                    }}
                    source={{
                      uri: image.path,
                    }}
                  />
                ) : null}
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{
                marginHorizontal: 24,
                display: image.path?.length > 0 ? 'flex' : 'none',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setImageModalVisibility(true);
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <ViewIcon />
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 14,
                      color: '#0B1596',
                      marginLeft: 8,
                    }}>
                    {locales('titles.view')}
                  </Text>
                </View>
              </TouchableWithoutFeedback>

              <Pressable
                onPress={() => {
                  setDeleteImageModalVisibility(true);
                }}
                style={{padding: 8}}>
                <DeleteImageIcon size={'24'} fill="#E52929" />
              </Pressable>
            </View>

            {/* <TouchableWithoutFeedback onPress={requestImagePermission}>
              <View
                style={[
                  styles.chooseImgStyle,
                  {
                    borderWidth: imageSrc.length > 0 ? 0 : 2,
                    paddingVertical: imageSrc.length > 0 ? 0 : 16,
                    paddingHorizontal: imageSrc.length > 0 ? 0 : 8,
                  },
                ]}>
                <View
                  style={{
                    display: imageSrc.length > 0 ? 'none' : 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ImageIcon />
                  <Text
                    style={{
                      color: '#0B1596',
                      fontSize: 14,
                      fontWeight: '500',
                      marginTop: 16,
                    }}>
                    {locales('titles.uploadAImage')}
                  </Text>
                </View>
                <RBSheet
                  height={200}
                  animationType="none"
                  ref={refRBSheet}
                  closeOnDragDown={true}
                  closeOnPressMask={true}
                  draggableIcon
                  customStyles={{
                    container: {
                      borderRadius: 8,
                      backgroundColor: '#fff',
                      elevation: 2,
                    },
                    wrapper: {
                      backgroundColor: 'rgba(1, 2, 13, 0.2)',
                    },
                    draggableIcon: {
                      display: 'none',
                      backgroundColor: 'red',
                    },
                  }}>
                  <ChooseImage refRBSheet={refRBSheet} />
                </RBSheet>

                <Image
                  style={{
                    display: imageSrc.length > 0 ? 'flex' : 'none',
                    width: '100%',
                    height: '100%',
                    borderRadius: 8,
                    resizeMode: 'cover',
                  }}
                  source={{
                    uri: imageSrc,
                  }}
                />
              </View>
            </TouchableWithoutFeedback> */}
            <View
              style={{
                marginHorizontal: 24,
                display: imageSrc.length > 0 ? 'flex' : 'none',
                flexDirection: 'row',
                marginTop: 8,
                justifyContent: 'space-between',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('ImagePage', {imageSrc});
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <ViewIcon />
                  <Text style={styles.viewBtnText}>
                    {locales('titles.view')}
                  </Text>
                </View>
              </TouchableWithoutFeedback>

              <DeleteImageIcon
                fill="#E52929"
                onPress={() => {
                  navigation.navigate('DeleteImageModal');
                }}
              />
            </View>

            <View>
              {timeDisplay ? (
                <DateTimePicker
                  display="default"
                  mode="time"
                  value={time}
                  onChange={(event, date) => {
                    setTimeDisplay(false);
                    setTime(date);
                  }}
                />
              ) : null}
              {dateDisplay ? (
                <DateTimePicker
                  display="default"
                  mode="date"
                  value={date}
                  onChange={(event, date) => {
                    setDateDisplay(false);
                    setDate(date);
                  }}
                  themeVariant="#fff"
                />
              ) : null}
            </View>
          </View>

          <Pressable
            onPress={onSubmit}
            style={[
              styles.submitBtn,
              {backgroundColor: isDeposit ? '#00CF82' : '#E52929'},
            ]}>
            <Text style={styles.submitext}>{locales('titles.submit')}</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>

      <Modal
        transparent
        visible={imageModalVisibility}
        onDismiss={_ => setImageModalVisibility(false)}
        animationType="fade"
        onRequestClose={_ => setImageModalVisibility(false)}>
        <View style={styles.imageModalView}>
          <Pressable
            onPress={() => {
              setImageModalVisibility(false);
            }}
            style={styles.imageModalCloseBtn}>
            <CloseIcon fill="#FFF" />
          </Pressable>

          <Image
            style={styles.imageModalImageView}
            source={{
              uri: image.path,
            }}
          />
          <Pressable
            style={styles.imageModalDeleteBtn}
            onPress={() => {
              setDeleteImageModalVisibility(true);
            }}>
            <DeleteImageIcon fill="#fff" />
            <Text style={styles.imageModaldeleteText}>
              {locales('titles.delete')}
            </Text>
          </Pressable>
        </View>
      </Modal>

      <Modal
        transparent
        visible={deleteimageModalVisibility}
        onDismiss={_ => setDeleteImageModalVisibility(false)}
        animationType="fade"
        onRequestClose={_ => setDeleteImageModalVisibility(false)}>
        <Pressable
          onPress={() => {
            setDeleteImageModalVisibility(false);
          }}
          style={styles.container}>
          <View style={styles.mainView}>
            <Text style={styles.headerText}>
              {locales('titles.deleteThisImage')}
            </Text>
            <View style={styles.line}></View>
            <Text style={styles.message}>
              {locales('titles.areYouSureYouWantToDeleteThisImage')}
            </Text>
            <View style={styles.rowDir}>
              <Pressable onPress={handleYesBtn} style={styles.yesBtn}>
                <Text style={styles.yesText}>{locales('titles.yes')}</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setDeleteImageModalVisibility(false);
                }}
                style={styles.noBtn}>
                <Text style={styles.noText}>{locales('titles.no')}</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  amount: {
    backgroundColor: '#fff',
    width: '92%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#168b22',
    borderTopWidth: 5,
    alignSelf: 'center',
    paddingVertical: 12,
  },
  bar: {
    backgroundColor: ' rgba(11, 21, 150, 0.09)',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  dcci: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  line: {
    backgroundColor: '#b7b7b7',
    height: 1,
    width: '85%',
    alignSelf: 'flex-end',
  },
  btn: {
    color: '#152F8C',
    fontWeight: 'bold',
  },
  registerBtn: {
    backgroundColor: '#168b22',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 5,
    marginBottom: 12,
  },
  submitBtn: {
    marginBottom: 24,
    marginHorizontal: 24,
    backgroundColor: '#00CF82',
    paddingVertical: 16,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  submitext: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  switchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 24,
  },
  switchTextStyle: {
    color: '#01020D',
    fontWeight: '500',
    fontSize: 14,
  },
  viewBtnText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#0B1596',
    marginLeft: 8,
  },
  depositeTypeStyle: {
    zIndex: 2,
    top: '45%',
    position: 'absolute',
    marginRight: 24,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '90%',
    elevation: 1,
    padding: 4,
    marginTop: 16,
    borderRadius: 8,
  },
  calClockStyle: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  chooseImgStyle: {
    marginHorizontal: 24,
    borderColor: 'rgba(11, 21, 150, 0.09)',
    borderStyle: 'dashed',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    maxHeight: '25%',
  },
  container: {
    paddingHorizontal: 37,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 2, 13, 0.2)',
  },
  mainView: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
  },
  headerText: {
    color: '#01020D',
    fontWeight: '700',
    fontSize: 18,
  },
  message: {
    color: '#17191C',
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 16,
  },
  noBtn: {
    padding: 16,
    backgroundColor: '#0B1596',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  noText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  yesText: {
    color: '#E52929',
    fontWeight: '600',
    fontSize: 16,
  },
  yesBtn: {
    padding: 16,
    backgroundColor: 'transparent',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  line: {
    backgroundColor: '#D9D9D9',
    height: 1,
    marginVertical: 16,
  },
  rowDir: {
    flexDirection: 'row',
  },
  imageModalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(1, 2, 13, 0.945)',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  imageModalImageView: {
    display: 'flex',
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  imageModalDeleteBtn: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  imageModaldeleteText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
  },
  imageModalCloseBtn: {
    padding: 16,
    alignSelf: 'flex-end',
  },
  calStyle: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(248, 248, 248, 1)',
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default DepositPage;
