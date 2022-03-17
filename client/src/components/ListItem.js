import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import { HOST_3000 } from '../../environment';

const TodoItem = ({ onDelete, listData }) => {
  const [check, setCheck] = useState(listData.done);

  const toggleCheck = async () => {
    const update = { done: !check };

    const res = await fetch(`${HOST_3000}/lists/update/${listData._id}`, {
      method: 'PUT',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      console.log('Update successful');
      setCheck(!check);
    } else {
      console.log(`Status Code: ${res.status} - Failed to edit list item`);
    }
  };

  return (
    <View style={styles.listItem}>
      <CheckBox
        center
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checked={check}
        onPress={() => toggleCheck(listData._id)}
      />
      <View style={styles.content}>
        {check ? (
          <Text style={styles.textStyleStriked}>{listData.item}</Text>
        ) : (
          <Text style={styles.textStyle}>{listData.item}</Text>
        )}

        <Icon
          style={styles.icon}
          name='minus-circle'
          type='font-awesome'
          color='#f50'
          onPress={() => onDelete(listData._id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 16,
    maxWidth: '75%',
  },
  textStyleStriked: {
    fontSize: 16,
    maxWidth: '75%',
    textDecorationLine: 'line-through',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 20,
    padding: 5,
  },
});

export default TodoItem;
