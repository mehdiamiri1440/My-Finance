import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {contextsStore} from '../../contexts';
import Collapsible from 'react-native-collapsible';
import ArrowUpIcon from '../../assets/svgs/ArrowUpIcon';
import ArrowDownIcon from '../../assets/svgs/ArrowDownIcon';

function FAQ({navigation}) {
  const {setTabBarBottom} = useContext(contextsStore);
  const [collapsed, setCollapsed] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  const [collapsed4, setCollapsed4] = useState(true);
  const [collapsed5, setCollapsed5] = useState(true);
  const [collapsed6, setCollapsed6] = useState(true);

  const FaqData = [
    {
      question:
        'Egestas dignissim odio viverra mauris  tempor consectetur urna?',
      answer: 'Massa varius sed convallis commodo commodo vel.',
    },
    {
      question: 'Blandit at pellentesque a nunc?',
      answer: 'Massa varius sed convallis commodo commodo vel.',
    },
    {
      question:
        ' Nullam lacus pellentesque sed  eu viverra nulla lacus nulla et?',
      answer: 'Massa varius sed convallis commodo commodo vel.',
    },
    {
      question: 'Suspendisse viverra iaculis  lectus senectus?',
      answer: 'Massa varius sed convallis commodo commodo vel.',
    },
    {
      question:
        ' Pretium lacinia a vulputate accumsan tortor suspendisse sem dui sem?',
      answer: 'Massa varius sed convallis commodo commodo vel.',
    },
    {
      question: 'At bibendum ultrices elit id?',
      answer: 'Massa varius sed convallis commodo commodo vel.',
    },
  ];
  useEffect(() => {
    navigation.addListener('focus', () => {
      setTabBarBottom(false);
    });
  }, [navigation]);

  const handleAskedQuestion = () => {};

  return (
    <ScrollView
      style={styles.continer}
      contentContainerStyle={{justifyContent: 'space-between'}}>
      <View style={styles.faq}>
        <TouchableWithoutFeedback
          onPress={() => {
            setCollapsed(!collapsed);
          }}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={[
                  styles.mainText,
                  {
                    fontWeight: collapsed ? '400' : '500',
                    color: collapsed ? '#01020D' : '#0B1596',
                  },
                ]}>
                Egestas dignissim odio viverra mauris{'\n'} tempor consectetur
                urna?
              </Text>
              <ArrowUpIcon style={{display: collapsed ? 'none' : 'flex'}} />
              <ArrowDownIcon style={{display: collapsed ? 'flex' : 'none'}} />
            </View>

            <Collapsible collapsed={collapsed} align="center">
              <Text style={styles.collapsText}>
                Massa varius sed convallis commodo commodo vel.
              </Text>
            </Collapsible>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.line}></View>
        <TouchableWithoutFeedback
          onPress={() => {
            setCollapsed2(!collapsed2);
          }}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={[
                  styles.mainText,
                  {
                    fontWeight: collapsed2 ? '400' : '500',
                    color: collapsed2 ? '#01020D' : '#0B1596',
                  },
                ]}>
                Blandit at pellentesque a nunc?
              </Text>
              <ArrowUpIcon style={{display: collapsed2 ? 'none' : 'flex'}} />
              <ArrowDownIcon style={{display: collapsed2 ? 'flex' : 'none'}} />
            </View>

            <Collapsible collapsed={collapsed2} align="center">
              <Text style={styles.collapsText}>
                Massa varius sed convallis commodo commodo vel.
              </Text>
            </Collapsible>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.line}></View>
        <TouchableWithoutFeedback
          onPress={() => {
            setCollapsed3(!collapsed3);
          }}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={[
                  styles.mainText,
                  {
                    fontWeight: collapsed3 ? '400' : '500',
                    color: collapsed3 ? '#01020D' : '#0B1596',
                  },
                ]}>
                Nullam lacus pellentesque sed {'\n'} eu viverra nulla lacus
                nulla et?
              </Text>
              <ArrowUpIcon style={{display: collapsed3 ? 'none' : 'flex'}} />
              <ArrowDownIcon style={{display: collapsed3 ? 'flex' : 'none'}} />
            </View>

            <Collapsible collapsed={collapsed3} align="center">
              <Text style={styles.collapsText}>
                Massa varius sed convallis commodo commodo vel.
              </Text>
            </Collapsible>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.line}></View>
        <TouchableWithoutFeedback
          onPress={() => {
            setCollapsed4(!collapsed4);
          }}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={[
                  styles.mainText,
                  {
                    fontWeight: collapsed4 ? '400' : '500',
                    color: collapsed4 ? '#01020D' : '#0B1596',
                  },
                ]}>
                Suspendisse viverra iaculis {'\n'} lectus senectus?
              </Text>
              <ArrowUpIcon style={{display: collapsed4 ? 'none' : 'flex'}} />
              <ArrowDownIcon style={{display: collapsed4 ? 'flex' : 'none'}} />
            </View>

            <Collapsible collapsed={collapsed4} align="center">
              <Text style={styles.collapsText}>
                Massa varius sed convallis commodo commodo vel.
              </Text>
            </Collapsible>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.line}></View>
        <TouchableWithoutFeedback
          onPress={() => {
            setCollapsed5(!collapsed5);
          }}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={[
                  styles.mainText,
                  {
                    fontWeight: collapsed5 ? '400' : '500',
                    color: collapsed5 ? '#01020D' : '#0B1596',
                  },
                ]}>
                Pretium lacinia a vulputate accumsan {'\n'} tortor suspendisse
                sem dui sem?
              </Text>
              <ArrowUpIcon style={{display: collapsed5 ? 'none' : 'flex'}} />
              <ArrowDownIcon style={{display: collapsed5 ? 'flex' : 'none'}} />
            </View>

            <Collapsible collapsed={collapsed5} align="center">
              <Text style={styles.collapsText}>
                Massa varius sed convallis commodo commodo vel.
              </Text>
            </Collapsible>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.line}></View>
        <TouchableWithoutFeedback
          onPress={() => {
            setCollapsed6(!collapsed6);
          }}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={[
                  styles.mainText,
                  {
                    fontWeight: collapsed6 ? '400' : '500',
                    color: collapsed6 ? '#01020D' : '#0B1596',
                  },
                ]}>
                At bibendum ultrices elit id?
              </Text>
              <ArrowUpIcon style={{display: collapsed6 ? 'none' : 'flex'}} />
              <ArrowDownIcon style={{display: collapsed6 ? 'flex' : 'none'}} />
            </View>

            <Collapsible collapsed={collapsed6} align="center">
              <Text style={styles.collapsText}>
                Massa varius sed convallis commodo commodo vel.
              </Text>
            </Collapsible>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <TouchableOpacity
        onPress={handleAskedQuestion}
        style={{
          backgroundColor: '#0B1596',
          paddingVertical: 16,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 8,
          flexDirection: 'row',
          marginTop: 16,
          marginBottom: 16,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
          }}>
            {locales('titles.askQuestion')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  continer: {
    backgroundColor: '#fff',
    maxHeight: '100%',
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  faq: {
    marginTop: 16,
    backgroundColor: '#FFF',
    padding: 16,
    elevation: 2,
    borderRadius: 8,
  },
  mainText: {
    color: '#0B1596',
    fontSize: 16,
    fontWeight: '500',
  },
  collapsText: {
    color: '#01020D',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  line: {
    backgroundColor: '#D9D9D9',
    height: 1,
    marginVertical: 16,
  },
});
export default FAQ;
