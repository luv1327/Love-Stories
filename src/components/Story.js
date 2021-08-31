import React, {useContext} from 'react';
import {StyleSheet, Text, SafeAreaView, Button} from 'react-native';
import {AuthContext} from '../context/AuthContext';
export default function Story({item, navigation}) {
  const {firestoreUser} = useContext(AuthContext);
  const {body, title, comments, key, likes, types, user, date, likedUsers} =
    item;
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
            likedUsers,
            firestoreUser,
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
