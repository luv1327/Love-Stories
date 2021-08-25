import React, {useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import Story from './Story';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Button,
  Text,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';

export default function Stories({navigation}) {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [type, setType] = useState('All');
  const {logout} = useContext(AuthContext);
  useEffect(() => {
    const subscriber = firestore()
      .collection('Stories')
      .onSnapshot(querySnapshot => {
        const stories = [];
        querySnapshot.forEach(documentSnapshot => {
          stories.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        const sortedStoriesByDate = stories.sort((a, b) => b.date - a.date);
        setStories(sortedStoriesByDate);
        setLoading(false);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const renderItem = ({item}) => <Story item={item} navigation={navigation} />;

  const filteredStories = stories.filter(story => {
    return story.types.includes(type);
  });
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
