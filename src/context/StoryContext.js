import React, {useState, createContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
export const StoryContext = createContext();

export function StoryProvider({children}) {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkedStoriesId, setBookmarkedStoriesId] = useState([]);
  const getBookmarkedStoriesId = async userId => {
    try {
      const response = await firestore().collection('Users').doc(userId).get();
      setBookmarkedStoriesId(response.data().bookmarkedStories);
    } catch (err) {
      console.log(err.message);
    }
  };

  const isBookmarked = async (userId, storyId) => {
    try {
      const response = await firestore().collection('Users').doc(userId).get();
      console.log('Response', response);
      // response._data.bookmarkedStories.includes(storyId)
      //   ? setBookmarked(true)
      //   : setBookmarked(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleBookmark = async (userId, storyId) => {
    try {
      setBookmarked(prevState => !prevState);
      if (bookmarked) {
        await firestore()
          .collection('Users')
          .doc(userId)
          .update({
            bookmarkedStories: firestore.FieldValue.arrayRemove(storyId),
          })
          .then(() => console.log('UnBookmarked Successfully'))
          .catch(err => console.log(err));
      } else {
        await firestore()
          .collection('Users')
          .doc(userId)
          .update({
            bookmarkedStories: firestore.FieldValue.arrayUnion(storyId),
          })
          .then(() => console.log('Bookmarked Successfully'))
          .catch(err => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Stories')
      .onSnapshot(querySnapshot => {
        const stories = [];
        querySnapshot.forEach(documentSnapshot => {
          stories.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        const sortedStoriesByDate = stories.sort((a, b) => b.date - a.date);
        setStories(sortedStoriesByDate);
        setLoading(false);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <StoryContext.Provider
      value={{
        loading,
        setLoading,
        stories,
        setStories,
        handleBookmark,
        bookmarked,
        setBookmarked,
        isBookmarked,
        getBookmarkedStoriesId,
        bookmarkedStoriesId,
      }}>
      {children}
    </StoryContext.Provider>
  );
}
