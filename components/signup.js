import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase'; import QA from "./qans";
export default class Signup extends Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            isLoading: false
        }
    }
    updateInputVal = (val, prop) => {
        const state = this.state; state[prop] = val;
        this.setState(state);
    }
    registerUser = () => {
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signup!')
        }
        else {
            this.setState({ isLoading: true, })
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    res.user.updateProfile({ displayName: this.state.displayName })
                    console.log('User registered successfully!')
                    this.setState({ isLoading: false, displayName: '', email: '', password: '' })
                    this.props.navigation.navigate('Login')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <View style={styles.container}> {/* <QA/> */}
                <TextInput style={styles.inputStyle}
                    placeholder="Name"
                    placeholderTextColor='#ffff'
                    value={this.state.displayName}
                    onChangeText={(val) => this.updateInputVal(val, 'displayName')} />
                <TextInput style={styles.inputStyle}
                    placeholder="Email"
                    placeholderTextColor='#ffff'
                    value={this.state.email}
                    keyboardType='email-address'
                    onChangeText={(val) => this.updateInputVal(val, 'email')} />
                <TextInput style={styles.inputStyle}
                    placeholder="Password"
                    placeholderTextColor='#ffff'
                    value={this.state.password}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                    maxLength={15} secureTextEntry={true} />
                <TouchableOpacity style={styles.button}
                    onPress={() => this.registerUser()} >
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
                <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('Login')}> Already Registered? Click here to login </Text> </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#9E9E9E',
    },
    inputStyle: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 25,
        height: 50,
        paddingHorizontal: 16,
        fontSize: 16,
        marginVertical: 10,
    },
    loginText: {
        color: '#ffff',
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
    button: {
        width: '100%',
        backgroundColor: '#1c313a',
        borderRadius: 25,
        height: 50,
        paddingHorizontal: 16,
        marginVertical: 10,
        paddingVertical: 16
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffff',
        textAlign: 'center'
    }
});