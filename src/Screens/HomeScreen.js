import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {Context} from '../Components/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [toastShown, setToastShown, subtext, setSubtext] = useContext(Context);
  const [data, setData] = useState([
    {
      username: 'Reza Tm',
      messages: {
        texts: [],
        date: '',
      },
      subtext: '',
      image: 'https://cdn.wallpapersafari.com/77/80/RZ4iyq.jpg',
      id: 0,
    },
    {
      username: 'Ali',
      messages: {
        texts: [],
        date: '',
      },
      subtext: '',
      image:
        'https://hdphotogallery.in/images/2020/12/01/Hot-Hollywood-Actors.jpg',
      id: 1,
    },
    {
      username: 'Sina',
      messages: {
        texts: [],
        date: '',
      },
      subtext: '',
      image:
        'https://www.mrdustbin.com/en/wp-content/uploads/2021/05/matthew-mcconaughey.jpg',
      id: 2,
    },
    {
      username: 'Erfan',
      messages: {
        texts: [],
        date: '',
      },
      subtext: '',
      image: 'https://cdn.wallpapersafari.com/72/92/lhMFbV.jpg',
      id: 3,
    },
    {
      username: 'Masoud',
      messages: {
        texts: [],
        date: '',
      },
      subtext: '',
      image:
        'https://img.maximummedia.ie/joe_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE1XFxcLzA5XFxcLzE0MTc1NzE5XFxcL2pha2UtZ3lsbGVuaGFhbC5qcGdcIixcIndpZHRoXCI6NzAwLFwiaGVpZ2h0XCI6MzcwLFwiZGVmYXVsdFwiOlwiaHR0cHM6XFxcL1xcXC93d3cuam9lLmllXFxcL2Fzc2V0c1xcXC9pbWFnZXNcXFwvam9lXFxcL25vLWltYWdlLnBuZz9pZD0yNjRhMmRiZTM3MGYyYzY3NWZjZFwiLFwib3B0aW9uc1wiOltdfSIsImhhc2giOiIyMDRhYmE0ZWY4MGNlNTAwYTA2NDY4NGRjNDA3NTllNjg5NDFmZjkwIn0=/jake-gyllenhaal.jpg',
      id: 4,
    },
    {
      username: 'Mamad',
      messages: {
        texts: [],
        date: '',
      },
      subtext: '',
      image:
        'https://i.pinimg.com/originals/4e/76/03/4e760324c5251d742612013d388da523.jpg',
      id: 5,
    },
  ]);

  useEffect(() => {
    getSubtext();
  }, []);

  const getSubtext = async () => {
    try {
      for (let i = 0; i < data.length; i++) {
        const stringvalue = await AsyncStorage.getItem('sub' + data[i].username);

        if (stringvalue != null) {
          setSubtext(stringvalue);
          console.log('get => ', subtext);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderchats = ({item, index}) => (
    <TouchableOpacity
      style={styles.userview}
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate('chatbox', {
          username: item.username,
          image: item.image,
          Messages: item.messages.texts,
        });
      }}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View>
        <Text style={styles.text}>{item.username}</Text>
        <Text>{subtext}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{height: '100%', width: '100%', backgroundColor: 'white'}}>
      <FlatList
        data={data}
        renderItem={renderchats}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userview: {
    height: 72,
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 0.2,
    borderColor: 'lightgray',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: 'black',
    paddingTop: 5,
    marginBottom: 5,
  },
  image: {
    height: 56,
    width: 56,
    borderRadius: 50,
    marginRight: 10,
  },
});
export default HomeScreen;
