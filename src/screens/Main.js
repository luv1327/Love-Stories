import React, {useState, useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import Home from './Home';
import {AuthContext} from '../context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import {StoryProvider} from '../context/StoryContext';
import AuthNavigator from './AuthNavigator';

export default function Main() {
  const {user, setUser, setFirestoreUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const onAuthStateChanged = user => {
    if (user) {
      firestore()
        .collection('Users')
        .doc(user.email)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setFirestoreUser(documentSnapshot.data());
          }
        })
        .catch(err => console.log(err));
    }
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return user ? (
    <StoryProvider>
      <Home />
    </StoryProvider>
  ) : (
    <AuthNavigator />
  );
}
