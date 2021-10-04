import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import {Provider} from 'react-redux'



import Main from './Main'

require('./bootstrap')


ReactDOM.render(
<Provider store={store}>
    <Main />
</Provider>,
document.getElementById('app') )