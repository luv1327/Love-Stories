import React, {useContext} from 'react';
import {Text, View, TextInput, Pressable, StyleSheet} from 'react-native';
import {AuthContext} from '../context/AuthContext';

export default function SignIn() {
  const {
    signIn,
    setEmail,
    setPassword,
    email,
    password,
    emailErrorMessage,
    passwordErrorMessage,
  } = useContext(AuthContext);
  const isDisabled = email.length > 3 && password.length > 3 ? false : true;
  return (
    <View>
      <Text> Sign In Screen </Text>
      <TextInput placeholder="Email" onChangeText={email => setEmail(email)} />
      {emailErrorMessage.length > 2 ? <Text> {emailErrorMessage}</Text> : null}
      <TextInput
        placeholder="Password"
        onChangeText={password => setPassword(password)}
      />
      {passwordErrorMessage.length > 2 ? (
        <Text> {passwordErrorMessage} </Text>
      ) : null}
      <Pressable
        disabled={isDisabled}
        onPress={signIn}
        style={isDisabled ? styles.disabledButton : styles.ActiveButton}>
        <Text> Sign In </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  disabledButton: {
    height: 20,
    width: 100,
    backgroundColor: 'skyblue',
    marginLeft: 140,
    opacity: 0.5,
  },
  ActiveButton: {
    height: 20,
    width: 100,
    backgroundColor: 'skyblue',
    marginLeft: 140,
    opacity: 1,
  },
});
