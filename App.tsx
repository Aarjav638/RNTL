import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Testing from './Testing';
import Calculator from './Calculator';
import { FlashList } from '@shopify/flash-list';
import ReactFastImage from './FastImage';

const Components = [
  {
    name: 'RNTL',
    component: <Testing age={20} />,
  },
  {
    name: 'Calculator',
    component: <Calculator />,
  },
  {
    name:'FastImage',
    component:<ReactFastImage />
  }
];

const App = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>('');
  return (
    <View style={styles.container}>
      {selectedValue ? (
        <>
        {Components.find(component => component.name === selectedValue)
          ?.component}
        <Button title="Back" onPress={() => setSelectedValue('')} />
          </>
      ) : (
        <>
          <Text style={{marginVertical:40,fontSize:30,fontWeight:'bold'}}>Choose a component</Text>
          <FlashList
            data={Components}
            keyExtractor={(item,index) => item.name+index}
            estimatedItemSize={40}
            renderItem={({item})=>
                <View style={{
                  marginBottom:10
                }}>
                  <Button
                
                key={item.name}
                title={item.name}
                onPress={() => setSelectedValue(item.name)}
              />
                </View>
            
            }
            />
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
        padding:20,
        justifyContent:'space-between'
    }
});
