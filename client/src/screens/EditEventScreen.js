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
import { HOST_3000 } from '../../environment';

const EditEventScreen = ({ route, navigation }) => {
  const event = route.params.event;
  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);
  const [date, setDate] = useState(new Date(event.date));
  const [isPickerShow, setIsPickerShow] = useState(false);
  console.log(title);
  console.log(date);
  console.log(location);

  // Update date variable
  const onDateChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  // Show date picker based on isPickerShow state
  const showPicker = () => {
    isPickerShow ? setIsPickerShow(false) : setIsPickerShow(true);
  };

  // Edit the event when form is submitted
  const handleSubmit = async () => {
    const eventData = {
      title: title,
      location: location,
      date: date.toLocaleDateString('en-US'),
    };

    const res = await fetch(`${HOST_3000}/events/${event._id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      console.log('Event created');
      const event = await res.json();
      navigation.navigate('Home', { post: event });
    } else {
      console.log(`Status Code ${res.status} - Failed to create event`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.topMenu}>
        <Button title='Back' onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.header}>
        <Text h2>Create New Event</Text>
      </View>
      <View style={styles.container}>
        <Input
          containerStyle={{ width: '80%' }}
          placeholder={event.title}
          onChangeText={(title) => setTitle(title)}
        />
        <Input
          containerStyle={{ width: '80%' }}
          placeholder={event.location}
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

export default EditEventScreen;
