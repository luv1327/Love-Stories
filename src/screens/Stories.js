import React, {useState, useContext} from 'react';
import Story from '../components/Story';
import {ActivityIndicator, FlatList, Button} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {StoryContext} from '../context/StoryContext';
import styled from 'styled-components';
import {fonts, colors} from '../components/Colors';

export default function Stories({navigation}) {
  const [type, setType] = useState('All');
  const {logout} = useContext(AuthContext);
  const {stories, loading} = useContext(StoryContext);
  const filteredStories = stories.filter(story => {
    return story.types.includes(type);
  });

  const border = {
    borderBottomWidth: 2,
    borderColor: colors.buttonColor,
  };

  const renderItem = ({item}) => <Story item={item} navigation={navigation} />;

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <StoriesContainer>
      <TypesContainer>
        <TypeText
          style={type === 'All' ? border : null}
          onPress={() => setType('All')}>
          {' '}
          All{' '}
        </TypeText>
        <TypeText
          onPress={() => setType('Love')}
          style={type === 'Love' ? border : null}>
          {' '}
          Love{' '}
        </TypeText>
        <TypeText
          style={type === 'Broken' ? border : null}
          onPress={() => setType('Broken')}>
          {' '}
          Broken{' '}
        </TypeText>
        <TypeText
          style={type === 'Marriage' ? border : null}
          onPress={() => setType('Marriage')}>
          {' '}
          Marriage{' '}
        </TypeText>
        <TypeText
          style={type === 'OneSided' ? border : null}
          onPress={() => setType('OneSided')}>
          {' '}
          OneSided{' '}
        </TypeText>
        <TypeText
          style={type === 'Cheated' ? border : null}
          onPress={() => setType('Cheated')}>
          {' '}
          Cheated{' '}
        </TypeText>
      </TypesContainer>
      <Button title="LogOut" onPress={logout} />
      <FlatList
        data={type === 'All' ? stories : filteredStories}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </StoriesContainer>
  );
}

const TypeText = styled.Text`
  font-family: ${fonts.regular};
`;

const StoriesContainer = styled.SafeAreaView``;

const TypesContainer = styled.View`
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
`;
