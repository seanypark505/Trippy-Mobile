import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Card, Text, Button } from 'react-native-elements';

const EventCard = ({ eventData }) => {
  return (
    <Card>
      <Card.Title>
        <Text h3>{eventData.name}</Text>
      </Card.Title>
      <Card.Divider />
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.eventDate}>{eventData.date}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <Icon
            style={styles.icons}
            type='font-awesome-5'
            name='trash-alt'
            color='#f50'
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icons: {
    alignSelf: 'flex-end',
    marginLeft: 20,
  },
  eventDate: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventCard;
