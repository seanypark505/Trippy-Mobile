import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, Button } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import TodoItem from '../components/ListItem';
import { HOST_3000 } from '../../environment';

const ListScreen = ({ route, navigation }) => {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState('');
  const event = route.params.event;

  const loadList = async () => {
    const res = await fetch(`${HOST_3000}/lists/${event._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setList(data);
  };

  const onDelete = async (_id) => {
    const res = await fetch(`${HOST_3000}/lists/${_id}`, { method: 'DELETE' });

    if (res.status === 204) {
      setList(list.filter((item) => item._id !== _id));
    } else {
      console.error(
        `Status Code: ${res.status} - Failed to delete item with ${_id}.`
      );
    }
  };

  const handleSubmit = async () => {
    const data = {
      item: newItem,
      done: false,
    };

    const res = await fetch(`${HOST_3000}/lists/${event._id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 201) {
      const newListItem = await res.json();
      setList([...list, newListItem]);
    } else {
      console.log(`Status Code ${res.status} - Failed to create new item`);
    }
  };

  const listItem = ({ item }) => {
    return <TodoItem listData={item} onDelete={onDelete} />;
  };

  useEffect(() => {
    if (route.params?.event) {
      loadList();
    } else {
      loadList();
    }
  }, [route.params?.event]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.topMenu}>
        <Button title='Back' onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.inputContainer}>
        <Input
          containerStyle={{ width: '80%', alignSelf: 'center' }}
          placeholder='Enter New Item'
          onChangeText={(newItem) => setNewItem(newItem)}
        />
        <Icon type='font-awesome-5' name='plus-circle' onPress={handleSubmit} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={list}
          keyExtractor={(item) => item._id}
          renderItem={listItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  listContainer: {
    flex: 1,
  },
});

export default ListScreen;
