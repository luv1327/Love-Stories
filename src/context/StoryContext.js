import React, {useState, createContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
export const StoryContext = createContext();

export function StoryProvider({children}) {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
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
    <StoryContext.Provider value={{loading, setLoading, stories, setStories}}>
      {children}
    </StoryContext.Provider>
  );
}
