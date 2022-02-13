import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';

const CreateEventScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text h2>Create New Event</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default CreateEventScreen;
