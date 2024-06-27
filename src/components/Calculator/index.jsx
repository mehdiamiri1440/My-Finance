import * as React from 'react';
import Button from './Button';
import {View, Text} from 'react-native';
import {Styles} from './MainStyles';
import {contextsStore} from '../../contexts/index';

export default function Keypad() {
  const {
    result,
    setResult,
    firstNumber,
    setFirstNumber,
    secondNumber,
    setSecondNumber,
    operation,
    setOperation,
  } = React.useContext(contextsStore);

  const handleNumberPress = buttonValue => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = buttonValue => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber('');
  };

  const clear = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperation('');
    setResult('');
  };

  const getResult = () => {
    switch (operation) {
      case '+':
        clear();
        var result1 = parseFloat(secondNumber) + parseFloat(firstNumber);
        setResult(result1);
        setFirstNumber('' + result1);
        setResult('');
        break;
      case '-':
        clear();
        var result = parseFloat(secondNumber) - parseFloat(firstNumber);
        setResult(result);
        setFirstNumber('' + result);
        setResult('');
        break;
      case '*':
        clear();
        var result = parseFloat(secondNumber) * parseFloat(firstNumber);
        setResult(result);
        setFirstNumber('' + result);
        setResult('');
        break;
      case '/':
        clear();
        var result = parseFloat(secondNumber) / parseFloat(firstNumber);
        setResult(result);
        setFirstNumber('' + result);
        setResult('');
        break;
      case '^':
        clear();
        var result = Math.pow(parseInt(secondNumber), parseInt(firstNumber));
        setResult(result);
        setFirstNumber('' + result);
        setResult('');
        break;

      case '%':
        clear();
        var result = (parseFloat(secondNumber) * parseFloat(firstNumber)) / 100;
        setResult(result);
        setFirstNumber('' + result);
        setResult('');
        break;
    }
  };

  return (
    <View style={Styles.viewBottom}>
      <View style={Styles.row}>
        <Button title="AC" isGray onPress={clear} />
        <Button title="^" isGray onPress={() => handleOperationPress('^')} />
        <Button title="%" isGray onPress={() => handleOperationPress('%')} />
        <Button title="÷" isBlue onPress={() => handleOperationPress('/')} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress('7')} />
        <Button title="8" onPress={() => handleNumberPress('8')} />
        <Button title="9" onPress={() => handleNumberPress('9')} />
        <Button title="x" isBlue onPress={() => handleOperationPress('*')} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress('4')} />
        <Button title="5" onPress={() => handleNumberPress('5')} />
        <Button title="6" onPress={() => handleNumberPress('6')} />
        <Button title="-" isBlue onPress={() => handleOperationPress('-')} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress('1')} />
        <Button title="2" onPress={() => handleNumberPress('2')} />
        <Button title="3" onPress={() => handleNumberPress('3')} />
        <Button title="+" isBlue onPress={() => handleOperationPress('+')} />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleNumberPress('.')} />
        <Button title="0" onPress={() => handleNumberPress('0')} />
        <Button
          title="Del"
          onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
        />
        <Button title="=" isBlue onPress={() => getResult()} />
      </View>
    </View>
  );
}
