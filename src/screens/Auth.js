import React, {useState, useContext} from 'react';
import {Text} from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {AuthContext} from '../context/AuthContext';
import styled from 'styled-components';

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
    <Container>
      {isSignUp ? <SignUp /> : <SignIn />}
      <AuthBtnContainer>
        <Text>
          {isSignUp ? 'Already Have an account ?' : `Don't have an account ?`}
        </Text>
        <AuthBtn onPress={emptyString}>
          <Text
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#FF8BA7',
              marginLeft: 5,
              color: '#FF8BA7',
            }}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Text>
        </AuthBtn>
      </AuthBtnContainer>
      <IconContainer>
        <FacebookIconContainer>
          <FacebookIcon source={require('../assets/images/facebook.png')} />
          <Text> Facebook </Text>
        </FacebookIconContainer>
        <GoogleIconContainer>
          <GoogleIcon source={require('../assets/images/google.png')} />
          <Text> Google </Text>
        </GoogleIconContainer>
      </IconContainer>
    </Container>
  );
}

const FacebookIconContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #3b5998;
  justify-content: center;
  width: 120px;
  height: 45px;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 5px;
`;

const GoogleIconContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgrey;
  width: 120px;
  height: 45px;
  margin-left: 10px;
  border-radius: 5px;
`;

const AuthBtn = styled.Pressable``;

const IconContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FacebookIcon = styled.Image`
  height: 30px;
  width: 30px;
`;
const GoogleIcon = styled.Image`
  height: 30px;
  width: 30px;
`;

const AuthBtnContainer = styled.View`
  width: 80%;
  margin: 30px auto;
  flex-direction: row;
  justify-content: center;
`;

const Container = styled.View``;
