import React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Button,
} from 'react-native';

import { CheckBox } from 'react-native-elements';

const ListScreen = ({ route, navigation }) => {
  console.log(route.params.item.list);
  const list = route.params.item.list;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.topMenu}>
        <Button title='Back' onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={list}
          keyExtractor={(list) => list.itemID}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <CheckBox center />
                <Text style={styles.textStyle}>{item.toDo}</Text>
              </View>
            );
          }}
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
  listContainer: {
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
  },
});

export default ListScreen;
