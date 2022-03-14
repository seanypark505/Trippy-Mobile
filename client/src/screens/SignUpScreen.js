import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (email == '') {
      Alert.alert('Invalid Email', 'Please enter a valid email address'),
        [
          {
            text: 'Ok',
          },
        ];
      return;
    }
    if (password == '') {
      Alert.alert('Invalid Password', 'Please enter a valid password'),
        [
          {
            text: 'Ok',
          },
        ];
      return;
    }

    const newUser = {
      fName,
      lName,
      email,
      password,
    };

    const res = await fetch('/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 201) {
      console.log('User successfully created');
    } else {
      console.log(`Status Code ${res.status} - Failed to create user`);
    }

    navigation.navigate('MainNav');
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../assets/TRIPPY-logos.jpeg')}
          style={{
            height: 150,
            resizeMode: 'contain',
            margin: 10,
          }}
        ></Image>
      </View>

      <StatusBar style='auto' />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='First Name'
          placeholderTextColor='#003f5c'
          onChangeText={(fName) => setFName(fName)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Last Name'
          placeholderTextColor='#003f5c'
          onChangeText={(lName) => setLName(lName)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Email'
          placeholderTextColor='#003f5c'
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Password'
          placeholderTextColor='#003f5c'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
        <Text style={styles.loginText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#E74E35',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  inputView: {
    flexDirection: 'row',
    backgroundColor: '#EEE',
    borderRadius: 20,
    width: '70%',
    height: 40,
    marginBottom: 20,
    marginLeft: 35,
    marginRight: 35,
    alignItems: 'center',
    borderWidth: 1,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 15,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },

  loginText: {
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
