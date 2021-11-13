import React, {useState, useContext, createRef} from 'react';
import {Text, StyleSheet, Alert, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthContext';
import {colors, fonts} from '../components/Colors';
import styled from 'styled-components';

export default function Add({navigation}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [types, setTypes] = useState([]);
  const [likes] = useState(0);
  const [comments] = useState([]);
  const {firestoreUser} = useContext(AuthContext);
  const clearTitle = createRef();
  const clearBody = createRef();
  const [love, setLove] = useState(false);
  const [marriage, setMarriage] = useState(false);
  const [broken, setBroken] = useState(false);
  const [onesided, setOnesided] = useState(false);
  const [breakup, setBreakup] = useState(false);
  const [divorce, setDivorce] = useState(false);
  const [zoned, setZoned] = useState(false);
  const [cheated, setCheated] = useState(false);
  const [titlePressed, setTitlePressed] = useState(false);

  const newStory = {
    title,
    user: {
      username: firestoreUser?.username,
      id: firestoreUser.email,
    },
    body,
    likes,
    comments,
    types,
    date: new Date(),
    likedUsers: [],
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
        removeType(
          'Love',
          'Marriage',
          'Broken',
          'Breakup',
          'Zoned',
          'Cheated',
          'Onesided',
          'Divorce',
        );
      }
    } catch (err) {
      Alert.alert(err);
    }
  };

  const titleBorder = titlePressed
    ? {
        borderWidth: 1,
        borderColor: colors.buttonColor,
        color: colors.subTitleText,
      }
    : {borderWidth: 1, borderColor: colors.border, color: colors.subTitleText};

  const handleLove = () => {
    setLove(prevState => !prevState);
    !love ? setTypes(['Love', ...types]) : removeType('Love');
  };

  const handleMarriage = () => {
    setMarriage(prevState => !prevState);
    !marriage ? setTypes(['Marriage', ...types]) : removeType('Marriage');
  };

  const handleBreakup = () => {
    setBreakup(prevState => !prevState);
    !breakup ? setTypes(['BreakUp', ...types]) : removeType('BreakUp');
  };

  const handleOnesided = () => {
    setOnesided(prevState => !prevState);
    !onesided ? setTypes(['OneSided', ...types]) : removeType('OneSided');
  };
  const handleBroken = () => {
    setBroken(prevState => !prevState);
    !broken ? setTypes(['Broken', ...types]) : removeType('Broken');
  };
  const handleDivorce = () => {
    setDivorce(prevState => !prevState);
    !divorce ? setTypes(['Divorce', ...types]) : removeType('Divorce');
  };

  const handleZoned = () => {
    setZoned(prevState => !prevState);
    !zoned ? setTypes(['Zoned', ...types]) : removeType('Zoned');
  };

  const handleCheated = () => {
    setCheated(prevState => !prevState);
    !cheated ? setTypes(['Cheated', ...types]) : removeType('Cheated');
  };

  return (
    <ScrollView>
      <Container>
        <Text
          style={{fontFamily: fonts.regular, marginTop: 40, marginBottom: 3}}>
          {' '}
          Title{' '}
        </Text>
        <TitleInput
          onChangeText={title => setTitle(title)}
          ref={clearTitle}
          style={titleBorder}
          onPressIn={() => setTitlePressed(true)}
        />
        <TypesContainer>
          <TypesContainerTop>
            <Types
              onPress={handleLove}
              style={love ? styles.selected : styles.disSelected}>
              <TypesText> Love </TypesText>
            </Types>
            <Types
              onPress={handleBreakup}
              style={breakup ? styles.selected : styles.disSelected}>
              <TypesText> Breakup </TypesText>
            </Types>
            <Types
              onPress={handleMarriage}
              style={marriage ? styles.selected : styles.disSelected}>
              <TypesText> Marriage </TypesText>
            </Types>
            <Types
              onPress={handleOnesided}
              style={onesided ? styles.selected : styles.disSelected}>
              <TypesText> OneSided </TypesText>
            </Types>
          </TypesContainerTop>
          <TypesContainerBottom>
            <Types
              onPress={handleBroken}
              style={broken ? styles.selected : styles.disSelected}>
              <TypesText> Broken </TypesText>
            </Types>
            <Types
              onPress={handleCheated}
              style={cheated ? styles.selected : styles.disSelected}>
              <TypesText> Cheated </TypesText>
            </Types>
            <Types
              onPress={handleZoned}
              style={zoned ? styles.selected : styles.disSelected}>
              <TypesText> Zoned </TypesText>
            </Types>
            <Types
              onPress={handleDivorce}
              style={divorce ? styles.selected : styles.disSelected}>
              <TypesText> Divorce </TypesText>
            </Types>
          </TypesContainerBottom>
        </TypesContainer>
        <Text> Your Story </Text>
        <StoryInput
          onChangeText={body => setBody(body)}
          ref={clearBody}
          onPressIn={() => setTitlePressed(false)}
        />
        <AddButton onPress={handleAdd}>
          <Text
            style={{
              fontFamily: fonts.regular,
              color: '#FFFFFF',
            }}>
            {' '}
            Post{' '}
          </Text>
        </AddButton>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  selected: {
    borderWidth: 1,
    borderColor: colors.buttonColor,
    backgroundColor: colors.buttonColor,
  },
  disSelected: {
    borderWidth: 1,
    borderColor: colors.border,
  },
});

const StoryInput = styled.TextInput`
  height: auto;
  min-height : 100px
  border: 1px solid lightgrey;
`;

const AddButton = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 40px;
  background-color: ${colors.buttonColor};
`;

const TitleInput = styled.TextInput`
  font-family: ${fonts.regular};
  border-radius: 5px;
  height: 40px;
  padding-left: 10px;
`;

const Container = styled.View`
  width: 90%;
  margin: 0 auto;
`;

const TypesText = styled.Text`
  text-align: center;
  font-size: 10px;
  font-family: ${fonts.regular};
`;

const TypesContainer = styled.View``;

const Types = styled.Pressable`
  width: 50px;
  border-radius: 5px;
  padding: 2px;
`;

const TypesContainerTop = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
`;

const TypesContainerBottom = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
