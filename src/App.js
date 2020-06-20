import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Shablons from './pages/Shablons';
import SingleRoom from './pages/SingleShablons';
import Errore from './pages/Errore'
import {Route, Switch} from 'react-router-dom';
import Plane from './pages/PlaneCreate';
import Registration from './pages/Registration';









function App() {
  return (
    <>
    <Navbar />
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shablons/" component={Shablons} />
        <Route exact path="/shablons/:slug" component={SingleRoom} />
        <Route exact path="/plane/" component={Plane} />
        <Route exact path="/registration/" component={Registration} />
        <Route component={Errore} />
    </Switch>
    </>

    
  );
}

export default App;
