import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/shoppingList'
import {Provider} from 'react-redux'
import store from './store'
import ModalItem from './components/modalItem'
import Container from 'reactstrap/es/Container'


function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavbar/>
        <Container>
          <ModalItem/>
          <ShoppingList/>
        </Container>
      </div>
    </Provider>
  )
}

export default App
