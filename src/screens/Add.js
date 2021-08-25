import React, {useState, useContext, createRef} from 'react';
import {Text, View, Pressable, TextInput, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthContext';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function Add({navigation}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [types, setTypes] = useState([]);
  const [typeLove] = useState('Love');
  const [typeBroken] = useState('Broken');
  const [typeMarriage] = useState('Marriage');
  const [likes] = useState(0);
  const [comments] = useState([]);
  const {firestoreUser} = useContext(AuthContext);
  const clearTitle = createRef();
  const clearBody = createRef();
  const newStory = {
    title,
    user: {
      username: firestoreUser?.username,
    },
    body,
    likes,
    comments,
    types,
    date: new Date(),
  };

  function addingStory() {
    firestore()
      .collection('Stories')
      .add(newStory)
      .then(() => {
        console.log('New Story Added');
      })
      .catch(err => console.log(err));
  }

  function addingStoryIntoUser() {
    firestore()
      .collection('Users')
      .doc(firestoreUser.email)
      .update({
        // Update Stories Array
        stories: firestore.FieldValue.arrayUnion(newStory),
      })
      .then(() => {
        console.log('New Story Added into FireStore user');
      })
      .catch(err => console.log(err));
  }

  const removeType = value => {
    for (var i = 0; i < types.length; i++) {
      if (types[i] === value) {
        types.splice(i, 1);
        i--;
        setTypes([...types]);
      }
    }
  };

  const handleAdd = () => {
    try {
      if (title.length <= 3) {
        throw 'Please Add A Title';
      } else if (body.length <= 10) {
        throw 'Please Add Story';
      } else if (types.length <= 0) {
        throw 'Please Select A Type';
      } else {
        Alert.alert('New Story Has Been Added');
        addingStory();
        addingStoryIntoUser();
        navigation.navigate('Stories');
        clearBody.current.clear();
        clearTitle.current.clear();
        setBody('');
        setTitle('');
        setTypes([]);
        removeType(typeBroken, typeLove, typeMarriage);
      }
    } catch (err) {
      Alert.alert(err);
    }
  };

  return (
    <View>
      <Text> Add Screen </Text>
      <TextInput
        placeholder="Title"
        onChangeText={title => setTitle(title)}
        ref={clearTitle}
      />
      <TextInput
        placeholder="Your Story"
        onChangeText={body => setBody(body)}
        ref={clearBody}
      />
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        text={typeLove}
        iconStyle={{borderColor: 'red'}}
        textStyle={{fontFamily: 'JosefinSans-Regular'}}
        onPress={isChecked => {
          isChecked ? setTypes([typeLove, ...types]) : removeType(typeLove);
        }}
      />
      <BouncyCheckbox
        size={25}
        fillColor="yellow"
        unfillColor="#FFFFFF"
        text={typeBroken}
        iconStyle={{borderColor: 'yellow'}}
        textStyle={{fontFamily: 'JosefinSans-Regular'}}
        onPress={isChecked =>
          isChecked ? setTypes([typeBroken, ...types]) : removeType(typeBroken)
        }
      />
      <BouncyCheckbox
        size={25}
        fillColor="green"
        unfillColor="#FFFFFF"
        text={typeMarriage}
        iconStyle={{borderColor: 'green'}}
        textStyle={{fontFamily: 'JosefinSans-Regular'}}
        onPress={isChecked =>
          isChecked
            ? setTypes([typeMarriage, ...types])
            : removeType(typeMarriage)
        }
      />
      <Pressable onPress={handleAdd}>
        <Text> Add </Text>
      </Pressable>
    </View>
  );
}
