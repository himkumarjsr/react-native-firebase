import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';


export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === ''){
          Alert.alert('Email Required')
      }else if(this.state.password === ''){
          Alert.alert('Password Required')
      } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Dashboard')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          placeholderTextColor='#ffff'
          keyboardType='email-address'
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
          onSubmitEditing={() => this.password.focus()}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          placeholderTextColor='#ffff'
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
          ref={(input) => this.password = input}
        /> 

         <TouchableOpacity 
        style={styles.button}
        onPress={() => this.userLogin()}
        >
            <Text style={styles.buttonText}>Signin</Text>
        </TouchableOpacity>  

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have account? Click here to signup
        </Text>                          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#9E9E9E'
  },
  inputStyle: {
    width:'100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius:25,
    height:50,
    paddingHorizontal:16,
    fontSize:16,
    marginVertical:10,
  },
  loginText: {
    color: '#fff',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  button:{
    width:'100%',
    backgroundColor: '#1c313a',
    borderRadius:25,
    height:50,
    paddingHorizontal:16,
    marginVertical:10,
    paddingVertical: 16
  },
  buttonText:{
      fontSize:16,
      fontWeight:'bold',
      color:'#ffff',
      textAlign: 'center'
  }
});