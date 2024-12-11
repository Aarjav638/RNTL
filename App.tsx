import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Testing from './Testing';
import Calculator from './Calculator';

const Components = [
  {
    name: 'RNTL',
    component: <Testing age={20} />,
  },
  {
    name: 'Calculator',
    component: <Calculator />,
  },
];

const App = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>('');
  return (
    <View style={styles.container}>
      {selectedValue ? (
        Components.find(component => component.name === selectedValue)
          ?.component
      ) : (
        <>
          <Text>Choose a component</Text>
          {Components.map(component => (
            <Button
              key={component.name}
              title={component.name}
              onPress={() => setSelectedValue(component.name)}
            />
          ))}
        </>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        padding:20
    }
});
