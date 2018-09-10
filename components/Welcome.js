import React from 'react';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';

export default class Welcome extends React.Component {


   componentWillMount(){
    AsyncStorage.getItem('user')
    .then(result => {
      let data = JSON.parse(result);
      console.log(data);
      if(data.data.verified){
        this.props.navigation.navigate('dashboard')
      }
      else{
        this.props.navigation.navigate('login')
      }
    }).catch(err => {
      console.log(err);
    })
  }
    render() {
      return (
        <View style={styles.container}>
          <Text>Welcome</Text>
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
  