import React from "react"
import { Provider } from 'react-redux'
import { store } from './redux/configureStore'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { render } from "react-dom"
const Main = () =>(
    <BrowserRouter>
        <Provider store={store}><App /></Provider>
    </BrowserRouter>
)
render(<Main/>, document.getElementById("root"));