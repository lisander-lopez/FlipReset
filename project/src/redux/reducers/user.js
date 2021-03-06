import * as Actions from "../actionTypes";

const initialState = {
    username:null,
    displayname: null,
    url: null,
    money: null,
    uid: null
}

export default function(state=initialState, action){
    switch(action.type){
        case Actions.USER_LOGIN:
            return Object.assign({}, state, {...action.payload}); //changed this from initalState to state so now it doesnt just keep resetting
        case Actions.USER_MONEY:
            return Object.assign({}, state, {...action.payload});
        case Actions.URL:
            return Object.assign({}, state, {...action.payload});
        case Actions.UID:
            return Object.assign({}, state, {...action.payload});
        case Actions.DISPLAY_NAME:
            return Object.assign({}, state, {...action.payload});
        default:
            return state;
    }
}