import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // checkRefreshToken();
  }, []);

  const checkRefreshToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        const accessToken = await fetchNewAccessToken(refreshToken);
        if (accessToken) {
          navigation.navigate('HomePage');
        }
      }
    } catch (error) {
      console.error('Error checking refresh token:', error);
    }
  };

  const fetchNewAccessToken = async refreshToken => {
    try {
      const apiUrl = 'https://api.escuelajs.co/api/v1/auth/refresh-token';
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({refreshToken}),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        await AsyncStorage.setItem('accessToken', accessToken);
        return accessToken;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return null;
    }
  };

  const handleLogin = async () => {
    setLoader(true);

    try {
      const apiUrl = 'https://api.escuelajs.co/api/v1/auth/login';
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const requestData = {
        email: email,
        password: password,
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(requestData),
        redirect: 'follow',
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;

        if (accessToken) {
          await AsyncStorage.setItem('accessToken', accessToken);
        } else {
          setErrorMessage('Access token is null or undefined');
        }

        if (refreshToken) {
          await AsyncStorage.setItem('refreshToken', refreshToken);
        } else {
          setErrorMessage('Refresh token is null or undefined');
        }

        if (accessToken && refreshToken) {
          navigation.navigate('HomePage');
        }
      } else {
        setErrorMessage('Wrong login credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred while logging in');
    }

    setLoader(false);
  };

  return (
    <View style={styles.loginScreen}>
      <Text style={styles.loginScreenHeaderText1}>
        Welcome to the TO-DO LIST APPLICATION
      </Text>

      <Text style={styles.loginScreenHeaderText2}>Login</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="grey"
        style={styles.loginScreenInput}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="grey"
        secureTextEntry
        style={styles.loginScreenInput}
        onChangeText={text => setPassword(text)}
      />
      <Button
        title="Login"
        onPress={handleLogin}
        style={styles.loginScreenButton}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {loader && <ActivityIndicator size="large" color="purple" />}
    </View>
  );
};

const styles = StyleSheet.create({
  loginScreenHeaderText1: {
    color: 'white',
    fontSize: 15,
    marginBottom: 80,
  },
  loginScreenHeaderText2: {
    color: 'white',
    fontSize: 30,
    marginBottom: 10,
  },
  loginScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c2c35',
  },
  loginScreenInput: {
    color: 'black',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: 'purple',
  },
  loginScreenButton: {
    color: 'purple',
    backgroundColor: 'transparent',
    borderColor: 'purple',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
