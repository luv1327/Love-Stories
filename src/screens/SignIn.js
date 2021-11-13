import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors, fonts} from '../components/Colors';
import HeartLogo from '../components/HeartLogo';

export default function SignIn({navigation}) {
  const [focused, setFocused] = useState(null);
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
    <Container>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <HeartLogo />
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 30,
            marginVertical: 15,
          }}>
          {' '}
          Sing In{' '}
        </Text>
      </View>
      <Text style={{fontFamily: fonts.regular}}> Email </Text>
      <Email
        onChangeText={email => setEmail(email)}
        onFocus={() => setFocused('email')}
        style={
          focused === 'email'
            ? {borderWidth: 2, borderColor: colors.buttonColor}
            : {borderWidth: 1, borderColor: colors.border}
        }
      />
      {emailErrorMessage.length > 2 ? (
        <ErrorContainer>
          <Icon name="error-outline" size={15} color="red" />
          <Error> {emailErrorMessage} </Error>
        </ErrorContainer>
      ) : null}
      <Text style={{fontFamily: fonts.regular}}> Password </Text>
      <Password
        onChangeText={password => setPassword(password)}
        secureTextEntry={true}
        onFocus={() => setFocused('password')}
        style={
          focused === 'password'
            ? {borderWidth: 2, borderColor: colors.buttonColor}
            : {borderWidth: 1, borderColor: colors.border}
        }
      />
      {passwordErrorMessage.length > 2 ? (
        <ErrorContainer>
          <Icon name="error-outline" size={15} color="red" />
          <Error> {passwordErrorMessage} </Error>
        </ErrorContainer>
      ) : null}
      <Text
        style={{
          fontFamily: fonts.bold,
          color: '#FF3062',
          marginTop: 7,
        }}>
        {' '}
        Forgot Password?
      </Text>
      <SignInBtn
        disabled={isDisabled}
        onPress={signIn}
        style={isDisabled ? styles.disabled : styles.active}>
        <SignInText style={{fontFamily: fonts.bold}}> Sign In </SignInText>
      </SignInBtn>
      <AuthBtnContainer>
        <Text style={{fontFamily: fonts.regular, fontSize: 16}}>
          {' '}
          Dont have an account?{' '}
        </Text>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text
            style={{
              fontFamily: fonts.regular,
              color: colors.buttonColor,
              borderBottomWidth: 1,
              borderBottomColor: colors.buttonColor,
            }}>
            {' '}
            Sign Up{' '}
          </Text>
        </Pressable>
      </AuthBtnContainer>
    </Container>
  );
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: '#ff8ba7',
  },
  disabled: {
    backgroundColor: '#ff8ba7',
    opacity: 0.6,
  },
});

const ErrorContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: -5px;
  margin-bottom: 10px;
`;

const Error = styled.Text`
  color: red;
  font-size: 12px;
`;

const Email = styled.TextInput`
  border: 1px solid lightgrey;
  border-radius: 3px;
  margin-bottom: 10px;
  height: 40px;
  padding-left: 10px;
`;
const Password = styled.TextInput`
  border: 1px solid lightgrey;
  border-radius: 3px;
  margin-bottom: 10px;
  height: 40px;
  padding-left: 10px;
`;

const Container = styled.View`
  width: 90%;
  margin: 0 auto;
`;

// const Title = styled.Text`
//   text-align: left;
//   margin-top: 50px;
//   margin-bottom: 30px;
//   font-size: 30px;
//   margin-left: -4px;
// `;

const SignInText = styled.Text`
  text-align: center;
  color: #ffffff;
  font-weight: 700;
`;

const SignInBtn = styled.Pressable`
  padding: 10px;
  border-radius: 3px;
  margin-top: 20px;
`;

const AuthBtnContainer = styled.View`
  width: 80%;
  margin: 50px auto;
  flex-direction: row;
  justify-content: center;
`;
