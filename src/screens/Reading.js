import React, {useState, createRef, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FlatList, Text, View, TextInput, Pressable} from 'react-native';
import Comment from './Comment';

export default function Reading({route}) {
  const [newComment, setNewComment] = useState('');
  const [updatedComments, setUpdatedComments] = useState([]);
  const {body, title, likes, types, user, key} =
    route.params === undefined ? '' : route.params;

  useEffect(() => {
    const response = firestore()
      .collection('Stories')
      .doc(key)
      .onSnapshot(documentSnapshot => {
        setUpdatedComments(documentSnapshot.data().comments);
      });

    // Stop listening for updates when no longer required
    return () => response();
  }, [key]);

  const myTextInput = createRef();
  const addComment = async () => {
    try {
      await firestore()
        .collection('Stories')
        .doc(key)
        .update({
          // Update Stories Array
          comments: firestore.FieldValue.arrayUnion({
            username: user.username,
            comment: newComment,
          }),
        })
        .then(() => {
          console.log('Comment Added Successfully');
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = ({item}) => (
    <Comment username={item.username} comment={item.comment} />
  );

  return (
    <View>
      {route.params === undefined ? (
        <Text> You Were Not Reading Anything </Text>
      ) : (
        <View>
          <Text> {body} </Text>
          <Text> {title} </Text>
          <Text> {likes} </Text>
          <Text> {user.username} </Text>
          <FlatList
            data={types}
            renderItem={({item}) => (
              <View>
                <Text> {item} </Text>
              </View>
            )}
            keyExtractor={item => item}
          />
          <Text> Comments </Text>
          <FlatList
            data={updatedComments}
            renderItem={renderItem}
            keyExtractor={item => item.comment}
          />
          <TextInput
            placeholder="What You Think About This Story?"
            onChangeText={newComment => setNewComment(newComment)}
            ref={myTextInput}
          />
          <Pressable
            disabled={newComment.length > 0 ? false : true}
            onPress={addComment}>
            <Text> Add </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
