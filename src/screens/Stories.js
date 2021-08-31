import React, {useState, useContext} from 'react';
import Story from '../components/Story';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Button,
  Text,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {StoryContext} from '../context/StoryContext';

export default function Stories({navigation}) {
  const [type, setType] = useState('All');
  const {logout} = useContext(AuthContext);
  const {stories, loading} = useContext(StoryContext);
  const filteredStories = stories.filter(story => {
    return story.types.includes(type);
  });

  const renderItem = ({item}) => <Story item={item} navigation={navigation} />;

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaView>
      <Text onPress={() => setType('All')}> All </Text>
      <Text onPress={() => setType('Love')}> Love </Text>
      <Text onPress={() => setType('Broken')}> Broken </Text>
      <Text onPress={() => setType('Marriage')}> Marriage </Text>
      <Button title="LogOut" onPress={logout} />
      <FlatList
        data={type === 'All' ? stories : filteredStories}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
}
