import { combineReducers  } from 'redux';
import { userReducer } from './user/reducers';
import { orderReducer } from './order/reducers';
import { withdrawOrderReducer } from './withdrawOrder/reducers';
import { initReducer } from './init/reducers';



const rootReducer = combineReducers({
    user: userReducer,
    init: initReducer,
    order: orderReducer,
    withdrawOrder: withdrawOrderReducer,
});

export default rootReducer;