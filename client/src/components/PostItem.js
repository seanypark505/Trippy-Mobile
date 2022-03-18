import React from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { StyleSheet } from 'react-native';

const PostItem = ({ onDelete, postData }) => {
  const date = new Date(postData.createdAt);
  const localDate = date.toLocaleDateString('en-US');
  const time = date.toLocaleTimeString('en-US');
  const timestamp = `${localDate} ${time}`;

  return (
    <ListItem>
      <ListItem.Content left>
        <ListItem.Title style={{ fontSize: 24 }}>
          {postData.content}
        </ListItem.Title>
        <ListItem.Subtitle style={{ fontSize: 14, marginTop: 5 }}>
          {timestamp}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        <Icon
          onPress={() => onDelete(postData._id)}
          type='font-awesome-5'
          name='trash-alt'
          color='#f50'
        />
      </ListItem.Content>
    </ListItem>
  );
};

export default PostItem;
