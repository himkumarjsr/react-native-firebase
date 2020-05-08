import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity,TextInput } from 'react-native'

import {blogPosts} from "../actions";
import {connect} from 'react-redux';

class Post extends Component {
    state={
        title:'',
        content:''
    }
    submit=()=>{
        this.props.blogPosts(this.state.title, this.state.content)
        this.setState({
            title:'',
            content:''
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textheader}>Create Post </Text>
                <TextInput style={styles.textInput} placeholder="title" onChangeText={title => this.setState({title})} value={this.state.title} />
                <TextInput style={styles.textInput} placeholder="content" onChangeText={content => this.setState({content})} value={this.state.content}/>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.submit()}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default connect(null,{blogPosts})(Post);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      backgroundColor: '#fff'
    },
    textheader:{
        color: '#000',
        textAlign: "center",
        fontWeight:'bold',
        fontSize:30
    },
    textInput:{
        width:'100%',
        backgroundColor: '#9E9E9E',
        borderRadius:25,
        height:50,
        paddingHorizontal:16,
        fontSize:16,
        marginVertical:5,
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