import React from 'react';

import NativeCalculator from './specs/NativeCalculator';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';

const Calculator = () => {
  const [result,     setResult] = React.useState(0);
  const [expression, setExpression] = React.useState('');

  const calculate = () => {
    try {
      if (expression.length === 0) {
        throw new Error('Invalid Expression');
      } else {
        if (expression.split('+').some(val => isNaN(parseInt(val)))) {
          throw new Error('Invalid Expression');
        } else {
          const sum = NativeCalculator?.add(
            expression.split('+').map(val => parseInt(val)),
          );
          setResult(sum ?? 0);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid Expression');
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 30,
          alignSelf: 'center',
          marginVertical: '10%',
        }}>
        {' '}
        Turbo Module{' '}
      </Text>
      <Text style={styles.result}>Enter Values To Add seperated by +</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Values"
        onChangeText={text => {
          setExpression(text);
        }}
      />

      {result !== null && <Text style={styles.result}>Result: {result}</Text>}

      <Button
        title="Add"
        onPress={() => {
          calculate();
        }}
      />
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  input: {
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: '10%',
  },
  result: {
    fontSize: 20,
    alignSelf: 'center',
  },
});
