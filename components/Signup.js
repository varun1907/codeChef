import React from 'react';
import { StyleSheet, Text, View,Dimensions,TouchableOpacity,Picker,ScrollView,KeyboardAvoidingView,Keyboard,AsyncStorage } from 'react-native';
import { Input,Icon,Button } from 'react-native-elements';
import axios from 'axios';

export default class Signup extends React.Component {

  state = {
    name: null,
    nameValid: false,
    email: null,
    emailValid: false,
    password: null,
    passwordValid: false,
    gender: null,
    gendervalid: false,
    confirmPasswordValid: false
  }

  handleName = (text) => {
    let nameFormat = /^[a-zA-Z\s]+$/.test(text);
    if (text === null || text.trim() === '' || nameFormat === false) {
        this.setState({name: text, nameValid: false});
    }
    else {
        this.setState({name: text, nameValid: true});
    }
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

  handleConfirmPassword = (text) => {
    if(this.state.password === text )
    {
      this.setState({confirmPasswordValid:true})
    }
    else{
      this.setState({confirmPasswordValid:false})
    }

  }

  handleGender = (itemValue, itemIndex) => {
    if (itemIndex === 0) {
        this.setState({gender: itemValue, genderValid: false});
    }
    else {
        this.setState({gender: itemValue, genderValid: true});
    }
}
  submitInfo = () =>{
    Keyboard.dismiss();
    console.log(this.state.nameValid + this.state.name);
    console.log(this.state.emailValid + this.state.email);
    console.log(this.state.passwordValid + this.state.password);
    console.log(this.state.confirmPasswordValid + this.state.password);
    console.log(this.state.genderValid + this.state.gender);
    if(this.state.nameValid && this.state.emailValid && this.state.passwordValid &&
      this.state.confirmPasswordValid && this.state.genderValid) {
      const body = JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password,
          gender: this.state.gender,
      })
    
    axios.post('https://apps.scriptguru.org/api/register', body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then(async res => {
      console.log(res.data);
        await AsyncStorage.setItem('user', JSON.stringify(res.data));
        await AsyncStorage.setItem('token', JSON.stringify(res.data.data.verify_user.token));
        console.log(res.data.data.verify_user.token);
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
            <Text style={styles.signUpText}>Sign up</Text>
          </View>
        
          <View style={[styles.container,{justifyContent:'center'}]}>

            <View>  
              <Input
                placeholder='Name'
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.handleName(text)}
                containerStyle={styles.formStyle}
                leftIcon={<Icon type='feather' name='user' color='white' />}
              />
            </View>

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
                secureTextEntry = {true}
                onChangeText={(text) => this.handlePassword(text)}
                containerStyle={styles.formStyle}
                leftIcon={<Icon type='foundation' name='key' color='white' />}
              />
            </View>

            <View>
              <Input
                placeholder='Confirm Password'
                underlineColorAndroid='transparent'
                secureTextEntry = {true}
                onChangeText={(text) => this.handleConfirmPassword(text)}
                containerStyle={styles.formStyle}
                leftIcon={<Icon type='foundation' name='key' color='white' />}
              />
            </View>

          {/* <View style={{ flexDirection:'row' }}>

          </View> */}

          <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
                  <Text style={{marginLeft:20,marginTop:15,fontWeight:'bold',color:'white'}}>Gender</Text>
                  </View>
                  <View>
                                <Picker
                                    selectedValue={this.state.gender}
                                    style={{ height: 50, width: 175,color:'white' }}
                                    onValueChange={(itemValue, itemIndex) => this.handleGender(itemValue, itemIndex)}>
                                    <Picker.Item label="Please Select" value="select" />
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                </Picker>
                            </View>
                        </View>          


          <View style={styles.buttonSumbitStyle}>
            <Button
              buttonStyle={styles.buttonStyle}
              title='Register'
              onPress={this.submitInfo}
              disabledStyle={{backgroundColor:'#81d4fa'}}
              disabled = {this.state.nameValid && this.state.emailValid && this.state.genderValid &&
                          this.state.passwordValid && this.state.confirmPasswordValid ? false : true}
              buttonStyle= {{width: 250}}
              />
          </View>


          <View style={{ flexDirection:'row' }}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('login')}}>
            <Text style={styles.loginText}>  Login </Text>
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
    backgroundColor: 'red'
}
  });
  