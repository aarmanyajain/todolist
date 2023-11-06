import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const navigateToLoginScreen = async () => {
      setTimeout(() => {
        navigation.replace('LoginScreen');
      }, 2000);
    };

    navigateToLoginScreen();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('..//assets/splash_screen_background.png')}
        style={styles.image}
      />
      <Text style={styles.text}>TO-DO LIST APPLICATION</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 150,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
