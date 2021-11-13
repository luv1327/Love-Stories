import React, {useState, useContext, useEffect} from 'react';
import {Text, View, Button, Image, Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../context/AuthContext';
import {StoryContext} from '../context/StoryContext';

export default function User({navigation}) {
  const {firestoreUser} = useContext(AuthContext);
  const {getBookmarkedStoriesId, bookmarkedStoriesId} =
    useContext(StoryContext);
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    getBookmarkedStoriesId(firestoreUser.email);
    console.log(bookmarkedStoriesId);
  }, []);

  const fromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(err => console.log(err));
  };

  const fromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = async () => {
    if (image.length >= 3) {
      const imageUri = image;
      let filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      try {
        await storage().ref(filename).putFile(imageUri);
        console.log('Photo Uploaded Successfully');
        const imageUrl = await storage().ref(filename).getDownloadURL();
        setImageUrl(imageUrl);
      } catch (err) {
        console.error(err);
      }
    } else {
      Alert.alert('Please Select Image First');
    }
  };

  return (
    <View>
      <Text> User Screen </Text>
      {/* <Image
        style={{height: 300, width: 300}}
        source={{uri: firestoreUser.imageUrl}}
      /> */}
      <Image
        source={{
          uri:
            image.length >= 1
              ? image
              : 'https://avatars.githubusercontent.com/u/55596352?v=4',
        }}
        style={{height: 50, width: 50}}
      />
      <Button
        title="Go to Stories"
        onPress={() => navigation.navigate('Stories')}
      />
      <Button title=" Camera" onPress={fromCamera} />
      <Button title=" Gallery" onPress={fromGallery} />
      <Button title="Submit" onPress={handleSubmit} />
      {imageUrl.length > 2 ? (
        <Image style={{height: 50, width: 50}} source={{uri: imageUrl}} />
      ) : null}
    </View>
  );
}
