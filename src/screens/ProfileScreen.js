import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const ProfileScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = useState({});

  const handleLogout = () => {
    setUserDetails({});
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile Page</Text>
      <Text style={styles.userInfo}>User Name: {userDetails.name}</Text>
      <Text style={styles.userInfo}>Email: {userDetails.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c2c35',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    fontSize: 16,
    color: 'white',
    margin: 10,
  },
});

export default ProfileScreen;
