import React, {useState, useEffect} from 'react';
import {Pressable} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Entypo';

export default function Liked({id, user, likedUsers, firestoreUser}) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (likedUsers.includes(firestoreUser.email)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    return () => setLiked(false);
  }, [id]);
  const handleLike = async () => {
    try {
      setLiked(prevState => !prevState);
      if (liked) {
        await firestore()
          .collection('Stories')
          .doc(id)
          .update({
            likedUsers: firestore.FieldValue.arrayRemove(firestoreUser.email),
          })
          .then(() => {
            console.log('User updated!');
          })
          .catch(err => console.log(err));
      } else {
        await firestore()
          .collection('Stories')
          .doc(id)
          .update({
            likedUsers: firestore.FieldValue.arrayUnion(firestoreUser.email),
          })
          .then(() => {
            console.log(user.id);
          })
          .catch(err => console.log(err));
      }
      // when liked push the id and username to stories liked array
      // and push the story id to the users liked arrayUnion
      // increase the number of likes and also decrease the numbe when disliked
      //create a state to check if its liked or not

      // when disliked remove the id and username from the stories liked array
      // and remove the story id from the users liked array
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Pressable onPress={handleLike}>
      {liked ? (
        <Icon name="heart" size={30} color="red" />
      ) : (
        <Icon name="heart-outlined" size={30} color="black" />
      )}
    </Pressable>
  );
}
