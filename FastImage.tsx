import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
type ImagedataInterface = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    thumbnail: string;
    medium: string;
    large: string;
  };
};

const ReactFastImage = () => {
  const [Data, setData] = React.useState<ImagedataInterface[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://randomuser.me/api/?results=500',
      );
      setData(response.data.results);
    };
    fetchData();
  }, []);

  if (Data.length === 0) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }


  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}>
      <FlashList
        data={Data}
        keyExtractor={(item, index) => item.email + index}
        estimatedItemSize={250}
        
        renderItem={({item, index}) => (
          <View>
            <Text style={{fontSize: 20}}>
              {(index + 1).toString() +
                '.' +
                ' ' +
                item.name.first +
                ' ' +
                item.name.last}
            </Text>
            <FastImage
              source={{
                uri: item.picture.large,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
              style={{
                width: 250,
                height: 250,
                marginVertical: 10,
                borderRadius: 10,
              }}
              resizeMode='cover'
            />
          </View>
        )}
        onBlankArea={() =><ActivityIndicator size="large" color="blue" />}
      />
    </View>
  );
};

export default ReactFastImage;

const styles = StyleSheet.create({});
