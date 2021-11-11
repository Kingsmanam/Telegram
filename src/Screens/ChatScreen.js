import React, {useRef, useState, useEffect, useContext} from 'react';
import {Context} from '../Components/Context';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from '../Components/Toast';
import moment from 'moment';

const ChatScreen = ({route, navigation}) => {
  const [toastShown, setToastShown, subtext, setSubtext] = useContext(Context);
  const [text, setText] = useState('');
  const {Messages, username} = route.params;
  const input = useRef();

  useEffect(() => {
    getChat();
  }, []);

  useEffect(() => {
    storeChat();
    storeSubtext();
  }, [Messages]);

  useEffect(() => {
    setTimeout(() => {
      setToastShown(false);
    }, 5000);
  }, [toastShown]);

  const onchangeMessage = value => {
    setText(value);
  };

  const getChat = async () => {
    try {
      const stringMessages = await AsyncStorage.getItem('chat' + username);
      if (stringMessages != null) {
        const jsonvalue = JSON.parse(stringMessages);
        navigation.setParams({Messages: jsonvalue});
      }
    } catch (e) {
      console.log(e);
    }
  };

  const storeChat = async () => {
    try {
      const stringMessages = JSON.stringify(Messages);
      await AsyncStorage.setItem('chat' + username, stringMessages);
    } catch (e) {
      console.log(e);
    }
  };

  const storeSubtext = async () => {
    try {
      await AsyncStorage.setItem('sub' + username, subtext);
      console.log('set =>',subtext);
    } catch (e) {
      console.log(e);
    }
  }

  const send = () => {
    navigation.setParams({
      Messages: [...Messages, text],
    });
    setSubtext(text)
    input.current.clear();
    setText('');
  };

  const renderChat = ({item}) => (
    <View style={styles.message}>
      <Text style={{color: '#fff', textAlignVertical: 'center'}}>{item}</Text>
      <View
        style={{
          maxHeight: '100%',
          maxWidth: '27%',
          flexDirection: 'row',
          alignItems: 'flex-end',
          alignSelf: 'flex-end',
          marginTop: -5,
        }}>
        <Text style={{fontSize: 12, color: 'gainsboro'}}>{moment().format('LT')}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            minWidth: '5%',
            height: '100%',
            marginLeft: 5,
          }}>
          <Icon1 name="checkmark-done-sharp" size={18} color="gainsboro" />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {toastShown ? <Toast /> : null}
      <View style={{flexDirection: 'column-reverse'}}>
        <FlatList
          data={Messages}
          renderItem={renderChat}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          justifyContent: text == '' ? 'space-evenly' : 'space-around',
        }}>
        <Icon name="gif" size={35} />
        <TextInput
          ref={input}
          style={styles.chatbox}
          placeholder="Message"
          multiline={true}
          onChangeText={onchangeMessage}
        />
        {text == '' ? (
          <>
            <Icon
              name="attach-file"
              size={30}
              style={{
                transform: [
                  {rotateZ: '45deg'},
                  {rotateY: '180deg'},
                  {rotateX: '180deg'},
                ],
              }}
            />
            <Icon name="keyboard-voice" size={30} />
          </>
        ) : (
          <Icon name="send" size={25} color="steelblue" onPress={send} />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'aliceblue',
  },
  chatbox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    fontSize: 18,
    width: '55%',
  },
  message: {
    alignSelf: 'flex-end',
    flexDirection: 'column',
    minWidth: '28%',
    maxWidth: '60%',
    minHeight: 26,
    maxHeight: '100%',
    backgroundColor: 'dodgerblue',
    marginTop: 1,
    marginBottom: 5,
    paddingRight: 10,
    paddingLeft: 7,
    paddingTop: 3,
    paddingBottom: 3,
    marginHorizontal: 10,
    borderRadius: 11,
  },
});
export default ChatScreen;
