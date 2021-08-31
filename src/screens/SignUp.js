import React, {useContext} from 'react';
import {Text, View, Pressable, Button, Image} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
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
    selectedImage,
    setSelectedImage,
  } = useContext(AuthContext);

  const fromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setSelectedImage(image.path);
      })
      .catch(err => console.log(err));
  };

  const isDisabled =
    email.length >= 3 &&
    password.length >= 3 &&
    username.length >= 2 &&
    selectedImage.length >= 3
      ? false
      : true;
  return (
    <View>
      <Title> Sign Up Screen </Title>
      <Button title="Camera" onPress={fromCamera} />
      <Text> Username </Text>
      <Username onChangeText={username => setUsername(username)} />
      <Text> Email </Text>
      <Email onChangeText={email => setEmail(email)} />
      {emailErrorMessage.length > 2 ? <Text> {emailErrorMessage}</Text> : null}
      <Text> Password </Text>
      <Password onChangeText={password => setPassword(password)} />
      <Pressable disabled={isDisabled} onPress={signUp}>
        <Text> Sign Up </Text>
      </Pressable>
      <Image
        source={{
          uri:
            selectedImage.length >= 1
              ? selectedImage
              : 'https://avatars.githubusercontent.com/u/55596352?v=4',
        }}
        style={{height: 200, width: 200}}
      />
    </View>
  );
}

const Title = styled.Text``;

const Username = styled.TextInput``;

const Email = styled.TextInput``;
const Password = styled.TextInput``;
