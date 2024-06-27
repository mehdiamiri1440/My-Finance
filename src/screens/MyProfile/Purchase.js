import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {contextsStore} from '../../contexts';
import ArrowRightIcon from '../../assets/svgs/ArrowRightIcon';
import MoneyIcon from '../../assets/svgs/MoneyIcon';
import SecureIcon from '../../assets/svgs/SecureIcon';
import FaqIcon from '../../assets/svgs/FaqIcon';

function Purchase({navigation}) {
  const {setTabBarBottom} = useContext(contextsStore);
  const [renderTime, setRenderTime] = useState(null);

  useEffect(() => {
    const startTime = Date.now();
    setRenderTime(null);

    requestAnimationFrame(() => {
      const endTime = Date.now();
      setRenderTime(endTime - startTime);
    });
  }, []);
  useEffect(() => {
    navigation.addListener('focus', () => {
      setTabBarBottom(false);
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Text style={styles.cardHeaaderText}>One Month</Text>
          <Text style={styles.cardPrice}>€12</Text>
        </View>
        <View style={styles.svg}>
          <ArrowRightIcon fill="#0B1596" />
        </View>
      </View>
      <View style={styles.card}>
        <View>
          <View style={styles.rowDir}>
            <Text style={styles.cardHeaaderText}>6 Month</Text>
            <Text style={[styles.discount, styles.discountText]}>25%</Text>
          </View>
          <View style={styles.rowDir}>
            <Text style={styles.cardPrice}>€50</Text>
            <Text style={styles.oldPrice}>€144</Text>
          </View>
          <Text style={styles.monthNum}>€12 per month</Text>
        </View>
        <View style={styles.svg}>
          <ArrowRightIcon fill="#0B1596" />
        </View>
      </View>
      <View style={styles.card}>
        <View>
          <View style={styles.rowDir}>
            <Text style={styles.cardHeaaderText}>12 Month</Text>
            <Text style={[styles.discount, styles.discountText]}>25%</Text>
          </View>
          <View style={styles.rowDir}>
            <Text style={styles.cardPrice}>€100</Text>
            <Text style={styles.oldPrice}>€144</Text>
          </View>
          <Text style={styles.monthNum}>€12 per month</Text>
        </View>
        <View style={styles.svg}>
          <ArrowRightIcon fill="#0B1596" />
        </View>
      </View>

      <View style={styles.secondView}>
        <View>
          <View style={[styles.rowDir, {marginBottom: 16}]}>
            <View style={styles.iconView}>
              <MoneyIcon />
            </View>
            <Text style={styles.cardHeaaderText}>Money Back Guarantee</Text>
          </View>
          <Text style={styles.subText}>
            Nunc viverra convallis aliquet porttitor ornare vel adipiscing.
          </Text>
        </View>
        <View style={styles.line}></View>
        <View>
          <View style={[styles.rowDir, {marginBottom: 16}]}>
            <View style={styles.iconView}>
              <SecureIcon />
            </View>
            <Text style={styles.cardHeaaderText}>Secure Payment Gateway</Text>
          </View>
          <Text style={styles.subText}>
            Placerat sit urna ac sapien donec amet ut lectus.
          </Text>
        </View>
        <View style={styles.line}></View>
        <View>
          <View style={[styles.rowDir, {marginBottom: 16}]}>
            <View style={styles.iconView}>
              <FaqIcon fill={'#0B9FF2'} />
            </View>
            <Text style={styles.cardHeaaderText}>
              Frequently Asked Questions
            </Text>
          </View>
          <Text style={styles.subText}>
            Molestie dui quis purus et quisque tempor cursus.
          </Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: '100%',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardHeaaderText: {
    color: '#01020D',
    fontWeight: '500',
    fontSize: 16,
  },
  cardPrice: {
    color: '#0B1596',
    fontWeight: '700',
    fontSize: 18,
  },
  discount: {
    padding: 6,
    backgroundColor: '#E62929',
    borderRadius: 8,
    marginLeft: 8,
  },
  discountText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 13,
  },
  oldPrice: {
    color: '#9B9B9B',
    fontWeight: '400',
    fontSize: 14,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  monthNum: {
    color: '#9B9B9B',
    fontSize: 16,
    fontWeight: '500',
  },
  subText: {
    color: '#01020D',
    fontWeight: '400',
    fontSize: 14,
  },
  svg: {
    justifyContent: 'flex-end',
  },
  rowDir: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondView: {
    backgroundColor: '#fff',
    padding: 16,
    elevation: 2,
    borderRadius: 8,
  },
  iconView: {
    backgroundColor: 'rgba(11, 159, 242, 0.09)',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  line: {
    backgroundColor: '#D9D9D9',
    height: 1,
    marginVertical: 16,
  },
});

export default Purchase;
