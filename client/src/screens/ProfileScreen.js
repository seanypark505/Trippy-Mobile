import React from 'react';
import { View, StyleSheet, SafeAreaView, Button } from 'react-native';
import { Text, Avatar } from 'react-native-elements';

const user = {
  fName: 'Sean',
  lName: 'Park',
  photo: '../../assets/prof_pic.jpeg',
};

const ProfileScreen = ({ navigation }) => {
  const logOut = () => {
    console.log('Log out user');
    navigation.navigate('Auth');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Avatar
          rounded
          size={150}
          title={user.fName[0] + user.lName[0]}
          containerStyle={{ backgroundColor: '#E74E35' }}
        />
        <Text style={{ marginTop: 20 }} h1>
          {user.fName} {user.lName}
        </Text>
        <Button onPress={logOut}>Log Out</Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
