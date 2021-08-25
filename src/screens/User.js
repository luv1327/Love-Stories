import React from 'react';
import {Text, View, Button} from 'react-native';
// import Show from './Show';

export default function User({navigation}) {
  return (
    <View>
      <Text> User Screen </Text>
      <Button
        title="Go to Stories"
        onPress={() => navigation.navigate('Stories')}
      />
    </View>
  );
}
