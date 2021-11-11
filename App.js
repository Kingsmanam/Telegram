import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/Screens/HomeScreen';
import ChatScreen from './src/Screens/ChatScreen';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Context} from './src/Components/Context';
import {Menu} from 'react-native-material-menu';
import {MenuItem} from 'react-native-material-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const App = () => {
  const [toastShown, setToastShown, subtext, setSubtext] = useContext(Context);
  const [visible, setVisible] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Telegram"
          component={HomeScreen}
          options={{
            headerStyle: {backgroundColor: '#fff'},
            headerLeft: () => (
              <Icon name="menu" size={27} style={{marginRight: 20}} />
            ),
            headerRight: () => {
              return (
                <>
                  <Icon2 name="shield-check" size={22} />
                  <Icon1 name="search" size={27} style={{marginLeft: 23}} />
                </>
              );
            },
          }}
        />
        <Stack.Screen
          name="chatbox"
          component={ChatScreen}
          options={({route,navigation}) => ({
            headerTitle: () => {
              const {username, image} = route.params;
              return (
                <View style={styles.chatheader}>
                  <Image
                    source={{uri: image}}
                    style={styles.headerimage}
                  />
                  <View style={styles.texts}>
                    <Text style={{color: 'black', fontSize: 17}}>
                      {username}
                    </Text>
                    <Text>last seen recently</Text>
                  </View>
                </View>
              );
            },
            headerRight: () => {
              const {Messages, username} = route.params;
              return (
              <>
                <Icon1 name="call" size={25} color="#212F3D" />
                <Menu
                  style={{width: 175}}
                  animationDuration={200}
                  visible={visible}
                  onRequestClose={() => setVisible(false)}
                  anchor={
                    <TouchableOpacity
                      activeOpacity={0.1}
                      style={{
                        width: 40,
                        height: 50,
                        borderRadius: 20,
                        justifyContent: 'center',
                      }}
                      onPress={() => setVisible(true)}>
                      <Icon2
                        name="dots-vertical"
                        size={22}
                        style={{marginLeft: 23}}
                        color="#212F3D"
                      />
                    </TouchableOpacity>
                  }>
                  <MenuItem
                    style={{paddingBottom: 6}}
                    pressColor="#BDBDBD"
                    onPress={() => {
                      AsyncStorage.removeItem('chat' + username);
                      AsyncStorage.removeItem('sub' + username)
                      setSubtext('')
                      setVisible(false);
                      navigation.setParams({Messages: []})
                      setToastShown(true)
                    }}>
                    <Icon2 name="broom" size={25} /> Clear History
                  </MenuItem>
                </Menu>
              </>
            )  
          },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  chatheader: {
    flexDirection: 'row',
  },
  headerimage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },
  texts: {
    paddingTop: 2,
  },
});
export default App;
