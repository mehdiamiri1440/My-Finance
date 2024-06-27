import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Switch,
  Modal,
  ScrollView,
} from 'react-native';
import database from '../../DB/index.native';
import {Q} from '@nozbe/watermelondb';
import ImageIcon from '../../assets/svgs/ImageIcon';
import {SheetManager} from 'react-native-actions-sheet';
import EuroIcon from '../../assets/svgs/EuroIcon';
import CalculatorIcon from '../../assets/svgs/CalculatorIcon';
import {contextsStore} from '../../contexts';
import FlotableInput from '../../components/FlotableInput';
import CalenderIcon from '../../assets/svgs/CalenderIcon';
import ClockIcon from '../../assets/svgs/ClockIcon';
import DateTimePicker from '@react-native-community/datetimepicker';
import ViewIcon from '../../assets/svgs/ViewIcon';
import DeleteImageIcon from './../../assets/svgs/DeleteImageIcon';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import ImageCropPicker from 'react-native-image-crop-picker';
import CameraIcon from '../../assets/svgs/CameraIcon';
import {permissions} from '../../utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import ArrowRightBtn from '../../assets/svgs/ArrowRightBtn';
import GalleryIcon from '../../assets/svgs/GalleryIcon';
import CloseIcon from '../../assets/svgs/CloseIcon';
import BackIcon from '../../assets/svgs/BackIcon';
import Calculator from './../../components/SheetManager/Calculator';

