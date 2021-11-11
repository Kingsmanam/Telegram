import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';

const Toast = () => {
  return (
    <View style={{flex: 1, zIndex: 1}}>
      <LottieView
        source={require('../assets/8640-loading.json')}
        autoPlay
        style={{
          position: 'absolute',
          bottom: -8,
          left: -10,
          width: 130,
          height: 100,
          zIndex: 10,
          
        }}
      />
      <View style={styles.toastview}>
        <View style={styles.alert}>
          <Text style={{color: '#fff', fontSize: 14, marginLeft: 50}}>
            History Cleared
          </Text>
        </View>
        <View style={styles.undo}>
          <Icon name="undo-variant" color="skyblue" size={22} />
          <Text
            style={{
              color: 'skyblue',
              fontSize: 14,
              marginLeft: 5,
              marginRight: 12,
              fontWeight: 'bold',
            }}>
            UNDO
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  toastview: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 20,
    height: 47,
    width: '90%',
    backgroundColor: '#1D262E',
    opacity: 0.88,
    borderRadius: 6,
    zIndex: 2,
  },
  undo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  alert: {
    width: '70%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Toast;
