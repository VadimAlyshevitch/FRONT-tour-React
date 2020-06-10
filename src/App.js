import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Errore from './pages/Errore'


import {Route, Switch} from 'react-router-dom';









function App() {
  return (
    <>
    <Navbar />
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route component={Errore} />
    </Switch>
    </>

    
  );
}

export default App;
