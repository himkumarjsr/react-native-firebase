import React, { Component } from 'react'
import { Text, View , ScrollView} from 'react-native'
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from "../reducer"
import Dashboard from "./dashboard";

export default class DashBoardScreen extends Component {

    render() {
        const state = createStore(reducers, {}, applyMiddleware(ReduxThunk) );
        return (
            <Provider store={state}>
                <ScrollView>
                <View>
                    <Dashboard/>
                    {/* <Portfolio /> */}
                </View>
            </ScrollView>
            </Provider>
        )
    }
}
