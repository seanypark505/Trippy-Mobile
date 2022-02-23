import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import EventCard from '../components/EventCard';
import eventData from '../data/eventData';

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState(eventData);

  const loadEvents = () => {
    setEvents(events);
  };

  const alertDelete = (id) => {
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
          onPress: () => onDelete(id),
        },
      ]
    );
  };

  const onDelete = (id) => {
    setEvents(events.filter((eventItem) => eventItem.id !== id));
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
    loadEvents();
  }, []);

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
        keyExtractor={(events) => events.id}
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
