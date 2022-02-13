import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const LogInScreen = ({ navigation }) => {
  const [emailInput, setEmail] = useState('');
  const [passwordInput, setPassword] = useState('');

  //   const handleSubmit = () => {
  //     // if (!email) {
  //     //   alert('Please enter your email');
  //     //   return;
  //     // }
  //     // if (!password) {
  //     //   alert('Please enter your password');
  //     //   return;
  //     // }
  //     // let creds = { email: emailInput, password: passwordInput };
  //     navigation.navigate('MainNav');
  //   };

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
          placeholder='Email'
          placeholderTextColor='#003f5c'
          onChangeText={(emailInput) => setEmail(emailInput)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Password'
          placeholderTextColor='#003f5c'
          secureTextEntry={true}
          onChangeText={(passwordInput) => setPassword(passwordInput)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('MainNav')}
      >
        <Text style={styles.loginText}>LOGIN</Text>
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

export default LogInScreen;
