import React, { Component } from 'react'
import { Text, View, StyleSheet,Button, FlatList,TouchableHighlight } from 'react-native';
import {getBlogs, deleteBlogs} from "../actions";
import {connect} from 'react-redux';
import _ from "lodash";
import Icon from 'react-native-vector-icons/FontAwesome';


class Blogs extends Component {
    
    constructor(props){
        super(props);
        this.state={
            isEdit : false
        }
    }

    clickEdir=()=>{
        if(!this.state.isEdit){
            this.setState({isEdit: true})
        }else{
            this.setState({isEdit: false})
        }
       
    }

    componentDidMount=()=>{
        this.props.getBlogs();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textheader}> Blocks </Text>
                <FlatList style={{width:'100%'}}
                data={this.props.listOfBlogs}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => {
                    return (
                        <View style={styles.listContainer}>
                            <Text  style={styles.qText}>Q. {item.title}</Text>
                            {!this.state.isEdit && <Text numberOfLines={4}  style={styles.ansText}>Ans. {item.content}</Text>}
                            {this.state.isEdit && <Text numberOfLines={0} style={styles.ansText}>Ans. {item.content}</Text>}
                            <View style={styles.actionContainer}>
                                <TouchableHighlight activeOpacity={1} onPress={()=>this.clickEdir(item.key)}>
                                    <View style={styles.iconFormat}>
                                        <Text style={styles.ansText}>Show more...</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={()=> this.props.deleteBlogs(item.key)}>
                                    <View>
                                        <Icon sixe={50} color='white' name='close'>
                                        </Icon>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    )
                }} />
            </View>
        )
    }
}

const  mapStateToProps = (state) => {
    const listOfBlogs = _.map(state.blogsList.blogsList, (val, key) =>{
        return {
            ...val,
            key: key
        }
    })
    return {
        listOfBlogs
    }
}

export default connect(mapStateToProps ,{getBlogs, deleteBlogs})(Blogs);

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
    listContainer:{
        elevation: 8,
        borderRadius: 20,
        backgroundColor: "#455a64",
        padding:30,
        marginVertical:10
    },
    ansText:{
        color:'#fff'
    },
    qText:{
        fontWeight: 'bold'
    },
    actionContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 25
    },
    iconFormat:{
        marginHorizontal:20
    }
});
