import React, { useState, useEffect } from 'react';
import {
  Share,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  FlatList,
} from 'react-native';
import { Text, Icon, Input } from 'react-native-elements';
import PostItem from '../components/PostItem';
import { HOST_8080, HOST_3000 } from '../../environment';

const EventScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState([]);
  const item = route.params.item;

  // Get all posts for the event and update posts state variable
  const loadPosts = async () => {
    const res = await fetch(`${HOST_3000}/posts/${item._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setPosts(data);
  };

  // Send link to the event, this will call URLShortener Microservice
  const shareLink = async (id) => {
    const source = {
      url: `http://localhost:3000/events/share/${id}`,
    };

    const body = JSON.stringify(source);
    try {
      const response = await fetch(`${HOST_8080}/urlShortener`, {
        method: 'POST',
        body: body,
      });

      const json = await response.json();
      const shareUrl = json.data.tiny_url;

      const message = `Hey!  I'm inviting you to an event on Trippy.  Please RSVP!  ${shareUrl}`;

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
    } catch (error) {
      console.error(error);
    }
  };

  // Create a new post for the event
  const handleSubmit = async () => {
    const data = {
      content: newPost,
    };

    const res = await fetch(`${HOST_3000}/posts/${item._id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 201) {
      const newPostItem = await res.json();
      setPosts([...posts, newPostItem]);
    } else {
      console.log(`Status Code ${res.status} - Failed to create new post`);
    }
  };

  // Delete a post for the event
  const onDelete = async (_id) => {
    const res = await fetch(`${HOST_3000}/posts/${_id}`, { method: 'DELETE' });
    if (res.status === 204) {
      setPosts(posts.filter((item) => item._id !== _id));
    } else {
      console.error(
        `Status Code: ${res.status} - Failed to delete post with ${_id}.`
      );
    }
  };

  // Render PostItem component
  const postItem = ({ item }) => {
    return <PostItem postData={item} onDelete={onDelete} />;
  };

  useEffect(() => {
    if (route.params?.item) {
      loadPosts();
    } else {
      loadPosts();
    }
  }, [route.params?.item]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.topMenu}>
        <Button title='Home' onPress={() => navigation.navigate('Home')} />
      </View>
      <View style={styles.container}>
        <Text style={{ alignSelf: 'center' }} h2>
          {item.title}
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
          <View style={styles.btnGroup}>
            <Icon
              type='font-awesome-5'
              name='edit'
              solid={true}
              onPress={() => navigation.navigate('Edit', { event: item })}
            />
            <Text style={styles.iconLabel}>Edit</Text>
          </View>
          <View style={styles.btnGroup}>
            <Icon
              type='font-awesome-5'
              name='share-square'
              solid={true}
              onPress={() => shareLink(item._id)}
            />
            <Text style={styles.iconLabel}>Share</Text>
          </View>
          <View style={styles.btnGroup}>
            <Icon
              type='font-awesome-5'
              name='list'
              solid={true}
              onPress={() => navigation.push('List', { event: item })}
            />
            <Text style={styles.iconLabel}>List</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={{ marginLeft: 30, fontSize: 20, padding: 10 }}>
          Additional Info
        </Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={postItem}
      />
      <View style={styles.inputBox}>
        <Input
          onChangeText={(newPost) => setNewPost(newPost)}
          placeholder='Write a message ...'
          rightIcon={{
            type: 'ionicon',
            name: 'send',
            color: '#00B4D8',
            onPress: handleSubmit,
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
  btnGroup: {
    alignContent: 'center',
  },
  iconLabel: {
    marginTop: 5,
  },
  inputBox: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
    width: '95%',
  },
});

export default EventScreen;
