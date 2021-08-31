import React, {useState, createRef, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FlatList, Text, View, TextInput, Pressable, Alert} from 'react-native';
import Comment from './Comment';
import Liked from './Liked';

export default function Reading({route}) {
  const [newComment, setNewComment] = useState('');
  const [updatedComments, setUpdatedComments] = useState([]);
  const [updatedLikes, setUpdatedLikes] = useState(0);
  const {body, title, likes, types, user, key, likedUsers, firestoreUser} =
    route.params === undefined ? '' : route.params;
  const myTextInput = createRef();
  useEffect(() => {
    firestore()
      .collection('Stories')
      .doc(key)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUpdatedComments(documentSnapshot.data().comments);
        }
      });

    firestore()
      .collection('Stories')
      .doc(key)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUpdatedLikes(documentSnapshot.data().likedUsers.length);
        }
      });

    // Stop listening for updates when no longer required
  }, [key]);

  const addComment = async () => {
    try {
      if (newComment.length > 0) {
        myTextInput.current.clear();
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
            setNewComment('');
          })
          .catch(err => console.log(err));
      } else {
        Alert.alert('Comment Error', 'Comments Cannot Be Empty');
      }
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
          <Liked
            user={user}
            id={key}
            likes={likes}
            likedUsers={likedUsers}
            firestoreUser={firestoreUser}
          />
          <Text> {updatedLikes} </Text>
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
          <Pressable onPress={addComment}>
            <Text> Add </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
