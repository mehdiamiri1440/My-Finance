import React, {useRef, useState, useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  FlatList,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import FlotableInput from '../../components/FlotableInput';
import PlusIcon from '../../assets/svgs/PlusIcon';
import AddProductIcon from '../../assets/svgs/AddProductIcon';
import CustomBtn from '../../components/Button/CustomBtn';
import RBSheet from 'react-native-raw-bottom-sheet';
import SearchIcon from '../../assets/svgs/SearchIcon';
import PersonIcon from '../../assets/svgs/PersonIcon';
import ArrowRight from '../../assets/svgs/ArrowRight';
import PeopleIcon from '../../assets/svgs/PeopleIcon';
import CalenderIcon from '../../assets/svgs/CalenderIcon';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '../../DB/index.native';
import {Q} from '@nozbe/watermelondb';
import BackIcon from '../../assets/svgs/BackIcon';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import ErrorIcon from '../../assets/svgs/ErrorIcon';
import RNFS from 'react-native-fs';
import {permissions} from '../../utils';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {contextsStore} from '../../contexts';
import DeleteImageIcon from '../../assets/svgs/DeleteImageIcon';

function SingleInvoice({navigation, route}) {
  const {setResult} = useContext(contextsStore);
  const [bookCash, setBookCash] = useState('');
  const [bookCashList, setBookCashList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState(moment().unix());
  const [switchBtnStyle, setswitchBtnStyle] = useState(false);
  const [calendarType, setCalendarType] = useState('date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [total, setTotal] = useState(null);
  const [invoiceModalVisibility, setInvoiceModalVisibility] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [warnStyle1, setWarnStyle1] = useState(true);
  const [warnStyle2, setWarnStyle2] = useState(true);
  const [errorDisplay1, setErrorDisplay1] = useState(false);
  const [errorDisplay2, setErrorDisplay2] = useState(false);
  const [errorDisplay3, setErrorDisplay3] = useState(false);
  const [errorDisplay4, setErrorDisplay4] = useState(false);
  const [errorDisplay5, setErrorDisplay5] = useState(false);
  const [errorDisplay6, setErrorDisplay6] = useState(false);
  const [deleteProductModalVisibility, setDeleteProductModalVisibility] =
    useState(false);
  const [productIndex, setProductIndex] = useState('');

  const {bookCashId, bookCashCustomerId} = route.params;
  const [imgUri, setImgUri] = useState('');

  const addProductSheetRef = useRef();
  const viewShotRef = useRef();

  useEffect(() => {
    fetchBookCashDetails();
    fetchCustomers();
    navigation.addListener('focus', _ => fetchBookCashDetails());
  }, []);

  const fetchBookCashDetails = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const userBookCashes = await database.collections
      .get('book_cashes')
      .find(bookCashId)
      .then(res => {
        setBookCashList(res._raw);
      });
  };

  const fetchCustomers = async item => {
    const customersList = await database.collections
      .get('book_cash_customers')
      .find(bookCashCustomerId)
      .then(res => {
        setCustomerList(res._raw);
      });
  };

  const renderItem = ({item, index}) => (
    <View
      style={{
        backgroundColor: index % 2 == 0 ? '#dedede' : '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomColor: '#DEDEDE',
        borderBottomWidth: 1,
      }}>
      <Text style={[styles.headerTable, {fontWeight: '400', color: '#17191C'}]}>
        {item.item}
      </Text>
      <Text style={[styles.headerTable, {fontWeight: '400', color: '#17191C'}]}>
        {item.quantity}
      </Text>
      <Text style={[styles.headerTable, {fontWeight: '400', color: '#17191C'}]}>
        {' '}
        {item.price}
      </Text>
      <Text style={[styles.headerTable, {fontWeight: '400', color: '#17191C'}]}>
        {item.total.toLocaleString()}
      </Text>
      <Pressable
        style={{padding: 4}}
        onPress={() => {
          handleDeleteProduct(item, index);
        }}>
        <DeleteImageIcon fill={'red'} size={18} />
      </Pressable>
    </View>
  );

  const deleteProductModal = () => (
    <Modal
      transparent
      visible={deleteProductModalVisibility}
      onDismiss={_ => setDeleteProductModalVisibility(false)}
      animationType="fade"
      onRequestClose={_ => setDeleteProductModalVisibility(false)}>
      <Pressable
        onPress={() => {
          setDeleteProductModalVisibility(false);
        }}
        style={styles.deleteProductModalcontainer}>
        <View style={styles.mainView}>
          <Text style={styles.headerText}>
            {locales('titles.deleteThisInvoice')}
          </Text>
          <View style={styles.line}></View>
          <Text style={styles.message}>
            {locales('titles.areYouSureYouWantToDeleteThisInvoice')}
          </Text>
          <View style={styles.rowDir}>
            <Pressable onPress={handleYesBtn} style={styles.yesBtn}>
              <Text style={styles.yesText}>{locales('titles.yes')}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setDeleteProductModalVisibility(false);
              }}
              style={styles.noBtn}>
              <Text style={styles.noText}>{locales('titles.no')}</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );

  const handleYesBtn = () => {
    const newProduct = products.filter((obj, ind) => ind !== productIndex);
    setTotalAmount(newProduct.reduce((acc, itm) => acc + itm.total, 0));
    setProducts(newProduct);
    setDeleteProductModalVisibility(false);
  };

  const handleDeleteProduct = (item, index) => {
    setProductIndex(index);
    setDeleteProductModalVisibility(true);
  };

  const handleAddProduct = () => {
    if (!productName) {
      setErrorDisplay4(true);
      return;
    } else if (!price) {
      setErrorDisplay5(true);
      return;
    } else if (!quantity) {
      setErrorDisplay6(true);
      return;
    }
    const product = {
      item: productName,
      quantity: quantity,
      price: price,
      total: total,
    };

    setProducts([...products, product]);
    setProductName('');
    setPrice(null), setQuantity(null);
    setTotal(null);
    setTotalAmount(products.reduce((acc, itm) => acc + itm.total, 0));

    addProductSheetRef.current.close();
  };
  const handleConfirm = (cDate, type) => {
    const momentObj = moment(
      cDate,
      type === 'date' ? 'ddd MMM DD YYYY HH:mm' : 'HH:mm',
    );
    if (type === 'date') setDate(momentObj.unix());
    setDatePickerVisibility(false);
  };

  const openCalendar = type => {
    setCalendarType(type);
    setDatePickerVisibility(true);
  };

  useEffect(() => {
    const total = quantity * price;
    setTotal(total);
    setTotalAmount(products.reduce((acc, itm) => acc + itm.total, 0));
  }, [quantity, price]);

  const addProductSheet = () => (
    <RBSheet
      animationType="none"
      openDuration={250}
      closeDuration={250}
      closeOnDragDown
      closeOnPressMask
      closeOnPressBack
      ref={addProductSheetRef}
      height={470}
      customStyles={{
        container: {},
        wrapper: {
          backgroundColor: 'rgba(1, 2, 13, 0.2)',
        },
        draggableIcon: {
          backgroundColor: '#000',
          display: 'none',
        },
      }}>
      <Text
        style={{
          fontWeight: '600',
          fontSize: 16,
          color: '#01020D',
          paddingHorizontal: 16,
          paddingTop: 16,
        }}>
        {locales('titles.itemDetails')}
      </Text>
      <View style={{paddingHorizontal: 16}}>
        <FlotableInput
          borderColor={!errorDisplay4 ? '' : '#E62929'}
          inputPlaceholder={locales('titles.productName')}
          value={productName}
          setValue={setProductName}
        />
        <View
          style={{
            display: errorDisplay4 ? 'flex' : 'none',
            flexDirection: 'row',
            gap: 4,
            marginVertical: 4,
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
            {locales('titles.thisFieldCanNotBeEmpty')}
          </Text>
        </View>

        <FlotableInput
          borderColor={!errorDisplay5 ? '' : '#E62929'}
          inputPlaceholder={locales('titles.price')}
          value={price}
          setValue={setPrice}
          keyboardType={'numeric'}
        />
        <View
          style={{
            display: errorDisplay5 ? 'flex' : 'none',
            flexDirection: 'row',
            gap: 4,
            marginVertical: 4,
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
            {locales('titles.thisFieldCanNotBeEmpty')}
          </Text>
        </View>
        <FlotableInput
          borderColor={!errorDisplay6 ? '' : '#E62929'}
          inputPlaceholder={locales('titles.quantity')}
          value={quantity}
          setValue={setQuantity}
          keyboardType={'numeric'}
        />
        <View
          style={{
            display: errorDisplay6 ? 'flex' : 'none',
            flexDirection: 'row',
            gap: 4,
            marginVertical: 4,
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
            {locales('titles.thisFieldCanNotBeEmpty')}
          </Text>
        </View>
        <FlotableInput
          inputPlaceholder={locales('titles.total')}
          value={total ? total.toLocaleString() : '0'}
          setValue={setTotal}
          keyboardType={'numeric'}
          editable={false}
          inputStyle={{borderColor: '#d3d3d3'}}
        />
      </View>
      <CustomBtn
        onPress={handleAddProduct}
        btnStyle={true}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginHorizontal: 16,
          marginTop: 24,
        }}
        children={<AddProductIcon fill={'#fff'} />}
        title={locales('titles.add')}
      />
    </RBSheet>
  );

  const shareOptions = {
    title: 'Share via',
    message: '',
    url: imgUri,
    social: Share.Social.TELEGRAM,
    filename: 'Invoice', // only for base64 file in Android
  };

  const handleShare = async () => {
    await viewShotRef?.current.capture().then(uri => {
      setImgUri(uri);
    });

    const isAllowed =
      await permissions.requestWriteToExternalStoragePermission();

    if (!isAllowed) return;

    Share.shareSingle(shareOptions)
      .then(res => {})
      .catch(err => {});
    setInvoiceModalVisibility(false);
  };

  const invoiceModal = () => (
    <Modal
      visible={invoiceModalVisibility}
      onDismiss={handleBackButton}
      animationType="fade"
      onRequestClose={handleBackButton}>
      <View
        style={{
          backgroundColor: '#0B1596',
          padding: 16,
          flexDirection: 'row',
          gap: 16,
        }}>
        <BackIcon onPress={handleBackButton} />
        <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
          {locales('titles.invoice')}
        </Text>
      </View>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <ViewShot
          ref={viewShotRef}
          options={{fileName: 'Invoice', format: 'png', quality: 1}}>
          <View style={{backgroundColor: '#fff', padding: 16}}>
            <View style={styles.customerInfo}>
              <View style={{flexDirection: 'row', gap: 16}}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                  <PeopleIcon />
                  <Text style={styles.customerNameText}>{customerName}</Text>
                </View>

                <Text style={styles.dateText}>
                  {moment.unix(date).format('MMM DD')}
                </Text>
              </View>

              <Text
                style={[
                  styles.debtDemanText,
                  {color: switchBtnStyle ? '#FF4141' : '#00CF82'},
                ]}>
                {switchBtnStyle ? 'Debt' : 'Demand'}
              </Text>
            </View>

            <View
              style={[
                styles.table,
                {display: products.length > 0 ? 'flex' : 'none'},
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 16,
                  borderBottomColor: '#DEDEDE',
                  borderBottomWidth: 1,
                  backgroundColor: '#0B1596',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}>
                <Text style={[styles.headerTable, {color: '#fff'}]}>
                  {locales('titles.item')}
                </Text>
                <Text style={[styles.headerTable, {color: '#fff'}]}>
                  {locales('titles.quantity')}
                </Text>
                <Text style={[styles.headerTable, {color: '#fff'}]}>
                  {' '}
                  {locales('titles.price')}{' '}
                </Text>
                <Text style={[styles.headerTable, {color: '#fff'}]}>
                  {' '}
                  {locales('titles.total')}{' '}
                </Text>
              </View>
              <FlatList data={products} renderItem={renderItem} />
            </View>

            <View style={styles.totalView}>
              <Text style={styles.totalText}>{locales('titles.total')} :</Text>
              <Text style={styles.totalAmountText}>
                {totalAmount ? totalAmount.toLocaleString() : 0}
              </Text>
            </View>
          </View>
        </ViewShot>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 32,
            marginHorizontal: 16,
            gap: 16,
          }}>
          <Pressable
            onPress={handleShare}
            style={{
              paddingVertical: 16,
              alignItems: 'center',
              borderRadius: 8,
              backgroundColor: '#fff',
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#0B1596',
              }}>
              {locales('titles.share')}
            </Text>
          </Pressable>
          <CustomBtn
            btnStyle={true}
            style={{flex: 1}}
            onPress={handleSaveBtn}
            title={locales('titles.save')}
          />
        </View>
      </ScrollView>
    </Modal>
  );
  const handleSaveBtn = () => {
    setResult(totalAmount);
    navigation.goBack();
  };

  const handleBackButton = () => {
    setInvoiceModalVisibility(false);
  };

  let options = {
    html: `<div
    style="
      border: 3px solid #e9e9e9;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      padding: 16px;
    "
  >
    <div style="display: flex; gap: 16px">
      <div style="display: flex; align-items: center; gap: 4px">
        <span class="icon"><i class="people-icon"></i></span>
        <span class="customer-name">${customerName}</span>
      </div>
      <span class="date-text">${moment.unix(date).format('MMM DD')}</span>
    </div>
    <span style="color: $ {switchbtnstyle?'#ff4141': '#00CF82'}"
      >${switchBtnStyle ? 'Debt' : 'Demand'}</span
    >
  </div>
  
  <div
    class="table"
    style="border-color: #dedede;
      border-width: 1px;
      border-radius: 8px;
      margin-top: 32px;
     "

  >
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding: 16px;
        background-color: #0b1596;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      "
    >
      <span style="font-size: 12px; font-weight: 500; color: #fff">Item</span>
      <span style="font-size: 12px; font-weight: 500; color: #fff">Quantity</span>
      <span style="font-size: 12px; font-weight: 500; color: #fff">Price</span>
      <span style="font-size: 12px; font-weight: 500; color: #fff">Total</span>
    </div>
    ${products.map(
      (item, index) => `
    <div style="display: flex;
                justify-content: space-between;
                padding: 16px;
                background-color: ${index % 2 === 0 ? '#dedede' : '#FFFFFF'}">
      <span style="font-size: 12px; font-weight: 500; color: #17191C">${
        item.item
      }</span>
      <span style="font-size: 12px; font-weight: 500; color: #17191C">${
        item.quantity
      }</span>
      <span style="font-size: 12px; font-weight: 500; color: #17191C">${
        item.price
      }</span>
      <span style="font-size: 12px; font-weight: 500; color: #17191C">${
        item.total
      }</span>
    </div>`,
    )}
  </div>
  <div
    style="
      margin-top: 32px;
      display: flex;
      justify-content: space-between;
      padding: 16px;
    "
  >
    <span style="font-weight: 400; font-size: 14px; color: #656565">Total:</span>
    <span style="font-size: 14px; font-weight: 700; color: #17191c"
      >${totalAmount ? totalAmount.toLocaleString() : 0}</span
    >
  </div>
  `,
    fileName: 'Invoice',
    directory: 'Download',
  };

  const createInvoice = async () => {
    if (products.length === 0) {
      setErrorDisplay3(true);
      return;
    }
    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    setInvoiceModalVisibility(true);
  };

  useEffect(() => {
    if (products.length !== 0) {
      setErrorDisplay3(false);
    }
  }, [products]);
  useEffect(() => {
    if (productName) {
      setErrorDisplay4(false);
    }
    if (price) {
      setErrorDisplay5(false);
    }
    if (quantity) {
      setErrorDisplay6(false);
    }
  }, [productName, price, quantity]);

  return (
    <>
      {deleteProductModal()}
      {addProductSheet()}
      {invoiceModal()}
      <ScrollView
        style={{backgroundColor: '#fff'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View>
            <View style={{backgroundColor: '#fff', padding: 16}}>
              <View style={styles.customerInfo}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                    <PeopleIcon />
                    <Text style={styles.customerNameText}>
                      {customerList.name}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.customerNameText,
                      {fontSize: 12, color: '#656565'},
                    ]}>
                    {bookCashList.title}
                  </Text>
                </View>

                <Text>|</Text>

                <Text style={styles.dateText}>
                  {moment.unix(date).format('MMM DD')}
                </Text>
                <Text>|</Text>

                <Text
                  style={[
                    styles.debtDemanText,
                    {color: switchBtnStyle ? '#FF4141' : '#00CF82'},
                  ]}>
                  {switchBtnStyle ? 'Debt' : 'Demand'}
                </Text>
              </View>
            </View>

            <DateTimePickerModal
              mode={calendarType}
              isVisible={isDatePickerVisible}
              onConfirm={calendarDate =>
                handleConfirm(calendarDate, calendarType)
              }
              onCancel={_ => setDatePickerVisibility(false)}
            />

            <View
              style={[
                styles.table,
                {display: products.length > 0 ? 'flex' : 'none'},
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 16,
                  borderBottomColor: '#DEDEDE',
                  borderBottomWidth: 1,
                }}>
                <Text style={styles.headerTable}>{locales('titles.item')}</Text>
                <Text style={styles.headerTable}>
                  {locales('titles.quantity')}
                </Text>
                <Text style={styles.headerTable}>
                  {' '}
                  {locales('titles.price')}{' '}
                </Text>
                <Text style={styles.headerTable}>
                  {' '}
                  {locales('titles.total')}{' '}
                </Text>
                <DeleteImageIcon size={18} fill={'transparent'} />
              </View>
              <FlatList data={products} renderItem={renderItem} />
            </View>

            <Pressable
              onPress={() => {
                addProductSheetRef.current.open();
              }}
              style={[
                styles.addProduct,
                {
                  borderColor: errorDisplay3 ? '#E62929' : '#0B1596',
                },
              ]}>
              <AddProductIcon fill={errorDisplay3 ? '#E62929' : '#0B1596'} />
              <Text
                style={[
                  styles.addProductText,
                  {
                    color: errorDisplay3 ? '#E62929' : '#0B1596',
                  },
                ]}>
                {locales('titles.addProduct')}
              </Text>
            </Pressable>
            <View
              style={{
                display: errorDisplay3 ? 'flex' : 'none',
                flexDirection: 'row',
                gap: 4,
                marginVertical: 4,
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
                {locales('titles.addAProductFirst')}
              </Text>
            </View>

            <View style={styles.totalView}>
              <Text style={styles.totalText}>{locales('titles.total')} :</Text>
              <Text style={styles.totalAmountText}>
                {totalAmount ? totalAmount.toLocaleString() : 0}
              </Text>
            </View>
          </View>

          <CustomBtn
            onPress={createInvoice}
            btnStyle={true}
            style={{marginTop: 32}}
            title={locales('titles.createInvoice')}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  ddBtn: {
    borderColor: '#c2c2c2',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  givenText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255, 35, 35, 1)',
  },
  dbtn: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    gap: 8,
    justifyContent: 'center',
  },
  addProduct: {
    borderColor: '#0B1596',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 32,
    flexDirection: 'row',
    gap: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  addProductText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: '#0B1596',
  },
  totalView: {
    borderColor: '#0B1596',
    borderBottomWidth: 1,
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  totalText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#656565',
  },
  totalAmountText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#17191c',
  },
  table: {
    borderColor: '#DEDEDE',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 32,
  },
  headerTable: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginRight: 16,
  },
  searchPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bookCashesModalcontainer: {
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
  customerInfo: {
    borderWidth: 3,
    borderColor: '#e9e9e9',
    borderRadius: 8,
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  customerNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0B1596',
  },
  dateText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#656565',
  },
  debtDemanText: {
    fontWeight: '500',
    fontSize: 14,
  },
  deleteProductModalcontainer: {
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
});

export default SingleInvoice;
