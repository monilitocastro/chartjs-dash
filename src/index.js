import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import './index.css';
import Dashboard from './components/dashboard';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);

// ReactDOM.render(<Dashboard />, document.getElementById('root'));
// registerServiceWorker();




ReactDOM.render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();



/**
 * JSON shape 
 * {
 * ...
 *  tabContexts: [
 *                  {
 *          'tabContext': {
 *              groupName: String,
 *              menuItems: Array({
 *                  text: String,
 *                  id: String
 *              }),
 *              selectedId: String,
 *              updateTabSelection: Func
 *          }
 *      ...
 *      ]
 *  }
 */