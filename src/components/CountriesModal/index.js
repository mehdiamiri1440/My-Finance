import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  Image,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import SearchIcon from '../../assets/svgs/SearchIcon';
import {homeStyles} from '../../screens/Home/index.style';
import {useContext} from 'react';
import {contextsStore} from '../../contexts';
import {countriesApi} from '../../utils/countriesApi';

function Countries({navigation}) {
  const {countryItems, setCountryItems} = useContext(contextsStore);
  const [countriesData, setCountriesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCountriesData(countriesApi);
  }, []);

  const ITEM_HEIGHT = 30;
  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const handleSearchQuery = query => {
    setSearchQuery(query);
    const filter = countriesApi.filter(item =>
      item.name.common.toString().toLowerCase().includes(query.toLowerCase()),
    );
    setCountriesData(filter);
  };

  return (
    <KeyboardAvoidingView behavior={'height'}>
      <TouchableWithoutFeedback
        onPress={
          (Keyboard.dismiss,
          () => {
            navigation.goBack();
          })
        }>
        <View
          style={{
            paddingHorizontal: 37,
            paddingTop: 100,
            paddingBottom: 50,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: ' rgba(1, 2, 13, 0.2)',
          }}>
          <View
            style={{
              padding: 24,
              backgroundColor: '#fff',
              borderRadius: 8,
              elevation: 1,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={homeStyles.searchInput}>
                <TextInput
                  onChangeText={handleSearchQuery}
                  value={searchQuery}
                  inputMode="search"
                  style={{
                    color: '#01020D',
                  }}
                  // onChangeText={handleSearchQuery}
                  // value={searchQuery}
                  placeholder="Search your country"
                />
                <SearchIcon />
              </View>
            </View>
            <FlatList
              keyboardShouldPersistTaps="handled"
              initialNumToRender={10}
              maxToRenderPerBatch={5}
              windowSize={10}
              getItemLayout={getItemLayout}
              showsVerticalScrollIndicator={false}
              data={countriesData}
              renderItem={({item, index}) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.goBack();
                    if (index === 191) {
                      setCountryItems({
                        code: item.idd.root,
                        image: item.flags.png,
                      });
                    } else {
                      setCountryItems({
                        code: item.idd.root + item.idd.suffixes[0],
                        image: item.flags.png,
                      });
                    }
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 16,
                    }}>
                    <Image
                      style={{width: 23, height: 15}}
                      source={{
                        uri: item.flags.png,
                      }}
                    />
                    {index === 191 ? (
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#17191C',
                          marginHorizontal: 8,
                        }}>
                        {item.idd.root}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#17191C',
                          marginHorizontal: 8,
                        }}>
                        {item.idd.root}
                        {item?.idd?.suffixes}
                      </Text>
                    )}

                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '400',
                        color: '#9b9b9b',
                      }}>
                      {item.name.common}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Countries;
