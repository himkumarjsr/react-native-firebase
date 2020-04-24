
import {combineReducers} from 'redux';
import BlockReducer from './BlockReducer';
const rootReducer = combineReducers({ 
    blogsList: BlockReducer
})

export default rootReducer;