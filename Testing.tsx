import {
  View,
  Text,
  useColorScheme,
  StatusBar,
  Alert,
  Button,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Testing = ({age, onPress}: {age: number; onPress?: () => void}) => {
  useEffect(() => {
    return () => {
      console.log('Age:', age);
    };
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [Count, setCount] = React.useState(30);

  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  const [visiblity, setVisiblity] = React.useState(false);

  const handleUpdate = () => {
    setTimeout(() => {
      setVisiblity(!visiblity);
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateTime();
      updateCount();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateCount = () => {
    setCount(prevCount => {
      const newCount = prevCount != 0 ? prevCount - 1 : 0;
      if (newCount === 0) {
        Alert.alert('30 Seconds are over', 'Resetting the counter');
        setCount(30);
      }
      return newCount;
    });
  };

  const updateTime = () => {
    setTime(new Date().toLocaleTimeString());
  };

  return (
    <View
      style={{
        ...backgroundStyle,
        flex: 1,
        padding: 20,
        rowGap: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Text>App</Text>

      <Text accessibilityLabel="CheckText">Checking queries</Text>

      <Text>Test</Text>

      <Text>Find By</Text>

      <Text testID="Count">{Count}</Text>

      <Text>TIme: {time}</Text>

      <Text testID="age">Age: {age ?? 20}</Text>

      <Button title="Click me" testID="button" onPress={handleUpdate} />

      {visiblity && <Text testID="visibility">Visible</Text>}

      <Button title="Click me" testID="button1" onPress={onPress} />
    </View>
  );
};

export default Testing;
