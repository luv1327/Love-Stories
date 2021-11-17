import React, {useContext} from 'react';
import {StyleSheet, Text, Button, Image} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import styled from 'styled-components';
export default function Story({item, navigation}) {
  const {firestoreUser} = useContext(AuthContext);
  const {body, title, comments, key, likes, types, user, date, likedUsers} =
    item;

  function readingTime() {
    const wpm = 200;
    const words = body.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
  }

  return (
    <StoryContainer style={styles.container}>
      <Text> {user.username} </Text>
      <Text> {title} </Text>
      <Text> {body} </Text>
      <Text> {likedUsers.length} </Text>
      <Text> {types} </Text>
      <Text>{date.toString()}</Text>
      <Text> {readingTime()} Min - Read </Text>
      <Image
        style={{
          width: 100,
          height: 100,
          borderWidth: 1,
          borderColor: 'red',
          margin: 10,
        }}
        source={{
          uri:
            user.image != '' ? user.image : 'https://i.imgur.com/7yUwK8Y.png',
        }}
      />
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
    </StoryContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
});

const StoryContainer = styled.View`
  border: 1px solid black;
  width: 100%;
  height: 300px;
  margin-top: 10px;
`;