const TransactionDetails = props => {
  const {navigation = {}, route = {}} = props;

  const {params = {}} = route;
  const sheetRef = useRef(null);
  const calculatorRef = useRef(null);

  const {transactionId, bookCashCustomerId, isDebt, bookCashId} = params;
  const {result, setResult, expression, setExpression} =
    useContext(contextsStore);
  const [errorDisplay, setErrorDisplay] = useState(false);

  const [calendarType, setCalendarType] = useState('date');
  const [description, setDescription] = useState('');
  const [accountBalancePerDate, setAccountBalancePerDate] = useState(0);
  const [transactionDetails, setTransactionDetails] = useState({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [amount, setAmount] = useState('');
  const [image, setImage] = useState({});
  const [date, setDate] = useState(moment().unix());
  const [time, setTime] = useState(moment().unix());

  const [isEnabled, setIsEnabled] = useState(false);
  const [imageModalVisibility, setImageModalVisibility] = useState(false);
  const [deleteimageModalVisibility, setDeleteImageModalVisibility] =
    useState(false);
  const [addInvoceModalVisibility, setAddInvoceModalVisibility] =
    useState(true);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(_ => {
    fetchTransactionDetails();
    navigation.setOptions({
      headerStyle: {backgroundColor: isDebt ? '#E52929' : '#00CF82'},
      headerLeft: () => (
        <BackIcon
          style={{margin: 16}}
          onPress={() => {
            navigation.goBack();
            setExpression('');
            setResult('');
          }}
        />
      ),
    });
  }, []);

  const fetchTransactionDetails = async _ => {
    if (transactionId) {
      const transaction = await database.collections
        .get('customer_transactions')
        .find(transactionId);
      setTransactionDetails({...transaction._raw});

      const transactions = await database.collections
        .get('customer_transactions')
        .query(
          Q.where('book_cash_customer_id', bookCashCustomerId),
          Q.where('created_at', Q.lte(transaction._raw.created_at)),
        );
      setAccountBalancePerDate(
        transactions.reduce((acc, itm) => acc + itm._raw.amount, 0),
      );

      if (transactionId) {
        const {_raw = {}} = transaction;
        const {
          amount: prevAmount,
          date: prevDate,
          description: prevDescription,
          image: prevImagePath,
        } = _raw;
        if (prevAmount) setResult(prevAmount);
        if (prevDate) {
          setDate(moment.unix(prevDate) / 1000);
          setTime(moment.unix(prevDate) / 1000);
        }
        if (prevDescription) setDescription(prevDescription);
        if (prevImagePath) setImage(JSON.parse(prevImagePath));
      }
    }
  };

  const onAmountChanged = value => {
    setAmount(value);
  };

  const openCalendar = type => {
    setCalendarType(type);
    setDatePickerVisibility(true);
  };

  const onDescriptionChanged = value => {
    setDescription(value);
  };

  const onSubmit = async _ => {
    if (!date) setDate(moment());

    if (!result) {
      setErrorDisplay(true);
      return;
    }
    const datePart = moment.unix(date ?? moment()).format('YYYY-MM-DD');
    const timePart = moment.unix(time).format('HH:mm:ss');

    const newDate = moment(`${datePart} ${timePart}`, 'YYYY-MM-DD HH:mm:ss');

    if (transactionId) {
      const transaction = await database.collections
        .get('customer_transactions')
        .find(transactionId);
      database.write(async _ => {
        transaction
          .update(item => {
            item._raw.is_note = false;
            item._raw.description = description;
            item._raw.amount = parseFloat(result);
            item._raw.date = newDate.unix();
            item._raw.image = image && image.path ? JSON.stringify(image) : '';
          })
          .then(async _ => {
            await database.collections
              .get('customer_transactions')
              .query()
              .fetch();
            setResult('');
            setExpression('');
            return navigation.goBack();
          });
      });
    } else {
      database.write(async _ => {
        await database.collections
          .get('customer_transactions')
          .create(customerTransaction => {
            customerTransaction._raw.is_note = false;
            customerTransaction._raw.book_cash_customer_id = bookCashCustomerId;
            customerTransaction._raw.description = description;
            customerTransaction._raw.amount = isDebt
              ? -1 * parseFloat(result)
              : parseFloat(result);
            customerTransaction._raw.date = newDate.unix();
            customerTransaction._raw.image =
              image && image.path ? JSON.stringify(image) : '';
          })
          .then(async _ => {
            await database.collections
              .get('customer_transactions')
              .query()
              .fetch();
            setResult('');
            setExpression('');
            return navigation.goBack();
          });
      });
    }
  };

  useEffect(() => {
    if (expression) {
      setErrorDisplay(false);
    }
  }, [expression]);

  const handleConfirm = (cDate, type) => {
    if (type === 'date') setDate(moment(cDate).unix());
    else setTime(moment(cDate).unix());
    setDatePickerVisibility(false);
  };

  const onSheetItemPressed = async index => {
    const isAllowed = await permissions.requestCameraPermission();

    if (!isAllowed) return;
    let options = {
      cropping: true,
    };

    switch (index) {
      case 0:
        return ImageCropPicker.openCamera(options).then(img => {
          setImage(img);
          sheetRef?.current?.close();
        });
      case 1:
        return ImageCropPicker.openPicker(options).then(img => {
          setImage(img);
          sheetRef?.current?.close();
        });
      default:
        break;
    }
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

  const handleYesBtn = () => {
    setImage('');
    setDeleteImageModalVisibility(false);
    setImageModalVisibility(false);
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

  const handleAddInvoice = () => {
    navigation.navigate('singleInvoice', {bookCashId, bookCashCustomerId});
  };

  const addInvoiceModal = () => (
    <Modal
      transparent
      visible={addInvoceModalVisibility}
      onDismiss={_ => setAddInvoceModalVisibility(false)}
      animationType="fade"
      onRequestClose={_ => setAddInvoceModalVisibility(false)}>
      <Pressable
        onPress={() => {
          setAddInvoceModalVisibility(false);
        }}
        style={styles.container}>
        <View style={styles.mainView}>
          <Text style={[styles.headerText, {textAlign: 'center'}]}>
            {locales('titles.areYouInterestedInCreatingANewInvoice')}
          </Text>

          <View style={{flexDirection: 'column', marginTop: 32, gap: 16}}>
            <Pressable
              onPress={handleAddInvoice}
              style={[styles.noBtn, {flex: 0}]}>
              <Text style={{color: '#fff', fontWeight: '600', fontSize: 16}}>
                {locales('titles.yesAddInvoice')}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setAddInvoceModalVisibility(false);
              }}
              style={[styles.noBtn, {flex: 0, backgroundColor: 'transparent'}]}>
              <Text style={[styles.noText, {color: '#0B1596'}]}>
                {locales('titles.no')}
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );

  return (
    // <ScrollView style={{}}>
    <>
      {calculator()}
      {addInvoiceModal()}
      <View style={styles.mainContainer}>
        <View>
          <Pressable
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
                  style={{
                    color: '#0B1596',
                    fontSize: 13,
                    fontWeight: '500',
                  }}>
                  {expression}
                </Text>
                <Text
                  style={{
                    color: '#01020D',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  {result ? result : '0'}
                </Text>
              </View>

              <EuroIcon
                style={{display: expression.length ? 'flex' : 'none'}}
              />
              <CalculatorIcon
                style={{display: expression.length ? 'none' : 'flex'}}
              />
            </View>
          </Pressable>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '400',
              color: '#E62929',
              marginLeft: 16,
              marginTop: 4,
              display: errorDisplay ? 'flex' : 'none',
            }}>
            {locales('titles.thisFieldCantBeEmpty')}
          </Text>

          <View style={styles.bar}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#01020D'}}>
              {locales('titles.yourBalanceAccount')}
            </Text>
            <Text style={{color: '#0B1596', fontSize: 14, fontWeight: '600'}}>
              {Math.abs(accountBalancePerDate)}
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: 24,
            }}>
            <View style={{flex: 1, marginRight: 16}}>
              <FlotableInput
                onPress={() => {
                  openCalendar('date');
                }}
                value={`${moment.unix(date).format('MMM DD')}`}
                setValue={setDate}
                editable={false}
                inputPlaceholder={locales('titles.calendar')}
                children={<CalenderIcon style={{marginRight: 16}} />}
              />
            </View>
            <View style={{flex: 1}}>
              <FlotableInput
                editable={false}
                onPress={() => {
                  openCalendar('time');
                }}
                value={`${moment.unix(time).format('HH:mm')}`}
                setValue={setTime}
                inputPlaceholder={locales('titles.clock')}
                children={<ClockIcon style={{marginRight: 16}} />}
              />
            </View>
          </View>

          {renderActionSheet()}
          <DateTimePickerModal
            date={new Date()}
            mode={calendarType}
            isVisible={isDatePickerVisible}
            onConfirm={calendarDate =>
              handleConfirm(calendarDate, calendarType)
            }
            onCancel={_ => setDatePickerVisibility(false)}
          />
          {/* <TextInput
          onChangeText={onAmountChanged}
          keyboardType="numeric"
          value={amount}
          placeholder="amount"
          style={{width: '100%', borderRadius: 8, borderWidth: 1}}
        /> */}
          {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>Your account balance until this amount</Text>
          <Text>{Math.abs(accountBalancePerDate)}</Text>
        </View> */}
          {/* <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text
            onPress={_ => openCalendar('date')}
            style={{
              borderRadius: 8,
              borderWidth: 1,
              width: '45%',
              textAlign: 'center',
              marginVertical: 30,
              height: 40,
              textAlignVertical: 'center',
            }}>
            calendar
          </Text>
          <Text
            onPress={_ => openCalendar('time')}
            style={{
              borderRadius: 8,
              borderWidth: 1,
              width: '45%',
              textAlign: 'center',
              marginVertical: 30,
              height: 40,
              textAlignVertical: 'center',
            }}>
            clock
          </Text>
        </View> */}

          <View style={{marginHorizontal: 24}}>
            <FlotableInput
              inputMode="text"
              value={description}
              setValue={onDescriptionChanged}
              inputPlaceholder={locales('titles.discription')}
              multiline={true}
            />
          </View>
          {/* <TextInput
        numberOfLines={6}
        onChangeText={onDescriptionChanged}
        value={description}
        placeholder="Description ..."
      /> */}

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
                    height: '100%',
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
          <TouchableWithoutFeedback onPress={toggleSwitch}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 24,
                marginTop: 8,
              }}>
              <Text style={{color: '#01020D', fontWeight: '500', fontSize: 14}}>
                {locales('titles.notificationBySMS')}
              </Text>
              <Switch
                trackColor={{false: '#D9D9D9', true: '#0B1596'}}
                thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </TouchableWithoutFeedback>

          {/* <Pressable />
        {image && image.path ? (
          <Pressable
            onPress={_ => sheetRef.current.open()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderStyle: 'dashed',
              borderColor: '#bebebe',
              borderWidth: 1,
            }}>
            <Image
              source={{uri: image.path}}
              style={{
                width: 200,
                height: 200,
              }}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={_ => sheetRef.current.open()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderStyle: 'dashed',
              borderColor: '#bebebe',
              borderWidth: 1,
            }}>
            <ImageIcon />
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              Upload an image
            </Text>
          </Pressable>
        )} */}
          {/* <Pressable
          onPress={onSubmit}
          style={{
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            backgroundColor: 'red',
          }}>
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              color: 'white',
            }}>
            Submit
          </Text>
        </Pressable> */}
        </View>

        <Pressable
          onPress={onSubmit}
          style={{
            margin: 24,
            backgroundColor: isDebt ? '#E52929' : '#00CF82',
            paddingVertical: 16,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
            {locales('titles.submit')}
          </Text>
        </Pressable>
      </View>

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
                <Text style={[styles.noText]}>{locales('titles.no')}</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>

    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  bar: {
    backgroundColor: ' rgba(11, 21, 150, 0.09)',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 16,
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
    color: '#fff',
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

export default TransactionDetails;
