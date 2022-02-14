import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Icon, Card, Text } from 'react-native-elements';

const EventCard = ({ eventData, alertDelete, viewEvent }) => {
  return (
    <View style={styles.cardContainer}>
      <Card>
        <Card.Title>
          <Pressable onPress={() => viewEvent(eventData)}>
            <Text h3>{eventData.name}</Text>
          </Pressable>
        </Card.Title>
        <Card.Divider />
        <View style={styles.container}>
          <View style={styles.dateContainer}>
            <Icon
              size={16}
              type='font-awesome-5'
              name='calendar-day'
              color='#535353'
            />
            <Text style={styles.eventDate}>{eventData.date}</Text>
          </View>
          <View style={styles.iconsContainer}>
            <Icon
              onPress={() => alertDelete(eventData.id)}
              type='font-awesome-5'
              name='trash-alt'
              color='#f50'
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    minWidth: '90%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icons: {
    alignSelf: 'flex-end',
    marginLeft: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDate: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default EventCard;
