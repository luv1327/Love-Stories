import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

export default function OnboardingScreen({navigation}) {
  return (
    <Onboarding
      onSkip={() => navigation.navigate('Main')}
      onDone={() => navigation.navigate('Main')}
      pages={[
        {
          backgroundColor: 'blue',
          image: (
            <Image
              source={{
                uri: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.forza27.com%2Fwp-content%2Fuploads%2F2017%2F09%2Fa41e8954135905.594ea3cfa5074-feat.jpg&f=1&nofb=1',
              }}
              style={styles.image}
            />
          ),
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={{
                uri: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.forza27.com%2Fwp-content%2Fuploads%2F2017%2F09%2Fa41e8954135905.594ea3cfa5074-feat.jpg&f=1&nofb=1',
              }}
              style={styles.image}
            />
          ),
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={{
                uri: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.forza27.com%2Fwp-content%2Fuploads%2F2017%2F09%2Fa41e8954135905.594ea3cfa5074-feat.jpg&f=1&nofb=1',
              }}
              style={styles.image}
            />
          ),
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
    borderRadius: 5,
  },
});
