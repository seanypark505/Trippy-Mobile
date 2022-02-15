import React, { useState, useEffect } from 'react';
import { Share, View, StyleSheet, SafeAreaView, Button } from 'react-native';
import { Text, Icon, Input } from 'react-native-elements';

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
      </View>
      <View style={styles.container}>
        <Text style={{ alignSelf: 'center' }} h2>
          {item.name}
        </Text>
        <View style={styles.locationContainer}>
          <Icon
            size={20}
            type='font-awesome-5'
            name='map-marker-alt'
            color='#E74E35'
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
        <View style={styles.btnsContainer}>
          <View>
            <Icon
              type='font-awesome-5'
              name='edit'
              solid={true}
              onPress={() => console.log('This will go to the edit screen')}
            />
          </View>
          <View>
            <Icon
              type='font-awesome-5'
              name='share-square'
              solid={true}
              onPress={shareLink}
            />
          </View>
          <View>
            <Icon
              type='font-awesome-5'
              name='list'
              solid={true}
              onPress={() => navigation.push('List', { item })}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={{ marginLeft: 30, fontSize: 20, padding: 10 }}>Posts</Text>
      </View>
      <View style={styles.inputBox}>
        <Input
          placeholder='Write a message ...'
          rightIcon={{ type: 'ionicon', name: 'send', color: '#00B4D8' }}
        />
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
    paddingTop: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginLeft: 35,
    marginTop: 15,
    marginBottom: 15,
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
  btnsContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    padding: 15,
    borderTopWidth: 2,
    borderTopColor: '#D1D1D1',
    borderBottomWidth: 2,
    borderBottomColor: '#D1D1D1',
    width: '85%',
  },
  inputBox: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
    width: '95%',
  },
});

export default EventScreen;
