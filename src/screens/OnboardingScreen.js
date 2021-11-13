import React from 'react';
import {Image, StyleSheet, Pressable, View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import IconNext from 'react-native-vector-icons/MaterialIcons';
import IconDone from 'react-native-vector-icons/Ionicons';

const Next = ({...props}) => {
  return (
    <Pressable {...props} style={{marginHorizontal: 20, marginVertical: 10}}>
      <IconNext name="navigate-next" size={40} color="red" />
    </Pressable>
  );
};

const Done = ({...props}) => {
  return (
    <Pressable {...props} style={{marginHorizontal: 15}}>
      <IconDone name="checkmark-done" size={30} color="red" />
    </Pressable>
  );
};

const Dots = ({selected}) => {
  let backgroundColor;
  backgroundColor = selected ? 'red' : 'white';
  const borderWidth = selected ? 0 : 1;
  const borderColor = selected ? 'none' : 'red';
  return (
    <View
      style={{
        width: 7,
        height: 7,
        marginHorizontal: 3,
        backgroundColor: backgroundColor,
        borderRadius: 10,
        borderColor,
        borderWidth,
      }}></View>
  );
};

export default function OnboardingScreen({navigation}) {
  return (
    <Onboarding
      onDone={() => navigation.navigate('Main')}
      showSkip={false}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      subTitleStyles={styles.subTitle}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/images/Rocket.jpg')}
              style={styles.image}
            />
          ),
          title: 'Onboarding',
          subtitle:
            'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/images/WebSeries.png')}
              style={styles.image}
            />
          ),
          title: 'Onboarding',
          subtitle:
            ' It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/images/Share.png')}
              style={styles.image}
            />
          ),
          title: 'Onboarding',
          subtitle:
            ' It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 400,
    marginTop: -50,
  },
  subTitle: {
    color: 'grey',
    width: 350,
  },
});
