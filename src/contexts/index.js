import {createContext, useState} from 'react';

export const contextsStore = createContext({
  logIn: [],
  setLogIn: () => {},
  phoneNumber: [],
  setphoneNumber: () => {},
  modalDisplay: [],
  setModalDisplay: () => {},
  customerName: [],
  setCustomerName: () => {},
  customerPhone: [],
  setCustomerPhone: () => {},
  tabBarBottom: [],
  setTabBarBottom: () => {},
  result: [],
  setResult: () => {},
  firstNumber: [],
  setFirstNumber: () => {},
  secondNumber: [],
  setSecondNumber: () => {},
  operation: [],
  setOperation: () => {},
  routeName: [],
  setRouteName: () => {},
  desData: [],
  setDesData: () => {},
  height: [],
  setHeight: () => {},
  total: [],
  setTotal: () => {},
  boxDisplay: [],
  setBoxDisplay: () => {},
  customerID: [],
  setCustomerID: () => {},
  recordStyle: [],
  setRecordStyle: () => {},
  country: [],
  setCountry: () => {},
  countryItems: [],
  setCountryItems: () => {},
  sendCodeStyle: [],
  setSendCodeStyle: () => {},
  filterDisplay: [],
  setFilterDisplay: () => {},
  svgFill: [],
  setSvgFill: () => {},
  expression: [],
  setExpression: () => {},
  imageSrc: [],
  setImageSrc: () => {},
  customerLists: [],
  setCustomerLists: () => {},
  searchResults: [],
  setSearchResults: () => {},
  totalAmount: [],
  setTotalAmount: () => {},
  userName: [],
  setUserName: () => {},
  userPhone: [],
  setUserPhone: () => {},
  userIban: [],
  setUserIban: () => {},
  userPass: [],
  setUserPass: () => {},
  language: [],
  setLanguage: () => {},
  phone: [],
  setPhone: () => {},
  addCustomerModalVisibility: [],
  setAddCustomerModalVisibility: () => {},
});

const ContextsProvider = ({children}) => {
  const [logIn, setLogIn] = useState(true);
  const [phoneNumber, setphoneNumber] = useState('');
  const [modalDisplay, setModalDisplay] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [tabBarBottom, setTabBarBottom] = useState(true);
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [routeName, setRouteName] = useState('');
  const [desData, setDesData] = useState('');
  const [height, setHeight] = useState(true);
  const [total, setTotal] = useState(0);
  const [boxDisplay, setBoxDisplay] = useState(true);
  const [customerID, setCustomerID] = useState('');
  const [recordStyle, setRecordStyle] = useState(true);
  const [country, setCountry] = useState(false);
  const [countryItems, setCountryItems] = useState([]);
  const [sendCodeStyle, setSendCodeStyle] = useState(false);
  const [filterDisplay, setFilterDisplay] = useState(false);
  const [svgFill, setSvgFill] = useState(true);
  const [result, setResult] = useState('0');
  const [expression, setExpression] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [customerLists, setCustomerLists] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');
  const [userName, setUserName] = useState();
  const [userPhone, setUserPhone] = useState();
  const [userIban, setUserIban] = useState();
  const [userPass, setUserPass] = useState('');
  const [language, setLanguage] = useState('');
  const [phone, setPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [addCustomerModalVisibility, setAddCustomerModalVisibility] =
    useState(false);

  return (
    <contextsStore.Provider
      value={{
        logIn,
        setLogIn,
        phoneNumber,
        setphoneNumber,
        modalDisplay,
        setModalDisplay,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        tabBarBottom,
        setTabBarBottom,
        result,
        setResult,
        firstNumber,
        setFirstNumber,
        secondNumber,
        setSecondNumber,
        operation,
        setOperation,
        routeName,
        setRouteName,
        desData,
        setDesData,
        height,
        setHeight,
        total,
        setTotal,
        boxDisplay,
        setBoxDisplay,
        customerID,
        setCustomerID,
        recordStyle,
        setRecordStyle,
        country,
        setCountry,
        countryItems,
        setCountryItems,
        sendCodeStyle,
        setSendCodeStyle,
        filterDisplay,
        setFilterDisplay,
        svgFill,
        setSvgFill,
        expression,
        setExpression,
        imageSrc,
        setImageSrc,
        customerLists,
        setCustomerLists,
        searchResults,
        setSearchResults,
        totalAmount,
        setTotalAmount,
        userName,
        setUserName,
        userPhone,
        setUserPhone,
        userIban,
        setUserIban,
        userPass,
        setUserPass,
        language,
        setLanguage,
        phone,
        setPhone,
        addCustomerModalVisibility,
        setAddCustomerModalVisibility,
      }}>
      {children}
    </contextsStore.Provider>
  );
};
export default ContextsProvider;
