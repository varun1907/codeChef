import React from 'react';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';

export default class DashBoard extends React.Component {
  
    render() {
      return (
        <View style={styles.container}>
          <Text>Dashboard</Text>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#fff',
    },
  });
  