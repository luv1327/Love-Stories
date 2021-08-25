import React, {useContext} from 'react';
import {Text, View, Pressable} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import styled from 'styled-components';

export default function SignUp() {
  const {
    signUp,
    setUsername,
    setPassword,
    setEmail,
    email,
    username,
    password,
    emailErrorMessage,
  } = useContext(AuthContext);
  const isDisabled =
    email.length > 3 && password.length > 3 && username.length > 2
      ? false
      : true;
  return (
    <View>
      <Title> Sign Up Screen </Title>
      <Text> Username </Text>
      <Username onChangeText={username => setUsername(username)} />
      <Text> Email </Text>
      <Email onChangeText={email => setEmail(email)} />
      {emailErrorMessage.length > 2 ? <Text> {emailErrorMessage}</Text> : null}
      <Text> Password </Text>
      <Password onChangeText={password => setPassword(password)} />
      <Pressable
        disabled={isDisabled}
        // style={isDisabled ? styles.disabledButton : styles.ActiveButton}
        onPress={signUp}>
        <Text> Sign Up </Text>
      </Pressable>
    </View>
  );
}

const Title = styled.Text``;

const Username = styled.TextInput``;

const Email = styled.TextInput``;
const Password = styled.TextInput``;
