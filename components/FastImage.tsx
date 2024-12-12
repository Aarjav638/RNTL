import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
interface ImagedataInterface{
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
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: ImagedataInterface;
    index: number;
  }) => {
    return (
      <View>
        <Text style={styles.text}>
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
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={Data}
        keyExtractor={(item, index) => item.email + index}
        estimatedItemSize={250}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ReactFastImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginVertical: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
