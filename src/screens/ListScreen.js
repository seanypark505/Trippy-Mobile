import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

const ListScreen = () => {
  const data = [
    { id: '1', todoItem: 'Buy Milk' },
    { id: '2', todoItem: 'Buy Bread' },
    { id: '3', todoItem: 'Buy Eggs' },
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return <Text>{item.todoItem}</Text>;
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default ListScreen;
