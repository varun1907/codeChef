import React from 'react';
import { StyleSheet, Text, View,Dimensions,TouchableOpacity,Image,Keyboard,AsyncStorage } from 'react-native';
import { Input,Icon,Button } from 'react-native-elements';
import axios from 'axios';

export default class Login extends React.Component {

  state = {
    email: null,
    emailValid: false,
    password: null,
    passwordValid: false,
    verifyEmail:false,
    verifyEmailMessage:null,
    credentials:false,
    credentialsMessage:null

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
    this.setState({verifyEmail:false,credentials:false})
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
      console.log(res.data.data);
      try {
        await AsyncStorage.setItem('user', JSON.stringify(res.data));
      } catch (error) {
        // Error saving data
        console.log(error)
      }
      
      //await AsyncStorage.setItem('token', JSON.stringify(res.data.data.api_token));
      this.props.navigation.navigate('dashboard')
    })
    .catch(error => {
      if (error.response) {
        if(!error.response.data.message){
          this.setState({verifyEmail:true,verifyEmailMessage:error.response.data.error})
        }
        if(error.response.data.message){
          this.setState({credentials:true,credentialsMessage:error.response.data.errors.email[0]})
        }
        console.log(error.response.data);
      }
    });
    console.log('clicked');
  }
  } 

    render() {
      return (

        <View style={styles.container}>
          
          <View style={{ backgroundColor:'white',margin:70,flex:1,zIndex:10 }}>

          <View style={styles.signUpTextView}>
            <Text style={styles.signUpText}>Login</Text>
          </View>
        
          <View>

            {this.state.verifyEmail
            ?
            <Text style={{ textAlign:'center',marginTop:20,fontSize:20,color:'black',marginBottom:20 }}>{this.state.verifyEmailMessage}</Text>
            :
            null}

            
            {this.state.credentials
            ?
            <Text style={{ textAlign:'center',marginTop:20,fontSize:20,color:'black',marginBottom:20 }}>{this.state.credentialsMessage}</Text>
            :
            null}

            <View>
              <Input
                placeholder='Email'
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                onChangeText={(text) => this.handleEmail(text)}
                containerStyle={styles.formStyle}
                inputContainerStyle={styles.inputStyle}
                leftIcon={<Icon type='MaterialIcons' name='email' color='black' />}
              />
            </View>

            <View>
              <Input
                placeholder='Password'
                underlineColorAndroid='transparent'
                secureTextEntry={true}
                onChangeText={(text) => this.handlePassword(text)}
                containerStyle={styles.formStyle}
                inputContainerStyle={styles.inputStyle}
                leftIcon={<Icon type='foundation' name='key' color='black' />}
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

        <View style={{alignItems:'center',marginBottom:40}}>
          <View style={{ flexDirection:'row' }}>
            <Text style={styles.loginText}>Here for first time?</Text>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('signup')}}>
            <Text style={styles.loginText}> Register </Text>
            </TouchableOpacity>
          </View>
        </View>  

        </View>
        </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#293046',
      alignItems:'center',
      zIndex:1
    },
    signUpTextView: {
        marginTop: 50
    },
    signUpText: {
      textAlign:'center',
      color:'black',
      fontFamily:'sans-serif',
      fontSize:30
    },  
    inputStyle: {
      borderBottomWidth: 0
    },
    formStyle: {
      width: Dimensions.get('window').width-50,
      height: 60,
      backgroundColor:'#e0e0e0',
      margin:10,
      justifyContent:'center',
      alignItems:'center'
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
  