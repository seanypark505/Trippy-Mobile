import React from 'react';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Text, Button } from 'react-native-elements';
import EventCard from '../components/EventCard';

const eventData = [
  {
    id: '1',
    name: 'Camping Trip',
    date: '6/1/2022',
  },
  {
    id: '2',
    name: 'The Batman Premiere',
    date: '4/1/2022',
  },
  {
    id: '3',
    name: 'Coachella',
    date: '4/19/2022',
  },
  {
    id: '4',
    name: 'Royal Blood Concert',
    date: '5/7/2022',
  },
  {
    id: '5',
    name: 'Birthday Party',
    date: '5/4/2022',
  },
];

const HomeScreen = () => {
  const eventCard = ({ item }) => {
    return <EventCard eventData={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text h1>My Events</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={eventData}
        renderItem={eventCard}
        keyExtractor={(eventData) => eventData.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#CED6CE',
    justifyContent: 'space-evenly',
  },
});

export default HomeScreen;
