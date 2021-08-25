import * as React from 'react';
import {View, Text} from 'react-native';

export default function Comment({username, comment}) {
  return (
    <View>
      <Text> {username} </Text>
      <Text> {comment} </Text>
    </View>
  );
}
