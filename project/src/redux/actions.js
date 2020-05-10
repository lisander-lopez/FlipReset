import * as Actions from './actionTypes';

/**
 * Stores the username into the redux store
 * 
 * @param {String} username
 */
export const loginUser = (username)=>({
    type: Actions.USER_LOGIN,
    payload: {
        username
    }
});


/**
 * Stores the username into the redux store
 * 
 * @param {String} url
 */
export const saveURL = (url)=>({
    type: Actions.URL,
    payload: {
        url
    }
});

/**
 * Stores the username into the redux store
 * 
 * @param {Number} uid
 */
export const userUID = (uid)=>({
    type: Actions.UID,
    payload: {
        uid
    }
});


/**
 * Stores the username into the redux store
 * 
 * @param {STRING} displayname
 */
export const displayNAME = (displayname)=>({
    type: Actions.DISPLAY_NAME,
    payload: {
        displayname
    }
});



/**
 * Stores the username into the redux store
 * 
 * @param {Number} money
 */
export const userMoney = (money)=>({
    type: Actions.USER_MONEY,
    payload: {
        money
    }
});

/**
 * Stores an array of item data
 * 
 * @param {Array} data 
 */
export const loadItems = (data) =>({
    type: Actions.ITEMS_LOAD,
    payload: {
        data
    }
})

/**
 * Unloads the items from the database
 */
export const unloadItems = () =>({
    type: Actions.ITEMS_UNLOAD
})