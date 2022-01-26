import {combineReducers} from 'redux'
import authReducer from './reducers/auth.reducer'
import propertyReducer from './reducers/property.reducer'
import activityReducer from './reducers/activity.reducer'
import crewReducer from './reducers/crew.reducer'
import messageReducer from './reducers/message.reducer'
const rootReducer = combineReducers({
    authReducer,
    propertyReducer,
    crewReducer,
    activityReducer,
    messageReducer
})

export default rootReducer