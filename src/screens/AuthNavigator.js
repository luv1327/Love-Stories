import React from 'react';
import {Stack} from '../components/Navigation';
import Welcome from './Welcome';
import SignIn from './SignIn';
import SignUp from './SignUp';

// export default function AuthNavigator() {
//   return (
//     <View>
//       <Text> Auth Navigator </Text>
//     </View>
//   );
// }

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#FFFFFE'},
      }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
