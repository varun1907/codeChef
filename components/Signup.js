import React from 'react';
import { StyleSheet, Text, View,Dimensions,TouchableOpacity,Picker,ScrollView,ImageBackground,Keyboard,AsyncStorage } from 'react-native';
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
    confirmPasswordValid: false,
    showMessage: false,
    showTakenMailMessage: false,
    showTakenMailMessageValue:null,
    passwordLength:false,
    passwordLengthMessage:null
  }

  //   componentWillMount(){
  //   AsyncStorage.getItem('user')
  //   .then(result => {
  //     let data = JSON.parse(result);
  //     console.log(data);
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }


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
    this.setState({showMessage:false,passwordLength:false})
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
      if(!res.data.verified)
      {
        this.setState({showMessage: true})
      }
      try {
        await AsyncStorage.setItem('user', JSON.stringify(res.data));
      } catch (error) {
        console.log(error)
      }
        console.log(res.data.data.verify_user.token);
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
        if(error.response.data.errors.email[0] != undefined){
          this.setState({showTakenMailMessage:true,showTakenMailMessageValue:error.response.data.errors.email[0]})
        }
        else{
          this.setState({showTakenMailMessage:false})
        }
        if(error.response.data.errors.password[0] != undefined){
          this.setState({passwordLength:true,passwordLengthMessage:error.response.data.errors.password[0]})
        }
        else{
          this.setState({passwordLength:false})

        }
       // console.log(error.response.data.errors.email[0]);
      }
    });
    console.log('clicked');
  }
  } 

    render() {
      return (
        <ScrollView keyboardShouldPersistTaps='always'>
        <View style={styles.container}>

        <ImageBackground
          source={require('../assets/back1.jpg')}
          style={styles.backgroundImage}
        >

        <View style={{ backgroundColor:'white',margin:70,flex:1,zIndex:10 }}>
          
          <View style={styles.signUpTextView}>
            <Text style={styles.signUpText}>Sign up</Text>
          </View>

          <View>

            {this.state.showMessage
            ?
            <Text style={{ textAlign:'center',marginTop:20,fontSize:20,color:'black',marginBottom:20 }}> An Email has been sent with a link.Kindly verify your account by clicking on it</Text>
            :
            null
            }
            {this.state.showTakenMailMessage
            ?
            <Text style={{ textAlign:'center',marginTop:20,fontSize:20,color:'black',marginBottom:20 }}>{this.state.showTakenMailMessageValue}</Text>
            :
            null
            }
            {this.state.passwordLength
            ?
            <Text style={{ textAlign:'center',marginTop:20,fontSize:20,color:'black',marginBottom:20 }}>{this.state.passwordLengthMessage}</Text>
            :
            null
            }
            <View>  
              <Input
                placeholder='Name'
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.handleName(text)}
                containerStyle={styles.formStyle}
                inputContainerStyle={styles.inputStyle}
                leftIcon={<Icon type='feather' name='user' color='black' />}
              />
            </View>

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
                secureTextEntry = {true}
                onChangeText={(text) => this.handlePassword(text)}
                containerStyle={styles.formStyle}
                inputContainerStyle={styles.inputStyle}
                leftIcon={<Icon type='foundation' name='key' color='black' />}
              />
            </View>

            <View>
              <Input
                placeholder='Confirm Password'
                underlineColorAndroid='transparent'
                secureTextEntry = {true}
                onChangeText={(text) => this.handleConfirmPassword(text)}
                containerStyle={styles.formStyle}
                inputContainerStyle={styles.inputStyle}
                leftIcon={<Icon type='foundation' name='key' color='black' />}
              />
            </View>

          {/* <View style={{ flexDirection:'row' }}>

          </View> */}

          <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
                  <Text style={{marginLeft:20,marginTop:15,fontWeight:'bold',color:'black'}}>Gender</Text>
                  </View>
                  <View>
                                <Picker
                                    selectedValue={this.state.gender}
                                    style={{ height: 50, width: 175,color:'black' }}
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

        <View style={{alignItems:'center',marginBottom:40}}>
          <View style={{ flexDirection:'row' }}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('login')}}>
            <Text style={styles.loginText}>  Login </Text>
            </TouchableOpacity>
          </View>
        </View>  

        </View>
        </View>
        </ImageBackground>
        </View>
        </ScrollView>

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
    backgroundImage: {
      flex: 1,
      opacity: 0.9
    },
    signUpTextView: {
        marginTop:50
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
      color: '#606060',
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
  