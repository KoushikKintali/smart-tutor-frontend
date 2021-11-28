import { applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable';
import { mainReducer, epics } from './mainReducer';

import { createLogger } from 'redux-logger';

const epicMiddleware = createEpicMiddleware();

const logger = createLogger();

const getCookieByName = (name) => {
    let namedCookie = document.cookie.split(';').find((coo)=> coo.split('=')[0].trim()==name)
    if(namedCookie) return namedCookie.split('=')[1];
    return undefined;
}

const getInitialState = () => {
    
    let token = getCookieByName('token');
    
    if(token) {
        return {
            authentication: {
                isLoggedIn : true,
                token : token,
                loggedInUserName : localStorage.getItem('loggedInUserName'),
                loggedInUserRole:localStorage.getItem('loggedInUserRole')
            }
        }
    } else {
        return {
            authentication: {
                isLoggedIn : false,
                token : "",
                loggedInUserName : "",
                loggedInUserRole:""
            }
        }
    }
}

const initialState = getInitialState();

function configureStore() {
  const store = createStore(
    mainReducer,
    initialState,
        applyMiddleware(
            epicMiddleware,
            logger
        )
  );

  epicMiddleware.run(epics);

  return store;
}

export const store = configureStore();