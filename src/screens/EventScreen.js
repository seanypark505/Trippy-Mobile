import React, { useState, useEffect } from 'react';
import { Share, View, StyleSheet, SafeAreaView, Button } from 'react-native';
import { Text, Icon } from 'react-native-elements';
// import eventData from '../data/eventData';

const EventScreen = ({ route, navigation }) => {
  const item = route.params.item;

  const shareLink = async () => {
    const eventID = 'RANDOMID123';
    const url = `https://invites.trippy.com/join/${eventID}`;
    const message = `Hey!  I'm inviting you to an event on Trippy.  Please RSVP!  ${url}`;
    console.log(message);

    try {
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.topMenu}>
        <Button title='Home' onPress={() => navigation.navigate('Home')} />
        <Button title='Share' onPress={shareLink} />
      </View>
      <View style={styles.container}>
        <Text h2>{item.name}</Text>
        <View style={styles.locationContainer}>
          <Icon
            size={20}
            type='font-awesome-5'
            name='map-marker-alt'
            color='#535353'
          />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Icon
            size={20}
            type='font-awesome-5'
            name='calendar-day'
            color='#535353'
          />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#748299',
    paddingBottom: 25,
    paddingTop: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginLeft: 35,
    marginTop: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginLeft: 35,
    marginTop: 10,
  },
  dateText: {
    fontSize: 20,
    marginLeft: 15,
  },
  locationText: {
    fontSize: 20,
    marginLeft: 15,
  },
});

export default EventScreen;
