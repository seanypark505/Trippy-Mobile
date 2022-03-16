import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import EventCard from '../components/EventCard';
import { HOST_3000 } from '../../environment';

const HomeScreen = ({ navigation, route }) => {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const res = await fetch(`${HOST_3000}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setEvents(data);
  };

  const alertDelete = (_id) => {
    Alert.alert(
      'Deleting Event',
      'Are you sure you want to delete the event?  The event will be deleted for you and all guests',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => onDelete(_id),
        },
      ]
    );
  };

  const onDelete = async (_id) => {
    const res = await fetch(`${HOST_3000}/events/${_id}`, { method: 'DELETE' });
    if (res.status === 204) {
      setEvents(events.filter((eventItem) => eventItem._id !== _id));
    } else {
      console.error(
        `Status Code: ${res.status} - Failed to delete event with ${_id}.`
      );
    }
  };

  const viewEvent = (item) => {
    navigation.navigate('Event', { item });
  };

  const eventCard = ({ item }) => {
    return (
      <EventCard
        eventData={item}
        alertDelete={alertDelete}
        viewEvent={viewEvent}
      />
    );
  };

  useEffect(() => {
    if (route.params?.post) {
      loadEvents();
    } else {
      loadEvents();
    }
  }, [route.params?.post]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text h1>My Events</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={events}
        renderItem={eventCard}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
});

export default HomeScreen;
