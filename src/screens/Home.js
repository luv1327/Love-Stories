import React from 'react';
import {Tab} from '../components/Navigation';
import Add from './Add';
import Stories from './Stories';
import User from './User';
import Reading from './Reading';
export default function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Stories"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Stories" component={Stories} />
      <Tab.Screen name="Reading" component={Reading} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
}
