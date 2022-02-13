import React from 'react';
import { FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';

const ListScreen = () => {
  const data = [
    { id: '1', todoItem: 'Buy Milk' },
    { id: '2', todoItem: 'Buy Bread' },
    { id: '3', todoItem: 'Buy Eggs' },
  ];

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Text style={styles.textStyle}>{item.todoItem}</Text>;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 5,
  },
});

export default ListScreen;
