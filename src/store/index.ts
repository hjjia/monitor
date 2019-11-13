import { combineReducers  } from 'redux';
import { userReducer } from './user/reducers';
import { initReducer } from './init/reducers';



const rootReducer = combineReducers({
    user: userReducer,
    init: initReducer,
});

export default rootReducer;