import React from 'react';
import {Pressable} from 'react-native';
import {Text, View, StyleSheet} from 'react-native';
import HeartLogo from '../components/HeartLogo';
import {fonts, colors} from '../components/Colors';

export default function Welcome({navigation}) {
  return (
    <View style={styles.container}>
      <View>
        <HeartLogo />
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 40,
            marginTop: 15,
          }}>
          Welcome
        </Text>
        <Text style={{fontFamily: fonts.bold, fontSize: 40}}>To</Text>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 40,
            color: colors.buttonColor,
          }}>
          ShareStories
        </Text>
      </View>
      <Pressable
        style={styles.buttonLogin}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={{fontFamily: fonts.regular}}> LogIn </Text>
      </Pressable>
      <Pressable
        style={styles.buttonSignUp}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={{fontFamily: fonts.regular, color: 'white'}}>
          {' '}
          Sign Up{' '}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 30,
    marginTop: 100,
  },
  buttonLogin: {
    backgroundColor: colors.backgroundColor,
    height: 40,
    width: 300,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginBottom: 10,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonSignUp: {
    backgroundColor: colors.buttonColor,
    height: 40,
    width: 300,
    marginBottom: 10,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
