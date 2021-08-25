import React, {useState, useContext} from 'react';
import {View, Button} from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {AuthContext} from '../context/AuthContext';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const {setEmail, setPassword, setUsername} = useContext(AuthContext);
  const emptyString = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setIsSignUp(prevState => !prevState);
  };
  return (
    <View>
      {isSignUp ? <SignUp /> : <SignIn />}
      <Button title={isSignUp ? 'Sign In' : 'Sign Up'} onPress={emptyString} />
    </View>
  );
}
