import React, { useRef, useState, useEffect, useContext } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import DeleteIcon from '../../assets/svgs/DeleteIcon';
import DivideIcon from '../../assets/svgs/DivideIcon';
import MultiplyIcon from '../../assets/svgs/MultiplyIcon';
import PlusCalIcon from '../../assets/svgs/PlusCalIcon';
import MinesIcon from '../../assets/svgs/MinesIcon';
import EqualIcon from '../../assets/svgs/EqualIcon';
import { contextsStore } from '../../contexts';


let deleteinterval


function Calculator({ sheetId, payload }: SheetProps<{ data: string }>) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { result, setResult, expression, setExpression } =
    useContext(contextsStore);
  // const [result, setResult] = useState('0');
  // const [expression, setExpression] = useState('');
  const [isDeleting, setIsDeleting] = useState(false)

  const handleButtonClick = (value: string) => {
    switch (value) {
      case 'C':
        setExpression('');
        setResult('');
        break;
      case '<':
        setExpression(expression.slice(0, -1));
        break;
      case '=':
        try {
          const evalResult = eval(expression);
          setResult(evalResult.toString());
        } catch (error) {
          setResult('Invalid Expression');
        }
        break;
      case 'X':
        setExpression(expression.slice(0, -1));
        break;
      default:
        setExpression(prevExpression => prevExpression + value);
        break;
    }
  };

  const handleDeletePressIn = () => {
    deleteinterval = setInterval(() => {
      setExpression(prevExpression => prevExpression.slice(0, -1));
    }, 200)
  }
  const handleDeletePressOut = () => {
    clearInterval(deleteinterval)
  }

  return (
    <ActionSheet
      closeAnimationConfig={{ bounciness: 0.1 }}
      id={sheetId}
      ref={actionSheetRef}
      containerStyle={{
        height: '58%',
      }}
      indicatorStyle={{
        display: 'none',
      }}
      gestureEnabled={true}>
      <View>
        <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
          <View style={styles.expressionLine}>
            <Text style={styles.expressionLine}>{expression}</Text>
          </View>
          <View style={styles.resultLine}>
            <Text style={styles.resultLine}>{result}</Text>
          </View>
        </View>

        <View
          style={{ backgroundColor: '#D9D9D9', height: 1, width: '100%' }}></View>
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, { marginRight: 16 }]}
              onPress={() => handleButtonClick('C')}>
              <Text style={styles.buttonText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              delayLongPress={2000}
              onLongPress={() => { setExpression('') }}
              onPressIn={handleDeletePressIn}
              onPressOut={handleDeletePressOut}
              style={[styles.button, { marginRight: 16 }]}
              onPress={() => handleButtonClick('<')}>
              <DeleteIcon />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { marginRight: 16 }]}
              onPress={() => handleButtonClick('/')}>
              <DivideIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {}]}
              onPress={() => handleButtonClick('*')}>
              <MultiplyIcon />
            </TouchableOpacity>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{ flex: 3.6 }}>
              <View style={[styles.row, { marginTop: 16 }]}>
                <TouchableOpacity
                  style={[styles.buttonNum, { marginRight: 16 }]}
                  onPress={() => handleButtonClick('7')}>
                  <Text style={styles.btnNumber}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonNum, { marginRight: 16 }]}
                  onPress={() => handleButtonClick('8')}>
                  <Text style={styles.btnNumber}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonNum, { marginRight: 16 }]}
                  onPress={() => handleButtonClick('9')}>
                  <Text style={styles.btnNumber}>9</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.row, { marginTop: 16 }]}>
                <TouchableOpacity
                  style={[styles.buttonNum, { marginRight: 16 }]}
                  onPress={() => handleButtonClick('4')}>
                  <Text style={styles.btnNumber}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonNum, { marginRight: 16 }]}
                  onPress={() => handleButtonClick('5')}>
                  <Text style={styles.btnNumber}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonNum, { marginRight: 16 }]}
                  onPress={() => handleButtonClick('6')}>
                  <Text style={styles.btnNumber}>6</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.row, { marginTop: 16 }]}>
                <TouchableOpacity
                  style={[styles.buttonNum, { marginRight: 16 }]}
                  onPress={() => handleButtonClick('1')}>
                  <Text style={styles.btnNumber}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonNum, { marginRight: 16 }]}
                  onPress={() => handleButtonClick('2')}>
                  <Text style={styles.btnNumber}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonNum, { marginRight: 16 }]}
                  onPress={() => handleButtonClick('3')}>
                  <Text style={styles.btnNumber}>3</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.row, { marginTop: 16 }]}>
                <TouchableOpacity
                  style={[styles.buttonNum, { marginRight: 16 }]}
                  onPress={() => handleButtonClick('0')}>
                  <Text style={styles.btnNumber}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonNum, { marginRight: 16 }]}
                  onPress={() => handleButtonClick('.')}>
                  <Text style={styles.btnNumber}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonNum, { marginRight: 16 }]}
                  onPress={() => handleButtonClick('00')}>
                  <Text style={styles.btnNumber}>00</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 16,
                flex: 1,
              }}>
              <TouchableOpacity
                style={[styles.equal, {}]}
                onPress={() => handleButtonClick('-')}>
                <MinesIcon />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { marginTop: 8 }]}
                onPress={() => handleButtonClick('+')}>
                <PlusCalIcon />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    marginTop: 8,
                    backgroundColor: '#0B1596',
                  },
                ]}
                onPress={() => handleButtonClick('=')}>
                <EqualIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultLine: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'left',
    color: '#01020D',
  },
  expressionLine: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
    color: '#9B9B9B',
  },
  button: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: 'rgba(11, 21, 150, 0.09)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 21,
    fontWeight: '500',
    color: '#0B1596',
  },
  btnNumber: {
    color: '#17191C',
    fontSize: 21,
    fontWeight: '500',
  },
  buttonNum: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  equal: {
    backgroundColor: 'rgba(11, 21, 150, 0.09)',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
  },
});

export default Calculator;
