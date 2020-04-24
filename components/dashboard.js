import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';
import Blogs from "./blogs"; import Post from "./post";
import Edit from "./edit";
export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            uid: ''
        }
    }
    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('Login')
        }).catch(error => this.setState({ errorMessage: error.message }))
    }
    render() {
        // state= createStore 
        this.state = {
            displayName: firebase.auth().currentUser.displayName, uid: firebase.auth().currentUser.uid
        }
        return (
            // <Provider>
            <View>
                <View style={styles.container}>
                    <Text style={styles.userText}>Hey {this.state.displayName}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.signOut()}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.blockContainer} >
                    <Post />
                </View>
                <View style={styles.blockContainer} >
                    <Blogs />
                </View> {/* <View style={styles.blockContainer} > <Edit /> </View> */}
            </View>
            // </Provider> 
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        marginTop: 0,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 30
    },
    blockContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        marginTop: 0,
        alignItems: 'center',
        flexDirection: 'row',
    },
    userText: {
        flex: 0.9,
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 30
    },
    button: {
        width: 100,
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