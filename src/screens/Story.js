import React from 'react';
import {StyleSheet, Text, SafeAreaView, Button} from 'react-native';
export default function Story({item, navigation}) {
  const {body, title, comments, key, likes, types, user, date} = item;
  return (
    <SafeAreaView style={styles.container}>
      <Text> {item.body} </Text>
      <Button
        title="Show More"
        onPress={() =>
          navigation.navigate('Reading', {
            body,
            title,
            comments,
            key,
            likes,
            types,
            user,
            date,
          })
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
});
