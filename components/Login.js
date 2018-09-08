import React from 'react';
import { StyleSheet, Text, View,Dimensions,TouchableOpacity,Picker,ScrollView,KeyboardAvoidingView,Keyboard } from 'react-native';
import { Input,Icon,Button } from 'react-native-elements';
import axios from 'axios';

export default class Login extends React.Component {

  state = {
    email: null,
    emailValid: false,
    password: null,
    passwordValid: false,

  }

  handleEmail = (text) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailFormat = re.test(text);
    if (text === null || text.trim() === '' || emailFormat === false) {
        this.setState({email: text, emailValid: false});
    }
    else {
        this.setState({email: text, emailValid: true});
    }
  }

  handlePassword = (text) => {
    if(text === null || text === '')
    {
      this.setState({passwordValid:false,password:text})
    }
    else{
      this.setState({passwordValid:true,password:text})
    }

  }

  submitInfo = () =>{
    Keyboard.dismiss();
    console.log(this.state.emailValid + this.state.email);
    console.log(this.state.passwordValid + this.state.password);

    if(this.state.emailValid && this.state.passwordValid) {
      const body = JSON.stringify({
          email: this.state.email,
          password: this.state.password,
      })
    
    axios.post('https://apps.scriptguru.org/api/login', body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then(async res => {
      console.log(res.data);
        //await AsyncStorage.setItem('settings', JSON.stringify(res.data.settings))
        
    })
    .catch(error => {
        if(error.request) {
            console.log('Network request failed');
            console.log(error);
        }
    });
    console.log('clicked');
  }
  } 

    render() {
      return (
        <View style={styles.container}>
          <ScrollView>
          <View style={styles.signUpTextView}>
            <Text style={styles.signUpText}>Login</Text>
          </View>
        
          <View style={[styles.container,{justifyContent:'center'}]}>

            <View>
              <Input
                placeholder='Email'
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                onChangeText={(text) => this.handleEmail(text)}
                containerStyle={styles.formStyle}
                leftIcon={<Icon type='MaterialIcons' name='email' color='white' />}
              />
            </View>

            <View>
              <Input
                placeholder='Password'
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.handlePassword(text)}
                containerStyle={styles.formStyle}
                leftIcon={<Icon type='foundation' name='key' color='white' />}
              />
            </View>


          <View style={styles.buttonSumbitStyle}>
            <Button
              buttonStyle={styles.buttonStyle}
              title='Login'
              onPress={this.submitInfo}
              disabledStyle={{backgroundColor:'#81d4fa'}}
              disabled = {this.state.emailValid && this.state.passwordValid ? false : true}
              buttonStyle= {{width: 250}}
              />
          </View>


          <View style={{ flexDirection:'row' }}>
            <Text style={styles.loginText}>Here for first time?</Text>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('signup')}}>
            <Text style={styles.loginText}> Register </Text>
            </TouchableOpacity>
          </View>

        </View>
        </ScrollView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#293046',
      alignItems:'center',
    },
    signUpTextView: {
        marginTop:100
    },
    signUpText: {
      textAlign:'center',
      color:'white',
      fontFamily:'sans-serif',
      fontSize:30
    },
    formStyle: {
      width: Dimensions.get('window').width-30,
      height: 60
    },
    loginText:{
      color: '#606060'
    },
    buttonSumbitStyle: {
      marginTop: 30,
      marginBottom: 30,
      alignItems: 'center',
  },
  buttonStyle: {
    height: 50,
    marginTop: 50,
    width: 250,
    backgroundColor: 'blue'
}
  });
  