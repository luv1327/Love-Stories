import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firestoreUser, setFirestoreUser] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        firestoreUser,
        setFirestoreUser,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        emailErrorMessage,
        passwordErrorMessage,
        signIn: async () => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
            await firestore()
              .collection('Users')
              .doc(email)
              .get()
              .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                  setFirestoreUser(documentSnapshot.data());
                }
              })
              .catch(err => console.error(err));
          } catch (err) {
            if (err.message.includes('email')) {
              setEmailErrorMessage(err.message.substring(21, 58));
              setPasswordErrorMessage('');
            } else if (err.message.includes('record')) {
              setEmailErrorMessage(err.message.substring(21, 80));
              setPasswordErrorMessage('');
            } else if (err.message.includes('password')) {
              setPasswordErrorMessage(err.message.substring(21, 100));
              setEmailErrorMessage('');
            } else {
              setEmailErrorMessage('');
              setPasswordErrorMessage('');
            }
          }
        },
        signUp: async () => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
            await firestore()
              .collection('Users')
              .doc(email)
              .set({
                username: username.charAt(0).toUpperCase() + username.slice(1),
                email: email,
                stories: [],
              })
              .catch(err => console.log(err));
            await firestore()
              .collection('Users')
              .doc(email)
              .get()
              .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                  setFirestoreUser(documentSnapshot.data());
                }
              })
              .catch(err => console.log(err));
          } catch (err) {
            if (err.message.includes('email')) {
              setEmailErrorMessage(err.message.substring(21, 58));
            }
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
            setEmail('');
            setPassword('');
            setUsername('');
            setEmailErrorMessage('');
            setPasswordErrorMessage('');
            console.log('Logged Out');
          } catch (err) {
            console.log(err);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
