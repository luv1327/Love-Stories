import React, {useContext, useState} from 'react';
import {
  Text,
  Alert,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fonts} from '../components/Colors';
import HeartLogo from '../components/HeartLogo';
import {colors} from '../components/Colors';

export default function SignUp({navigation}) {
  const [focused, setFocused] = useState(null);
  const {
    signUp,
    setUsername,
    setPassword,
    setEmail,
    email,
    username,
    password,
    emailErrorMessage,
    selectedImage,
    setSelectedImage,
  } = useContext(AuthContext);

  const fromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setSelectedImage(image.path);
      })
      .catch(err => Alert.alert('An Error has occurred', err.message));
  };

  const isDisabled =
    email.length >= 3 &&
    password.length >= 3 &&
    username.length >= 2 &&
    selectedImage.length >= 3
      ? false
      : true;

  return (
    <ScrollView>
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
            Sing Up{' '}
          </Text>
        </View>
        <ProfileImageContainer onPress={fromGallery}>
          <ProfileImage
            source={
              selectedImage.length >= 1
                ? {uri: selectedImage}
                : require('../assets/images/Man.png')
            }
          />
          <ChangeBtn onPress={fromGallery}>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: 10,
                backgroundColor: colors.buttonColor,
                color: 'white',
                padding: 3,
                borderRadius: 5,
              }}>
              Change
            </Text>
          </ChangeBtn>
        </ProfileImageContainer>
        <Text style={{fontFamily: fonts.regular}}> Username </Text>
        <Username
          onChangeText={username => setUsername(username)}
          onFocus={() => setFocused('username')}
          style={
            focused === 'username'
              ? {borderWidth: 2, borderColor: '#FF8BA7'}
              : {borderWidth: 1, borderColor: 'lightgrey'}
          }
        />
        <Text style={{fontFamily: fonts.regular}}> Email </Text>
        <Email
          onChangeText={email => setEmail(email)}
          onFocus={() => setFocused('email')}
          style={
            focused === 'email'
              ? {borderWidth: 2, borderColor: '#FF8BA7'}
              : {borderWidth: 1, borderColor: 'lightgrey'}
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
              ? {borderWidth: 2, borderColor: '#FF8BA7'}
              : {borderWidth: 1, borderColor: 'lightgrey'}
          }
        />
        <SignUpBtn
          disabled={isDisabled}
          style={isDisabled ? styles.disabled : styles.active}
          onPress={signUp}>
          <SignUpText style={{fontFamily: fonts.bold}}> Sign Up </SignUpText>
        </SignUpBtn>
        <AuthBtnContainer>
          <Text style={{fontFamily: fonts.regular, fontSize: 15}}>
            {' '}
            Already Have An Account?{' '}
          </Text>
          <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: colors.buttonColor,
                borderBottomWidth: 1,
                borderBottomColor: colors.buttonColor,
              }}>
              {' '}
              Log In{' '}
            </Text>
          </Pressable>
        </AuthBtnContainer>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  editIcon: {
    position: 'relative',
    marginLeft: -30,
    marginTop: 40,
  },
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
  margin-bottom: 10px;
`;

const Error = styled.Text`
  color: red;
  font-size: 12px;
`;

const ProfileImageContainer = styled.Pressable`
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

const SignUpText = styled.Text`
  text-align: center;
  color: #ffffff;
`;

const SignUpBtn = styled.Pressable`
  padding: 10px;
  border-radius: 3px;
  margin-top: 20px;
  height: 40px;
`;

const Container = styled.View`
  width: 85%;
  margin: 0 auto;
`;

// const Title = styled.Text`
//   text-align: left;
//   margin-top: 50px;
//   font-size: 30px;
//   margin-left: -4px;
// `;

const Username = styled.TextInput`
  margin-top: 2px;
  height: 40px;
  border-radius: 3px;
  margin-bottom: 10px;
  padding-left: 10px;
`;

const Email = styled.TextInput`
  border-radius: 3px;
  margin-bottom: 10px;
  margin-top: 2px;
  height: 40px;
  padding-left: 10px;
`;
const Password = styled.TextInput`
  margin-top: 2px;
  border-radius: 3px;
  margin-bottom: 10px;
  height: 40px;
  padding-left: 10px;
`;

const ProfileImage = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 60px;
`;

const ChangeBtn = styled.Pressable`
  margin-top: 3px;
`;

const AuthBtnContainer = styled.View`
  width: 80%;
  margin: 30px auto;
  flex-direction: row;
  justify-content: center;
`;
