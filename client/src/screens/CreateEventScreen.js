import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
} from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateEventScreen = () => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [isPickerShow, setIsPickerShow] = useState(false);

  const onDateChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  const showPicker = () => {
    isPickerShow ? setIsPickerShow(false) : setIsPickerShow(true);
  };

  const handleSubmit = () => {
    console.log(eventName);
    console.log(date.toLocaleDateString('en-US'));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text h2>Create New Event</Text>
      </View>
      <View style={styles.container}>
        <Input
          containerStyle={{ width: '80%' }}
          placeholder='Event Name'
          onChangeText={(eventName) => setEventName(eventName)}
        />
        <Input
          containerStyle={{ width: '80%' }}
          placeholder='Location or Address'
          onChangeText={(location) => setLocation(location)}
        />
        <Text>Event Date</Text>
        <View style={styles.pickedDate}>
          <Pressable onPress={showPicker}>
            <Text style={styles.dateText}>
              {date.toLocaleDateString('en-US')}
            </Text>
          </Pressable>
        </View>
        {isPickerShow && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={false}
            onChange={onDateChange}
            style={styles.datePicker}
          />
        )}
        <View style={styles.btnContainer}>
          <Button
            onPress={handleSubmit}
            title='Save'
            raised
            containerStyle={{
              width: 150,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickedDate: {
    padding: 20,
    backgroundColor: '#EEE',
    borderRadius: 10,
  },
  dateText: {
    fontSize: 18,
  },
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  btnContainer: {
    marginTop: 50,
    padding: 30,
  },
});

export default CreateEventScreen;