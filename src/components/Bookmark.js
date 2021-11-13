import React, {useContext, useEffect} from 'react';
import {Pressable} from 'react-native';
import {StoryContext} from '../context/StoryContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Bookmark({userId, storyId}) {
  const {handleBookmark, bookmarked, isBookmarked} = useContext(StoryContext);

  useEffect(() => {
    isBookmarked(userId, storyId);
  }, [storyId]);

  return (
    <Pressable onPress={() => handleBookmark(userId, storyId)}>
      {bookmarked ? (
        <Icon name="bookmark" size={30} color="green" />
      ) : (
        <Icon name="bookmark-o" size={30} color="green" />
      )}
    </Pressable>
  );
}
